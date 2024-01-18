import axios from "axios";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const OiTable = ({ data, onSearch }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin akan menghapus data pesan ini?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/pesan/${id}`);
        window.location.reload();
      } catch (error) {
        console.error("error deleting item:", error);
      }
    }
  };
  return (
    <>
      <table className="w-full overflow-x-auto overflow-y-auto border-collapse border-b">
        <thead>
          <tr className="border-b bg-white">
            <th className="py-2 px-4 font-poppins font-semibold text-base min-w-[10px]">
              No
            </th>
            <th className="py-2 px-4 font-poppins font-semibold text-base min-w-[150px]">
              Nama
            </th>
            <th className="py-2 px-4 font-poppins font-semibold text-base min-w-[150px]">
              Email
            </th>
            <th className="py-2 px-4 font-poppins font-semibold text-base min-w-[150px]">
              Whatsapp
            </th>
            <th className="py-2 px-4 font-poppins font-semibold text-base min-w-[150px]">
              Pesan
            </th>
            <th className="py-2 px-4 font-poppins font-semibold text-base min-w-[150px]">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="py-2 px-4 border-b font-poppins font-medium text-base">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b font-poppins font-medium text-base">
                  {item.nama}
                </td>
                <td className="py-2 px-4 border-b font-poppins font-medium text-base">
                  {item.email}
                </td>
                <td className="py-2 px-4 border-b font-poppins font-medium text-base">
                  {item.no_hp}
                </td>
                <td className="py-2 px-4 border-b font-poppins font-medium text-base">
                  {item.pesan}
                </td>
                <td className="py-2 px-4 border-b font-poppins font-medium text-base">
                  <button
                    className="bg-blue-500 hover:bg-blue-200 text-white px-2 py-1 rounded-full mr-2 transition duration-500 "
                    onClick={() => onSearch(item.id)}
                  >
                    <IoSearch />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-200 text-white px-2 py-1 rounded-full transition duration-500"
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

export default OiTable;
