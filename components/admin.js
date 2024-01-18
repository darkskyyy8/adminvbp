import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";

const Admin = ({ data, onEdit, onAdd }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin ingin menghapus akun ini?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
        window.location.reload();
      } catch (error) {
        console.error("error deleting akun:", error);
      }
    }
  };

  return (
    <>
      <Link href="/tambah-admin">
        <button
          className="bg-[#25D366] hover:bg-white text-white hover:text-[#25D366] px-4 py-2 mb-4 rounded-md transition duration-500"
          onClick={onAdd}
        >
          Tambah
        </button>
      </Link>
      <table className="min-w-full border-gray-300">
        <thead className="bg-white">
          <tr>
            <th className="py-2 px-4 border-b font-poppins font-semibold text-base">
              No
            </th>
            <th className="py-2 px-4 border-b font-poppins font-semibold text-base">
              Nama
            </th>
            <th className="py-2 px-4 border-b font-poppins font-semibold text-base">
              Email
            </th>
            <th className="py-2 px-4 border-b font-poppins font-semibold text-base">
              Password
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
                <td className="py-2 px-4 border-b font-poppins font-medium text-base">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b font-poppins font-medium text-base">
                  {item.name}
                </td>
                <td className="py-2 px-4 border-b font-poppins font-medium text-base">
                  {item.email}
                </td>
                <td className="py-2 px-4 border-b font-poppins font-medium text-base">
                  {item.password}
                </td>
                <td className="py-2 px-4 border-b font-poppins font-medium text-base">
                  <a href={"/edit-admin?=id" + item.id}>
                    <button
                      className="bg-blue-500 hover:bg-blue-200 text-white px-2 py-1 mr-2 rounded-full transition duration-500"
                      onClick={() => onEdit(item.id)}
                    >
                      <FaRegPenToSquare />
                    </button>
                  </a>
                  <button
                    className="bg-red-500 hover:bg-red-200 text-white px-2 py-1 rounded-full transtion duration-500"
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

export default Admin;
