import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {  
       const res = await axios.post(
           "https://demo-project-production-a936.up.railway.app/api/auth/verify-otp",
            { email, otp }
        );

      alert(res.data.msg);
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Verify OTP</h2>

      <form onSubmit={handleVerify}>
        <input
          type="email"
          placeholder="Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyOTP;
