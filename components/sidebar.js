import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-[#5F3C90] text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform ease-in-out duration-300`}
    >
      <button
        onClick={toggleSidebar}
        className="ml-auto justify-end flex p-4 hover:text-[#D37643] transition duration-500"
      >
        <IoCloseOutline size={25} />
      </button>
      <Link href="/dashboard">
        <div className="flex justify-center">
          <Image
            src="/icons/vbp.svg"
            width={100}
            height={600}
            alt="logo-header"
          />
        </div>
      </Link>
      <div className="px-8">
        <div className="flex flex-col font-poppins text-base font-normal ">
          <Link
            href="/dashboard"
            className="pt-6 hover:text-[#D37643] transition duration-500"
          >
            Beranda
          </Link>
          <Link
            href="/tabel-admin"
            className="py-2 hover:text-[#D37643] transition duration-500"
          >
            Tabel Admin
          </Link>
          <Link
            href="/tabel-gallery"
            className=" hover:text-[#D37643] transition duration-500"
          >
            Tabel Galleri
          </Link>
          <Link
            href="/tabel-profilweb"
            className="py-2 hover:text-[#D37643] transition duration-500"
          >
            Tabel Profil Web
          </Link>
          <Link
            href="/tabel-inbox"
            className="hover:text-[#D37643] transition duration-500"
          >
            Tabel Inbox
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
