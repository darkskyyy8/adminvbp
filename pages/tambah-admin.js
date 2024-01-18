// components/CreateAccountForm.js
import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

const TambahAkun = () => {
  const [name, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Persiapkan data untuk dikirim ke server
    const data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      // Kirim permintaan POST ke endpoint API Laravel menggunakan Axios
      const response = await axios.post(
        `http://127.0.0.1:8000/api/users/`,
        data
      );

      // Periksa status respons dari server
      if (response.status === 200) {
        // Respons berhasil
        alert("Akun berhasil ditambahkan!");
        window.location.reload();
      }
    } catch (error) {
      // Tangani kesalahan
      alert("Email Sudah Terdaftar & Password invalid:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="pt-12 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4 font-poppins">
            Tambah Akun
          </h2>
          <div className="mb-4">
            <input
              placeholder="Nama"
              type="text"
              id="name"
              className="mt-1 p-2 w-full border rounded-md outline-none font-poppins"
              value={name}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Email"
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md outline-none font-poppins "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              placeholder="Password"
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md outline-none font-poppins"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#25D366] hover:bg-white text-white hover:text-[#25D366] py-2 px-6 rounded-md transition duration-500 font-poppins"
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default TambahAkun;
