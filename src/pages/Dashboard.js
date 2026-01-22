import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt) return;

    try {
      setLoading(true);
      setReply("");

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/unick-ai`,
        { prompt }
      );

      setReply(res.data.reply);
    } catch (err) {
      setReply("AI service unavailable");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "30px" }}>
      <div style={{ textAlign: "right" }}>
        <button onClick={logout}>Logout</button>
      </div>

      <h2>Welcome, {user?.name}</h2>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>College:</b> {user?.college}</p>
      <p><b>City:</b> {user?.city}</p>

      <hr style={{ margin: "20px 0" }} />

      <h3>AI Assistant</h3>

      <input
        type="text"
        placeholder="Ask something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />

      <br /><br />

      <button onClick={askAI} disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>

      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        {reply}
      </div>
    </div>
  );
};

export default Dashboard;