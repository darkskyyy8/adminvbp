import React, { useState, useEffect } from "react";
import GalleryOi from "../components/gallery";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/galleries`);
        console.log("Api Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("error fatcing data:", error);
      }
    };
    fetcData();
  }, []);

  const handleDelete = (id) => {
    // Implement delete logic
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleEdit = (id) => {
    // Implement edit logic
    console.log(`Edit item with id: ${id}`);
  };

  const handleAdd = () => {
    // Implement add logic
    console.log("Tambah item");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex-1 container mx-auto py-12">
        <h1 className="text-2xl font-medium font-poppins mb-4">
          <a className="font-poppins font-semibold text-2xl pr-2">[!]</a>Tabel
          Gallery
        </h1>
        <GalleryOi
          data={data}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onAdd={handleAdd}
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;
