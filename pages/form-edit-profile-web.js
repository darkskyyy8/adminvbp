import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";

function formeditprofileweb() {
  return (
    <>
      <Header />
      <div className="flex flex-col px-52 h-screen">
        <h1 className="text-center py-4 font-poppins text-lg">
          Edit Profil Web
        </h1>
        <div>
          <input
            placeholder="Judul"
            className="border h-9 w-full rounded-md px-4 outline-none"
          />
        </div>
        <div className="py-4">
          <input
            placeholder="Sub-Judul"
            className="border h-9 w-full rounded-md px-4 outline-none"
          />
        </div>
        <div className="pl-4 flex flex-row">
          <div>
            <button className="bg-[#D37643] w-30 hover:bg-white p-1 rounded-md text-white hover:text-[#D37643] font-poppins text-sm transition duration-500">
              Edit
            </button>
          </div>
          <div className="px-1">
            <button className="bg-white w-30 hover:bg-[#D37643] text-[#D37643] hover:text-white p-1 rounded-md font-poppins text-sm transition duration-500">
              Batal
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default formeditprofileweb;
