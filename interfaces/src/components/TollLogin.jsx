import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Container, ContentWrapper, Signup, Head, InputLabel, Inp, Button } from "../commonstyles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TollLogin = () => {
  const navigate = useNavigate();
  const [usr, setUsername] = useState('');
  const [pwd, setPwd] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/toll/login', {
        username: usr,
        password: pwd,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.data.wrongCredentials) {
        const token = response.data.accessToken;

        document.cookie = `token=${token}; path=/; secure; SameSite=None max-age=${24 * 60 * 60}`;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        navigate('/uploads',{replace:true});
      } else {
        toast.error("Wrong credentials")
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
          <Head>Login to proceed</Head>
          <InputLabel>Enter your username</InputLabel>
          <Inp placeholder="username" value={usr} onChange={(e) => setUsername(e.target.value)} />
          <InputLabel>Enter your password</InputLabel>
          <Inp placeholder="password" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
          <Button onClick={handleLogin}>Submit</Button>
        </Signup>
      </ContentWrapper>
      <ToastContainer/>
    </Container>
  );
};

export default TollLogin;
