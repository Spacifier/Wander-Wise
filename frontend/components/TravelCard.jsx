import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function Card({id, name, location, imageUrl, tags, price}) {
    const path = useLocation();

    return (
        <StyledWrapper>
            <Link
                to={
                    path.pathname === '/' || path.pathname.startsWith('/travel')
                    ? `/travel/${id}`
                    : `/admin/trips/${id}`
                }
            >
                <div
                    className="card"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="content-box">
                        <span className="card-title">{location}</span>

                        <p className="card-content">
                            {tags?.join(', ')}
                        </p>

                        <span className="see-more rounded-lg">{price}</span>
                    </div>
                </div>
            </Link>
        </StyledWrapper>
    );

}

const StyledWrapper = styled.div`
.card {
    padding-top: 50px;
    transform-style: preserve-3d;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 300px;
    box-shadow: rgba(142, 142, 142, 0.3) 0px 30px 30px -10px;
    transition: all 0.5s ease-in-out;
    position: relative;
}

.card:hover {
    background-position: -100px 100px, -100px 100px;
    transform: rotate3d(0.5, 1, 0, 30deg);
}

.content-box {
    transition: all 0.5s ease-in-out;
    padding: 60px 25px 25px 10px;
    transform-style: preserve-3d;
}

.content-box .card-title {
    display: inline-block;
    color: white;
    font-size: 30px;
    font-weight: 800;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 50px);
}

.content-box .card-content {
    margin-top: 10px;
    font-size: 15px;
    font-weight: 700;
    color: #f2f2f2;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 30px);
}

.content-box .see-more {
    cursor: pointer;
    margin-top: 1rem;
    display: inline-block;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    color: rgb(7, 185, 255);
    background: white;
    padding: 0.5rem 0.7rem;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 20px);
}`;

export default Card;
