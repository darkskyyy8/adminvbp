import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

const EditProfilwebPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    judul: "",
    sub_judul: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`https://vbp-com.preview-domain.com/public/api/profilweb/${id}`)
        .then((response) => setFormData(response.data))
        .catch((error) =>
          console.error("Error fetching Profilweb data:", error)
        );
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const apiUrl = "https://vbp-com.preview-domain.com/public/api/profilweb";

    // Cek apakah data sudah ada dengan ID yang diberikan
    if (id) {
      // Jika data sudah ada, lakukan operasi edit/update
      axios
        .put(`${apiUrl}/${id}`, formData)
        .then((response) => {
          console.log("Profilweb updated successfully:", response.data);
          router.push("/profilweb");
        })
        .catch((error) => console.error("Error updating Profilweb:", error));
    } else {
      // Jika data belum ada, lakukan operasi tambah
      axios
        .post(apiUrl, formData)
        .then((response) => {
          console.log("Profilweb added successfully:", response.data);
          router.push("/tabel-profilweb");
        })
        .catch((error) => console.error("Error adding Profilweb:", error));
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 flex-col px-96">
        <h1 className="text-2xl text-center font-bold pb-4">
          {id ? "Edit Profilweb" : "Edit Profile Web"}
        </h1>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded outline-none"
          placeholder="Judul"
          name="judul"
          value={formData.judul}
          onChange={handleChange}
        />
        <input
          type="text"
          className="w-full p-2 mb-8 border rounded outline-none"
          placeholder="Sub judul"
          name="sub_judul"
          value={formData.sub_judul}
          onChange={handleChange}
        />
        <div className="flex justify-">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            type="button"
            onClick={handleSave}
          >
            {id ? "Update" : "Simpan"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfilwebPage;
