import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const options = {
    httpOnly: true,
    secure: true, // Important for HTTPS
    sameSite: "None", // Required for cross-origin cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
}
const getRandomAvatar = () => {
  const total = 9;
  const randomIndex = Math.floor(Math.random() * total) + 1;
  return `/avatars/default${randomIndex}.jpg`;
};

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler(async(req,res) => {
    const { email, username, password } = req.body;
    if(
        [username,email,password].some((field) => field.trim() === "")
    ){
        throw new ApiError(400,"All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if(existingUser){
        throw new ApiError(409,"Username with same username or email already exists");
    }

    const avatar = getRandomAvatar();

    const user = await User.create({
        username:username.toLowerCase(),
        email,
        password,
        avatar
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res  
        .status(200)
        .json(
            new ApiResponse(200, createdUser, "User Registered")
        )
})

const loginUser = asyncHandler(async(req,res) => {
    const {username, email, password} = req.body;
    if(!email && !username){
        throw new ApiError(400, "Username or email is required");
    }
    
    const user = await User.findOne({
        $or: [{username}, {email}]
    })
    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedUser, accessToken, refreshToken
                },
                "User Logged In Successfully"
            )
        )
})

const logoutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(
            new ApiResponse(200,{},"User Logged Out")
        )
})

const refreshAccessToken = asyncHandler(async(req,res) => {
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized Request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken._id)
        if(!user){
            throw new ApiError(401,"Invalid Refresh Token")
        }

        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh Token is expired or used")
        }

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user?._id)

        return res
            .status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",newRefreshToken,options)
            .json(
                new ApiResponse(
                    200,
                    {accessToken, refreshToken: newRefreshToken},
                    "Access Token Refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401,error?.message || "Refresh Token Invalid")
    }
})

const changeCurrentPassword = asyncHandler( async(req,res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid old Password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave:false})

    return res 
        .status(200)
        .json(new ApiResponse(200,{},"Password Updated"))
})

const getCurrentUser = asyncHandler( async (req,res) => {
    return res
        .status(200)
        .json(new ApiResponse(200,req.user,"Current user fetched successfully"))
})

const updateAvatarImage = asyncHandler(async(req,res) => {
    const avatarLocalPath = req.file?.path
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
        throw new ApiError(400, "Error while uploading avatar")
    }

    const oldAvatarUrl = req.user?.avatar;
    const publicId = oldAvatarUrl
        ?.split("/upload/")[1]   // get path after /upload/
        ?.split(".")[0];        // remove file extension

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar:avatar.url
            }
        },
        {new: true}
    ).select("-password")

    if(publicId){
        await deleteFromCloudinary(publicId);
    }

    return res  
        .status(200)
        .json(new ApiResponse(200, user, "Avatar updated successfully"))
}) 

const getAllUsers = asyncHandler(async(req,res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page-1) * limit;

    const total = await User.countDocuments();
    const users = await User.find().sort({createdAt: -1}).skip(skip).limit(limit).select("-password -refreshToken");

    if(!users.length){
        throw new ApiError(404,"No users found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {users, total}, "Users fetched Successfully")
        )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAvatarImage,
    getAllUsers
}