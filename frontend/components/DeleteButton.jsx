import React from 'react';
import styled from 'styled-components';

const DeleteButton = ({onClick}) => {
  return (
    <StyledWrapper>
      <button className="button" onClick={onClick}>
        <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
.button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #262626;
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
    cursor: pointer;
    transition-duration: .3s;
    overflow: hidden;
    position: relative;
}

.svgIcon {
    width: 12px;
    transition-duration: .3s;
}

.svgIcon path {
    fill: white;
}

.button:hover {
    width: 140px;
    border-radius: 50px;
    transition-duration: .3s;
    background-color: rgb(255, 69, 69);
    align-items: center;
}

.button:hover .svgIcon {
    width: 50px;
    transition-duration: .3s;
    transform: translateY(60%);
}

.button::before {
    position: absolute;
    top: -20px;
    content: "Delete";
    color: white;
    transition-duration: .3s;
    font-size: 2px;
}

.button:hover::before {
    font-size: 13px;
    opacity: 1;
    transform: translateY(30px);
    transition-duration: .3s;
}`;

export default DeleteButton;
