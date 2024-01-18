// Popup.js
import React from "react";

const Popup = ({ isVisible, onClose, message, data }) => {
  return (
    isVisible && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md w-1/2">
          <h1 className="text-lg font-bold mb-4">Sukses!</h1>
          <p>{message}</p>

          {/* Tampilkan data pesan dalam format tabel */}
          {data && (
            <div className="table-container mt-4 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-800">
                <tbody>
                  {Object.entries(data).map(([key, value]) => (
                    <tr key={key}>
                      <td className="border p-2 font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                      <td className="border p-2">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            className="bg-[#D37643] w-full p-2 rounded-md text-white font-poppins text-sm transition duration-500 mt-4"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    )
  );
};

export default Popup;
