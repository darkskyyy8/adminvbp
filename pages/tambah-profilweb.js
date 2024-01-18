// pages/add-profile-web.js

import { useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

const AddProfileWeb = () => {
  const [judul, setJudul] = useState("");
  const [subJudul, setSubJudul] = useState("");

  const Tambah = async () => {
    try {
      const response = await axios.post(
        "https://vbp-com.preview-domain.com/public/api/profilweb",
        {
          judul,
          sub_judul: subJudul,
        }
      );
      if (response.status == 200) {
        alert("Berhasil menambahkan profile web");
      } else;
    } catch (error) {
      console.error("Error adding profile web:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      alert("Gagal menambahkan profil web. Silakan coba lagi.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen py-20 flex justify-center px-12 rounded-md">
        <div className="bg-white p-6 rounded-md shadow-md w-1/2">
          <h1 className="text-center text-lg font-bold mb-4">
            Tambah Data Profile Web
          </h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="judul"
                className="block text-sm font-medium text-gray-700"
              >
                Judul:
              </label>
              <input
                type="text"
                id="judul"
                name="judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subJudul"
                className="block text-sm font-medium text-gray-700"
              >
                Sub Judul:
              </label>
              <input
                type="text"
                id="subJudul"
                name="subJudul"
                value={subJudul}
                onChange={(e) => setSubJudul(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <button
              type="button"
              onClick={Tambah}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Tambah Profil Web
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProfileWeb;
