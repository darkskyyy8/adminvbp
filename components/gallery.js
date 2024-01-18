import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";

const GalleryOi = ({ data, onDelete, onEdit, onAdd }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin akan menghapus item ini?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/galleries/${id}`);
        window.location.reload();
      } catch (error) {
        console.error("error deleting item:", error);
      }
    }
  };

  return (
    <>
      <div className="pb-4">
        <Link href="/tambah-galery">
          <button
            className="bg-[#25D366] hover:bg-white text-white hover:text-[#25D366] px-4 py-2 mb-4 rounded-md transition duration-500"
            onClick={onAdd}
          >
            Tambah
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b font-poppins font-semibold text-base">
              No
            </th>
            <th className="py-2 px-4 border-b font-poppins font-semibold text-base">
              Lokasi
            </th>
            <th className="py-2 px-4 border-b font-poppins font-semibold text-base">
              Gallery
            </th>
            <th className="py-2 px-4 border-b font-poppins font-semibold text-base">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  {item.location.nama_location}
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-center">
                    <video width={100} height={400} controls>
                      <source
                        src={"http://127.0.0.1:8000/storage/" + item.video}
                      ></source>
                    </video>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <a href={"form-edit-galery?id=" + item.id}>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 mr-2 rounded-md hover:bg-blue-200"
                      onClick={() => onEdit(item.id)}
                    >
                      <FaRegPenToSquare />
                    </button>
                  </a>
                  <button
                    className="bg-red-500 text-white px-2 py-1 mr-2 rounded-md hover:bg-red-200"
                    onClick={() => handleDelete(item.id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default GalleryOi;
