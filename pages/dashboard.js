import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { CiMail, CiCamera, CiClock1 } from "react-icons/ci";
import Header from "../components/header";
import Footer from "../components/footer";

function Index() {
  const [messages, setMessages] = useState([]);
  const [galleryCount, setGalleryCount] = useState();

  useEffect(() => {
    const fetchGalleryCount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/galleries");
        const count = response.data.length;
        setGalleryCount(count);
      } catch (error) {
        console.error("Error fetching gallery count:", error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/pesan?limit=5");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchGalleryCount();
    fetchMessages();
  }, []);

  return (
    <div className="h-screen">
      <Header />
      <div className="flex items-center justify-center pt-10 pb-5">
        <div>
          <CiMail
            size={75}
            className="text-gray-300 hover:text-[#D37643] transition duration-500"
          />
          <p className="text-center py-4 text-gray-300 hover:scale-150 hover:text-[#D37643] transform transition-transform duration-500">
            {messages.length}
          </p>
          <hr className="border-gray-300 w-full" />
        </div>
        <div className="ml-20">
          <CiCamera
            size={75}
            className="text-gray-300 hover:text-[#D37643] transition duration-500"
          />
          <p className="text-center py-4 text-gray-300 hover:scale-150 hover:text-[#D37643] transform transition-transform duration-500">
            {galleryCount}
          </p>
          <hr className="border-gray-300 w-full" />
        </div>
      </div>
      <div className="px-60 pb-10">
        <div className="flex flex-col items-start bg-white p-4">
          <div className="flex bg-[#D37643] w-full h-10 justify-center items-center">
            <h1 className="text-white font-poppins text-lg font-medium">
              Pesan Terbaru
            </h1>
          </div>
          {messages.map((item) => (
            <div key={item.id} className="flex flex-row pt-4">
              <div className="w-7 h-7 rounded-full bg-[#D37643] flex items-center justify-center">
                <CiClock1 className="text-white" />
              </div>
              <div className="flex-col px-2">
                <p className="font-poppins font-light italic text-sm text-gray-600">
                  {item.created_at}
                </p>
                <h1 className="font-poppins font-light text-sm text-[#D37643]">
                  {item.nama}
                  <a className="text-gray-600 font-poppins font-light text-sm px-1">
                    {item.email}
                  </a>
                </h1>
                <p className="text-gray-600 font-poppins font-light text-sm">
                  {item.pesan}
                </p>
                <hr className="w-full mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
