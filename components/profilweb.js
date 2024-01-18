import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";

const Profil = ({ data, onEdit, onAdd }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin akan menghapus item ini?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/profilweb/`);
        window.location.reload();
      } catch (error) {
        console.error("error deleting item:", error);
      }
    }
  };

  return (
    <>
      {data.length === 0 && (
        <div className="pb-2">
          <Link href="/tambah-profilweb">
            <button
              className="bg-[#25D366] hover:bg-white w-30 p-2 flex items-end justify-end rounded-md text-white hover:text-[#25d366] font-poppins text-sm transition duration-200"
              onClick={onAdd}
            >
              Tambah
            </button>
          </Link>
        </div>
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Judul</th>
            <th className="py-2 px-4 border-b">Sub Judul</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((profile, index) => (
              <tr key={profile.id} className="text-center">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{profile.judul}</td>
                <td className="py-2 px-4 border-b">{profile.sub_judul}</td>
                <td className="py-2 px-4 border-b">
                  <Link href="/edit-profilweb">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 mr-2 rounded-md hover:bg-blue-200"
                      onClick={() => onEdit(profile.id)}
                    >
                      <FaRegPenToSquare />
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white px-2 py-1 mr-2 rounded-md hover:bg-red-200"
                    onClick={() => handleDelete(profile.id)}
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

export default Profil;
