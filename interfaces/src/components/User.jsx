import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Reports from "./Reports";
import { useNavigate } from "react-router";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;


const ContentWrapper = styled.div`
  width: 80%;
  max-width: 400px; 
`;

const Login = styled.div`
  border: 2px solid #bdc3c7;
  border-radius: 0 0 10px 10px; 
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom, #f5f5f5, #f0f0f0);
  overflow: hidden;
`;

const Head = styled.h4`
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #444; 
  font-size: 24px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #555;
`;

const Inp = styled.input`
  width: calc(100% - 20px);
  padding: 14px;
  margin-bottom: 16px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, border-radius 0.2s ease;

  &:focus {
    border-color: #2ecc71; 
    box-shadow: 0 0 8px rgba(46, 204, 113, 0.5); 
    border-radius: 10px; 
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

const User = () => {

  const [regNo, setRegNo] = useState('')
  const [mobNo, setMobNo] = useState('')
  const [submit, setSubmit] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/user', {
      registrationNo: regNo,
      mobileNo: mobNo
    }).then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        navigate('/reports', {state:{data:res.data,user:regNo}})
      }
    })
  }



  if (!submit) {
    return (
      <Container>
        <ContentWrapper>
          <Login>
            <Head>Enter Your Details to View Reports</Head>
            <InputLabel htmlFor="regno">Registration Number</InputLabel>
            <Inp id="regno" type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} placeholder="Enter your registration number" required />
            <InputLabel htmlFor="telno">Mobile Number</InputLabel>
            <Inp id="telno" type="tel" value={mobNo} onChange={(e) => setMobNo(e.target.value)} placeholder="Enter your mobile number" required />
            <Button onClick={handleSubmit}>Submit</Button>
          </Login>
        </ContentWrapper>
      </Container>
    );
  }
  else {
    <Reports />
  }
};

export default User;
