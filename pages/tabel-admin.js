import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Admin from "../components/admin";
import axios from "axios";

const TabelAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users`);
        console.log("Api Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("error fatcing data:", error);
      }
    };
    fetcData();
  }, []);

  const handleEdit = (id) => {
    // Implement edit logic, e.g., navigate to an edit page
    console.log(`Edit item with ID ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete logic
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };
  const handleAdd = () => {
    // Implement add logic
    console.log("Tambah Akun");
  };

  return (
    <>
      <Header />
      <div className="flex-1 container mx-auto py-12 min-h-screen">
        <h1 className="text-2xl font-medium font-poppins mb-4">
          <a className="font-poppins font-semibold text-2xl pr-2">[!]</a>Tabel
          Admin
        </h1>
        <Admin
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

export default TabelAdmin;
