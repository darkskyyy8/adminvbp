import React, { useRef, useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import axios from "axios";

const Tambah_Galeri = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationName, setLocationName] = useState("");
  const [galleryName, setGalleryName] = useState("");
  const [video, setVideo] = useState("");
  const [showNewLocationPopup, setShowNewLocationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showDeleteLocationPopup, setShowDeleteLocationPopup] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/locations");
        const locationsData = response.data.locations;

        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setVideo(URL.createObjectURL(selectedFile));
    } else {
      setVideo(""); // Mengosongkan video jika file dibatalkan
    }
  };

  const handleCancelFile = () => {
    // Membersihkan input file dan mengosongkan video
    fileInputRef.current.value = "";
    setVideo("");
  };

  const handleAddLocation = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/locations", {
        nama_location: locationName,
      });

      if (response.data.success) {
        alert("Lokasi baru berhasil ditambahkan!");
        // Lanjutkan dengan langkah-langkah berikutnya (jika diperlukan)
      } else {
        // Tampilkan pesan kesalahan dari server
        if (response.data.errors) {
          // Jika terdapat kesalahan validasi
          alert(
            `Gagal menambahkan lokasi. ${
              response.data.message || "Silakan coba lagi."
            }`
          );
        } else if (
          response.data.message === "Location with this name already exists."
        ) {
          // Jika lokasi dengan nama yang sama sudah ada
          alert("Gagal menambahkan lokasi. Nama lokasi sudah ada.");
        } else {
          // Jika terdapat kesalahan lain
          alert("Gagal menambahkan lokasi. Silakan coba lagi.");
        }
      }
    } catch (error) {
      console.error("Error adding location:", error);
      alert("Gagal menambahkan lokasi. Silakan coba lagi.");
    }
  };

  const handleAddGallery = async () => {
    try {
      if (!selectedLocation) {
        alert("Silakan pilih lokasi.");
        return;
      }

      if (!galleryName) {
        alert("Silakan isi nama galeri.");
        return;
      }

      if (!fileInputRef.current.files[0]) {
        alert("Silakan Masukan Video.");
        return;
      }

      const formData = new FormData();
      formData.append("nama", galleryName);
      formData.append("video", fileInputRef.current.files[0]);
      formData.append("location_id", selectedLocation);

      setShowSuccessPopup(true);

      const response = await axios.post(
        "http://localhost:8000/api/galleries",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setSelectedLocation("");
      setGalleryName("");
      setVideo("");
    } catch (error) {
      console.error("Error adding gallery:", error);
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
  };

  const handleDeleteLocation = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/locations/${selectedLocation}`
      );

      if (response.data.success) {
        alert("Lokasi berhasil dihapus!");

        const updatedLocations = locations.filter(
          (location) => location.id !== selectedLocation
        );
        setLocations(updatedLocations);
        setSelectedLocation("");
        setShowDeleteLocationPopup(false);
      } else {
        alert(
          `Gagal menghapus lokasi. ${
            response.data.message || "Silakan coba lagi."
          }`
        );
      }
    } catch (error) {
      console.error("Error deleting location:", error);
      alert("Gagal menghapus lokasi. Silakan coba lagi.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex justify-center mx-auto border-none p-2 px-12 rounded-md py-12">
        <div>
          <h1 className="text-center text-lg font-bold mb-4">
            Tambah Data Galeri
          </h1>

          <div className="flex mb-2">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border p-1 rounded-md mr-2 w-3/4 outline-none text-gray-400"
            >
              <option value="" disabled selected hidden>
                Pilih lokasi
              </option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.nama_location}
                </option>
              ))}
            </select>
            <button
              className="bg-[#D37643] text-white p-1 rounded-md hover:bg-white hover:text-[#D37643] font-poppins text-xs transition duration-500 w-1/4"
              onClick={() => setShowNewLocationPopup(true)}
            >
              Tambah Lokasi Baru
            </button>
          </div>

          {showNewLocationPopup && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-2 rounded-md">
                <h1 className="text-sm font-bold mb-2">Tambah Lokasi Baru</h1>
                <input
                  placeholder="Tambah Lokasi"
                  className="border h-7 w-full rounded-md px-2 outline-none mb-2"
                  onChange={(e) => setLocationName(e.target.value)}
                />
                <div className="flex space-x-1">
                  <button
                    className="bg-[#D37643] w-1/2 p-1 rounded-md text-white font-poppins text-xs transition duration-500"
                    onClick={handleAddLocation}
                  >
                    Kirim
                  </button>
                  <button
                    className="bg-gray-400 w-1/2 p-1 rounded-md text-white font-poppins text-xs transition duration-500"
                    onClick={() => setShowNewLocationPopup(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}

          {showSuccessPopup && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-2 rounded-md">
                <h1 className="text-sm font-bold mb-2">Sukses!</h1>
                <p>Data gallery berhasil ditambahkan.</p>
                <button
                  className="bg-[#D37643] w-full p-1 rounded-md text-white font-poppins text-xs transition duration-500 mt-2"
                  onClick={handleSuccessPopupClose}
                >
                  Tutup
                </button>
              </div>
            </div>
          )}

          {showDeleteLocationPopup && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-2 rounded-md">
                <h1 className="text-sm font-bold mb-2">Hapus Lokasi</h1>
                <p>Anda yakin ingin menghapus lokasi ini?</p>
                <div className="flex space-x-1 mt-2">
                  <button
                    className="bg-[#D37643] w-1/2 p-1 rounded-md text-white font-poppins text-xs transition duration-500"
                    onClick={handleDeleteLocation}
                  >
                    Ya
                  </button>
                  <button
                    className="bg-gray-400 w-1/2 p-1 rounded-md text-white font-poppins text-xs transition duration-500"
                    onClick={() => setShowDeleteLocationPopup(false)}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="py-2">
            <input
              placeholder="Nama Villa"
              className="border h-7 w-full rounded-md px-2 outline-none mb-2"
              onChange={(e) => setGalleryName(e.target.value)}
            />
          </div>

          <div className="flex items-center mb-2">
            <label className="flex w-full cursor-pointer">
              <span className="bg-[#D37643] w-24 hover:bg-white p-2 rounded-md text-white hover:text-[#D37643] font-poppins text-xs transition duration-500">
                Tambah Video
              </span>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            {video && (
              <button
                className="bg-white w-24 hover:bg-[#D37643] p-2 rounded-md text-[#D37643] hover:text-white font-poppins text-xs transition duration-500 mt-2 ml-2"
                onClick={handleCancelFile}
              >
                Batal
              </button>
            )}
          </div>

          {video && (
            <video width={120} height={120} controls className="mb-2">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <div className="flex space-x-1">
            <button
              className="bg-[#D37643] w-24 hover:bg-white p-2 rounded-md text-white hover:text-[#D37643] font-poppins text-xs transition duration-500"
              onClick={handleAddGallery}
            >
              Simpan
            </button>
            <Link href="/tabel-gallery">
              <button className="bg-white w-24 hover:bg-[#D37643] p-2 rounded-md text-[#D37643] hover:text-white font-poppins text-xs transition duration-500">
                Kembali
              </button>
            </Link>
            {selectedLocation && (
              <button
                className="bg-red-500 text-white w-1/4 hover:bg-white hover:text-red-500 p-1 rounded-md font-poppins text-xs transition duration-500"
                onClick={() => setShowDeleteLocationPopup(true)}
              >
                Hapus Lokasi
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tambah_Galeri;
