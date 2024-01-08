import axios from 'axios';
import { useState } from 'react';
import { Container, ContentWrapper, Login, Head, InputLabel, Inp, Button, ImageInput } from "../commonstyles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleSubmit = async (e, regno, telno, image) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('regno', regno);
    formdata.append('telno', telno);
    formdata.append('image', image);

    try {
        const response = await axios.post("http://localhost:5000/toll/upload", formdata, {
            headers: {
                "Content-Type": 'multipart/form-data'
            },
            timeout: 3000,
        });

        if (response.status === 200) {
            toast.success('Submission successful', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                theme: 'light',
            });
        } else {
            console.error('Unexpected response status:', response.status);
            toast.warning('Unexpected response status. Please try again.', {
                position: 'top-right',
                autoClose: 2000,
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
    } catch (error) {
        if (axios.isCancel(error)) {
            toast.warning('Request timed out', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                theme: 'light',
            });
        } else if (error.code === 'ECONNABORTED') {
            toast.warning('Request timed out. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                theme: 'light',
            });
        } else {
            console.error('Your token has expired. Login again to continue', error);toast.warning('Your token has expired. Login again to continue', {
                position: 'top-right',
                autoClose: 5000,
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
};

const Tollgate = () => {
    const [regno, setregno] = useState('');
    const [telno, settelno] = useState('');
    const [image, setImage] = useState(null);

    const handleRegChange = (e) => {
        setregno(e.target.value);
    };

    const handleTelChange = (e) => {
        settelno(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <Container>
            <ContentWrapper>
                <Login>
                    <Head>Enter the details</Head>
                    <InputLabel htmlFor="regno">Registration Number</InputLabel>
                    <Inp id="regno" type="text" placeholder="Enter the registration number" value={regno} onChange={handleRegChange} required />
                    <InputLabel htmlFor="telno">Mobile Number</InputLabel>
                    <Inp id="telno" type="tel" placeholder="Enter the mobile number" value={telno} onChange={handleTelChange} required />
                    <InputLabel htmlFor="image">Upload Image</InputLabel>
                    <ImageInput id="image" type="file" onChange={handleImageChange} accept="image/*" />
                    <Button onClick={(e) => handleSubmit(e, regno, telno, image)}>Submit</Button>
                </Login>
            </ContentWrapper>
            <ToastContainer />
        </Container>
    );
};

export default Tollgate;
