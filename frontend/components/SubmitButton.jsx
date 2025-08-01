import React from 'react';
import styled from 'styled-components';

const SubmitButton = ({handleClick, text1, text2, className}) => {
  return (
    <StyledWrapper>
        <button onClick={handleClick} className={className}>
            <span className="text">
                {text1}
            </span>
            <span>
                {text2}
            </span>
        </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   position: relative;
   overflow: hidden;
   color: #18181a;
   display: inline-block;
   text-decoration: none;
   cursor: pointer;
   background: #fff;
   user-select: none;
   -webkit-user-select: none;
   touch-action: manipulation;
  }

  button span:first-child {
   position: relative;
   transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
   z-index: 10;
  }

  button span:last-child {
   color: white;
   display: block;
   position: absolute;
   bottom: 0;
   transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
   z-index: 100;
   opacity: 0;
   top: 50%;
   left: 50%;
   transform: translateY(225%) translateX(-50%);
   height: 14px;
   line-height: 13px;
  }

  button:after {
   content: "";
   position: absolute;
   bottom: -50%;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: #7a9cc6;
   transform-origin: bottom center;
   transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
   transform: skewY(9.3deg) scaleY(0);
   z-index: 50;
  }

  button:hover:after {
   transform-origin: bottom center;
   transform: skewY(9.3deg) scaleY(2);
  }

  button:hover span:last-child {
   transform: translateX(-50%) translateY(-50%);
   opacity: 1;
   transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
  }`;

export default SubmitButton;
