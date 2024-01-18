import React, { useState, useEffect } from "react";
import OiTable from "../components/inbox";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import DetailPesan from "../components/detailpesan";

const Home = () => {
  const [data, setData] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vbp-com.preview-domain.com/public/api/pesan"
        );
        console.log("Api Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    // Implement delete logic
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleSearch = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    // Simpan pesan sukses yang ingin ditampilkan
    setSuccessData(selectedItem);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 h-screen flex flex-col">
        <h1 className="text-2xl font-medium font-poppins mb-4">
          <a className="font-poppins font-semibold text-2xl pr-2">[!]</a>Tabel
          Inbox
        </h1>
        <OiTable data={data} onDelete={handleDelete} onSearch={handleSearch} />
        <DetailPesan
          isVisible={isPopupVisible}
          onClose={closePopup}
          data={successData}
        />
      </div>
      <Footer />
    </>
  );
};
export default Home;
