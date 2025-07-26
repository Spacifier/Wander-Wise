import { useRef, useState } from "react";
import { useAuth } from "../../root/AuthProvider";
import "./Admin.css";
import { SubmitButton } from "../../../components";
import { MdEdit } from "react-icons/md";
import { changeAvatar, changePassword } from "../../lib/utils";

function Admin(){
    const {user} = useAuth();
    const fileInputRef = useRef();
    const [changingPassword, setChangingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error,setError] = useState("");

    const handlePassword = async() => {
        setError("");
        if(!oldPassword || !newPassword){
            setError("Please fill both details");
            return;
        }

        const {msg , err} = await changePassword(oldPassword,newPassword);
        setError(err);

        if(msg === "Password Updated"){
            setChangingPassword(false);
            setOldPassword("")
            setNewPassword("")
            setError("")
        }
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    }
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if(!file) return;

        const {msg, err} = await changeAvatar(file);
        if(err) alert(err)
        else alert(msg)
    }

    return (
       <main className="wrapper">
            <div className={`w-[230px] transition-all duration-500 ease-in-out h-[290px] profile-card p-5 flex flex-col items-center relative`}>
                <div className={`transition-all duration-500 ease-in-out ${changingPassword ? "-translate-y-20 opacity-0 scale-20" : "translate-y-0 opacity-100 scale-100"}`}>
                    <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="hover:shadow-lg rounded-full transition-all"
                    />
                    <button 
                        className="bg-white rounded-full absolute top-2 right-4 p-2 hover:invert"
                        onClick={handleIconClick}
                    >
                        <MdEdit className="size-5"/>
                    </button>

                    {/* Hidden file input that shows when we want to change avatar */}
                    <input 
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    
                    <h1 className="font-[nunito] text-xl font-semibold mt-2 text-center">
                        {user?.username}
                    </h1>
                    <div className="text-sm text-center">
                        <button
                            className="text-[#3d5661] hover:text-[#9bbcc5]"
                            onClick={() => setChangingPassword(true)}
                        >
                            Change Password
                        </button>
                    </div>
                </div>

                {/* Change Password Heading + Inputs */}
                <div
                    className={`absolute flex flex-col items-center gap-2 transition-all duration-500 font-[satoshi] ${
                    changingPassword ? "opacity-100 translate-y-0" : "opacity-0 translate-y-30 pointer-events-none scale-20"
                    }`}
                >
                    <h2 className="text-lg font-bold mt-3">
                        Change Password
                    </h2>
                    <input
                        type="password"
                        placeholder="Old Password"
                        className="w-9/10 password-input"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-9/10 password-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <SubmitButton 
                        handleClick={handlePassword} 
                        text1="Save Changes" 
                        text2="Sure?" 
                        className="p-2 rounded-md text-sm mt-2 font-medium"
                    />
                    <button
                        className="mt-1 bg-blue-400 text-white px-4 py-1 rounded hover:bg-blue-300 transition"
                        onClick={() => {
                            setChangingPassword(false)
                            setError("")
                            setOldPassword("")
                            setNewPassword("")
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
       </main>
    );
}

export default Admin