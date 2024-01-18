import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginapi = async () => {
    const url = "https://vbp-com.preview-domain.com/public/api/login";
    const data = { email: email, password: password };

    try {
      const response = await axios.post(url, data);

      if (response.status === 200) {
        window.location.href = "/dashboard";
      } else {
        alert("Gagal login. Terjadi kesalahan.");
      }
    } catch (error) {
      if (error.response) {
        alert("Gagal login. " + error.response.data.message);
      } else if (error.request) {
        alert("Gagal login. Tidak ada respons dari server.");
      } else {
        alert("Gagal login. Terjadi kesalahan.");
      }
    }
  };

  return (
    <div className="bg-[#FFF5EF] min-h-screen flex items-center justify-center">
      <div className="bg-[#5F3C90] p-8 rounded shadow-md w-96">
        <h2 className="text-[#D37643] text-2xl font-bold mb-4 text-center font-poppins">
          Administrator
        </h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#D37643] text-base text-center font-poppins"
          placeholder="Username"
        />
        <div className="py-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#D37643] text-base text-center font-poppins"
            placeholder="Password"
          />
        </div>
        <button
          onClick={loginapi}
          type="submit"
          className="w-full bg-[#D37643] text-white py-2 rounded-md hover:bg-[#d28c67] transition duration-500 font-poppins text-base"
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default Login;
