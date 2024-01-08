import { useState } from "react";
import styled from "styled-components"
import axios from "axios"
import { useNavigate } from "react-router";
import { toast,ToastContainer } from "react-toastify";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* Light grey background */
`;

const ContentWrapper = styled.div`
  width: 80%;
  max-width: 400px; /* Set a maximum width for the content */
`;

const Signup = styled.div`
  border: 2px solid #bdc3c7;
  border-radius: 0 0 10px 10px; /* Adjust border-radius for fitting with the Navbar */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom, #f5f5f5, #f0f0f0);
  overflow: hidden;
`;

const Head = styled.h4`
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #444; /* Medium-dark grey text */
  font-size: 24px;
`;
const InputLabel = styled.label`
  display: inline-block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #555;
`;

const Inp = styled.input`
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
const Button = styled.button`
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
    border: 1px solid #1f8e50;
    border-radius: 10px;
  }
`;


const ManuLogin = () => {
    const [usrnm,setusrnm] = useState('')
    const [pwd,setpwd] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
      e.preventDefault()
      try {
        const response = await axios.post('http://localhost:5000/manu/login', {
          username: usrnm,
          password: pwd,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.data.invalid) {
          const token = response.data.accessToken;
  
          document.cookie = `token=${token}; path=/; secure; SameSite=None max-age=${24 * 60 * 60}`;
  
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
          navigate('/dealerReports',{replace:true});
        } else {
          toast.error('wrong credentials')
        }
      } catch (error) {
        console.error('Error during login:', error.message);
        // Handle the error, e.g., show an error message to the user
      }
    };
      
    


    return (
        <Container>
            <ContentWrapper>
                <Signup>
                    <Head>Login to Proceed</Head>
                    <InputLabel htmlFor="usr">Enter username</InputLabel>
                    <Inp placeholder="username" id="usr" value={usrnm} onChange={(e)=>setusrnm(e.target.value)}></Inp>
                    <InputLabel htmlFor="pw">Enter your password</InputLabel>
                    <Inp id="pw"placeholder="password" value={pwd} onChange={(e)=>setpwd(e.target.value)}></Inp>
                
                    <Button onClick={(e)=>handleSubmit(e)}>Submit</Button>
                </Signup>
                <ToastContainer/>
            </ContentWrapper>
        </Container>
    )
}

export default ManuLogin