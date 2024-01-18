import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "./sidebar";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="bg-[#5F3C90] p-4 px-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <Sidebar is isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex">
              <button onClick={toggleSidebar}>
                <RxHamburgerMenu className="hover:text-[#D37643] transition duration-500 text-white" />
              </button>
            </div>
          </div>
          <h1 className="pl-2 font-poppins text-white font-semibold text-base">
            Selamat Datang Di Admin Panel
          </h1>
        </div>
        <div>
          <a href="" className="pr-4">
            <button
              type="submit"
              className="bg-[#D37643] hover:bg-[#ffffff] w-36 h-7 rounded-md font-poppins font-medium text-white hover:text-[#D37643] transition duration-500"
            >
              Lihat Website
            </button>
          </a>
          <Link href="/">
            <button
              type="submit"
              className="bg-[#ffffff] hover:bg-[#D37643] w-32 h-7 rounded-md font-poppins font-medium text-[#D37643] hover:text-[#ffffff] transition duration-500"
            >
              Keluar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
