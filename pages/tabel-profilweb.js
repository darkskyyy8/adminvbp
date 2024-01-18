import React, { useState, useEffect } from "react";
import Profil from "../components/profilweb";
import Footer from "../components/footer";
import Header from "../components/header";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/profilweb`);
        console.log("Api Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("error fatcing data:", error);
      }
    };
    fetcData();
  }, []);

  const handleEdit = (id) => {
    // Implement edit logic
    console.log(`Edit item with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete logic
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };
  const handleTambah = () => {
    // Navigasi ke halaman tambah Profilweb
    router.push("/tabel-profilweb/edit");
  };
  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 h-screen">
        <h1 className="text-2xl font-medium font-poppins mb-4">
          <a className="font-poppins font-semibold text-2xl pr-2">[!]</a>Tabel
          Profil Web
        </h1>
        <Profil data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
