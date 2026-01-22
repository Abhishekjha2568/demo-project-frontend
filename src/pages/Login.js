import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
              const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/login`,
                  { email, password }
                     );

            alert(res.data.msg);
            
           
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            navigate('/dashboard'); 
        } catch (err) {
            alert(err.response?.data?.msg || "Login failed");
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2>Login to HR Portal</h2>
            <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
                <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required style={styles.input} /><br/>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={styles.input} /><br/>
                <button type="submit" style={styles.button}>Login</button>
                <p>Don't have an account? <span onClick={() => navigate('/')} style={{color: 'blue', cursor: 'pointer'}}>Signup here</span></p>
            </form>
        </div>
    );
};

const styles = {
    input: { padding: '10px', margin: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' },
    button: { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }
};

export default Login;