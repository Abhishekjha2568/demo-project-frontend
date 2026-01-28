import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
            const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/auth/signup`,
                 formData
              );


      alert(res.data.msg || "Signup successful");
      navigate("/verify-otp", { state: { email: formData.email }});
    } catch (err) {
      alert(
        err?.response?.data?.msg ||
        err?.message ||
        "Signup failed. Backend not responding."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Create Your HR Portal Account</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="text"
          name="college"
          placeholder="College Name"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
