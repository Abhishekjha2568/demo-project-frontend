import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [prompt, setPrompt] = useState('');
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const askUnick = async () => {
        if (!prompt) return;
        setLoading(true);
        setReply('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/unick-ai', { prompt });
            setReply(res.data.reply);
        } catch (err) {
            setReply("Sorry, there are some technical issues. Please try again later!");
        }
        setLoading(false);
    };

    if (!user) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Access Denied. Please Login.</h2>;

    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1>Welcome, {user.name}!</h1>
            <div style={{ marginBottom: '20px' }}>
                <p><strong>College:</strong> {user.college}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            
            <button 
                onClick={handleLogout} 
                style={{ backgroundColor: '#dc3545', color: 'white', padding: '10px 20px', cursor: 'pointer', border: 'none', borderRadius: '5px', marginBottom: '30px' }}
            >
                Logout
            </button>

            <br />

          
            <div style={{ marginTop: '20px', padding: '30px', border: '1px solid #007bff', borderRadius: '15px', backgroundColor: '#f9f9f9', display: 'inline-block', minWidth: '400px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#007bff', marginBottom: '20px' }}>The AI Assistant</h3>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <input 
                        type="text" 
                        placeholder="Ask me anything..." 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', width: '300px' }}
                    />
                    <button 
                        onClick={askUnick} 
                        disabled={loading}
                        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        {loading ? "..." : "Ask"}
                    </button>
                </div>
                
                {reply && (
                    <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#fff', borderRadius: '10px', borderLeft: '5px solid #007bff', textAlign: 'left', maxWidth: '450px' }}>
                        <strong style={{ color: '#007bff' }}></strong>
                        <p style={{ fontSize: '15px', marginTop: '8px', color: '#333', lineHeight: '1.5' }}>{reply}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;