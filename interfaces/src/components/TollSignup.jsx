import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { Container,ContentWrapper,Signup,Head,InputLabel,Inp,Button } from "../commonstyles";
import { ToastContainer, toast } from 'react-toastify';




const TollSignup = () => {
  const [usr, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [loc, setLoc] = useState('')
    const navigate = useNavigate()
    
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/toll/register',{
            username:usr,
            password:pwd,
            location:loc
        }).then((res)=>{
            const exists = res.data['exists'];
            if(!exists){
              navigate('/tollLogin')
            }
            else{
              toast.warning('Username exists', {
                position: 'top-right',
                autoClose: 5000, // Close after 5 seconds
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                theme: 'light',
              });
            }
        }
        )
    }
    
    return (
        <Container>
            <ContentWrapper>
                <Signup>
                    <Head>Register with us</Head>
                    <InputLabel>Enter a username</InputLabel>
                    <Inp placeholder="username" value={usr} onChange={(e)=>setUsername(e.target.value)}></Inp>
                    <InputLabel>Create a Password</InputLabel>
                    <Inp placeholder="password" value={pwd} onChange={(e)=>setPwd(e.target.value)}></Inp>
                    <InputLabel>Enter the location of Tollgate</InputLabel>
                    <Inp placeholder="location" value={loc} onChange={(e)=>setLoc(e.target.value)}></Inp>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <ToastContainer></ToastContainer>
                </Signup>
            </ContentWrapper>
        </Container>
    )
}

export default TollSignup