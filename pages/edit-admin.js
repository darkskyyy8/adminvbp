// components/CreateAccountForm.js
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

const EditAkun = ({ userId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Mengambil data pengguna berdasarkan ID saat komponen dimuat
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${userId}`
        );
        const userData = response.data;

        // Mengisi formulir dengan data pengguna yang diambil
        setName(userData.name);
        setEmail(userData.email);
        // Password tidak diisi untuk keamanan biasanya
      } catch (error) {
        console.error("Terjadi kesalahan:", error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/users/${userId}`,
        data
      );

      if (response.status === 200) {
        alert("Pengguna berhasil diperbarui!");
        // Tambahkan logika redirect atau perubahan halaman jika diperlukan
      } else {
        console.error("Gagal memperbarui pengguna. Status:", response.status);
        alert("Terjadi kesalahan saat memperbarui pengguna.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <>
      <Header />
      <div className="pt-12 min-h-screen">
        <form
          onSubmit={handleUpdateUser}
          className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4 font-poppins">
            Edit Akun
          </h2>
          <div className="mb-4">
            <input
              placeholder="Nama"
              type="text"
              id="name"
              className="mt-1 p-2 w-full border rounded-md outline-none font-poppins"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Edit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditAkun;
