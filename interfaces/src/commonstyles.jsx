
import styled, { keyframes } from "styled-components"

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  z-index: -1;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; 
  
`;

export const ContentWrapper = styled.div`
  width: 80%;
  max-width: 400px; /* Set a maximum width for the content */
`;

export const Login = styled.div`
border: 2px solid #bdc3c7;
border-radius: 0 0 10px 10px; 
padding: 20px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
background: linear-gradient(to bottom, #f5f5f5, #f0f0f0);
overflow: hidden;
`;
export const Signup = styled.div`
  border: 2px solid #bdc3c7;
  border-radius: 0 0 10px 10px; 
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom, #f5f5f5, #f0f0f0);
  overflow: hidden;
`;

export const Head = styled.h4`
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #444; /* Medium-dark grey text */
  font-size: 24px;
`;
export const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #555;
`;

export const Inp = styled.input`
  width: calc(100% - 20px);
  padding: 14px;
  margin-bottom: 16px;
  border: 1px solid #bdc3c7; /* Lighter border color */
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, border-radius 0.2s ease;

  &:focus {
    border-color: #2ecc71; /* Change border color on focus */
    box-shadow: 0 0 8px rgba(46, 204, 113, 0.5); /* Add box shadow on focus */
    border-radius: 10px; /* Increase border radius on focus */
  }
`;
export const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  transition: background-color 0.3s ease, transform 0.3s ease, border-radius 0.2s ease;

  &:hover {
    background-color: #27ae60; /* Darker green on hover */
    transform: scale(1.0002); /* Scale up the button on hover */
    box-sizing:border-box;
    border: 1px solid #1f8e50;
    border-radius: 10px;
  }
`;
// const slideIn = keyframes`
//   from {
//     transform: translateX(100%);
//   }

//   to {
//     transform: translateX(0);
//   }
// `;

// export const NotificationContainer = styled.div`
// position: fixed;
// top: 100px;
// right: 20px;
// background-color: #e74c3c; /* Red color for error */
// color: #fff;
// padding: 10px;
// border-radius: 4px;
// box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
// animation: ${slideIn} 0.3s ease-in-out; /* Use the slideIn animation */
// display: flex;
// justify-content: space-between;
// align-items: center;
// `;

export const Loader = styled.div`
border: 3px solid #f3f3f3;
border-top: 4px solid #3498db;
border-radius: 50%;
width: 30px;
height: 30px;
animation: spin 1s linear infinite;
position: fixed;
top: 50%;
left: 50%;
margin-top: -25px;
margin-left: -25px;
display:block;
@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}`

export const ImageInput = styled.input`
  width: calc(100% - 20px);
  padding: 14px;
  margin-bottom: 16px;
  border: 1px solid #bdc3c7; /* Lighter border color */
  border-radius: 4px;
  box-sizing: border-box;
`;
