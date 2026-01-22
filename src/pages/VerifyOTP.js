import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
            alert(res.data.msg);
            navigate('/login'); 
        } catch (err) {
            alert(err.response?.data?.msg || "Verification failed");
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2>Verify Your Account</h2>
            <p>Please enter the OTP sent to your email.</p>
            <form onSubmit={handleVerify}>
                <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required style={styles.input} /><br/>
                <input type="text" placeholder="6-Digit OTP" onChange={(e) => setOtp(e.target.value)} required style={styles.input} /><br/>
                <button type="submit" style={styles.button}>Verify OTP</button>
            </form>
        </div>
    );
};

const styles = {
    input: { padding: '10px', margin: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' },
    button: { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};

export default VerifyOTP;