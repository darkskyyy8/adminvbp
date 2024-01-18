// EditGaleri.js
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

const EditGaleri = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedLocation, setSelectedLocation] = useState("");
  const [galleryName, setGalleryName] = useState("");
  const [video, setVideo] = useState("");
  const fileInputRef = useRef();
  const [locationsData, setLocationsData] = useState([]);
  const [fileKey, setFileKey] = useState(0);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/locations");
        const fetchedLocations = response.data.locations;

        setLocationsData(fetchedLocations); // Update the state
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        if (!id) {
          // Tambahkan logika atau navigasi jika galeriId tidak ada
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/galleries/${id}`
        );
        const galleryData = response.data;

        setSelectedLocation(galleryData.location_id);
        setGalleryName(galleryData.nama);
        setVideo(galleryData.video_url);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGalleryData();
  }, [id]);

  const handleUpdateGallery = async () => {
    try {
      console.log("Selected Location:", selectedLocation);
      console.log("Gallery Name:", galleryName);

      if (!selectedLocation || !galleryName) {
        alert("Silakan pilih lokasi dan isi nama galeri.");
        return;
      }
      // Proses pembaruan galeri
      const formData = new FormData();
      formData.append("nama", galleryName);
      formData.append("video", fileInputRef.current.files[0]);
      formData.append("location_id", selectedLocation);

      const response = await axios.post(
        `http://localhost:8000/api/galleries/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      // Mungkin tambahkan logika untuk menampilkan pesan sukses atau navigasi ke halaman lain
    } catch (error) {
      console.error("Error updating gallery:", error);
    }
  };

  const handleFileChange = () => {
    const selectedFile = fileInputRef.current.files[0];

    if (selectedFile) {
      setVideo(URL.createObjectURL(selectedFile));
      setFileKey((prevKey) => prevKey + 1); // Memperbarui key untuk merender ulang elemen video
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center text-center flex-col py-12 px-12">
        <h1 className="text-2xl font-bold mb-8">Edit Data Galeri</h1>
        <div className="flex">
          <div className="mr-4 pt-2 font-poppins text-base font-medium">
            Lokasi
          </div>
          <div className="flex mb-4">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border h-max p-2 rounded-md mr-4 outline-none"
            >
              {locationsData.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.nama_location}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <h1 className="mr-2 font-poppins text-base font-medium">
                Ubah Video
              </h1>
              <div className="flex justify-end">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="video/*"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-[#D37643] hover:bg-white p-2 px-8 flex items-end justify-end rounded-md text-white hover:text-[#D37643] font-poppins text-sm transition duration-500"
                >
                  Pilih File
                </button>
              </div>
            </div>
            {video && (
              <video
                key={fileKey}
                width={150}
                height={150}
                controls
                className="mb-4 ml-6"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
        <div className="pb-4">
          <input
            placeholder="Nama Villa"
            className="border h-9 w-[400px] text-center rounded-md px-4 outline-none"
            value={galleryName}
            onChange={(e) => setGalleryName(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-[#D37643] hover:bg-white p-2 px-8 rounded-md text-white hover:text-[#D37643] font-poppins text-sm transition duration-500"
            onClick={handleUpdateGallery}
          >
            Edit
          </button>
          <Link href="/tabel-gallery">
            <div className="bg-white px-8 hover:bg-[#D37643] text-[#D37643] hover:text-white p-2 rounded-md font-poppins text-sm transition duration-500">
              Batal
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditGaleri;
