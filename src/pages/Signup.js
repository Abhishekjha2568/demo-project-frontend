import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Signup = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', college: '', city: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
            alert(res.data.msg); 
            
          
            navigate('/verify-otp'); 
            
        } catch (err) {
            alert(err.response.data.msg || "Something went wrong");
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2>Create Your HR Portal Account</h2>
            <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required /><br/><br/>
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required /><br/><br/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br/><br/>
                <input type="text" name="college" placeholder="College Name" onChange={handleChange} required /><br/><br/>
                <input type="text" name="city" placeholder="City" onChange={handleChange} required /><br/><br/>
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Register</button>
                <p>Already have an account? <span onClick={() => navigate('/login')} style={{color: 'blue', cursor: 'pointer'}}>Login here</span></p>
            </form>
        </div>
    );
};

export default Signup;