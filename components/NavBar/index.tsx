import Image from "next/image";
import React, { useEffect, useState } from "react";
import NavbarItems from "../NavBarItems";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "../MobileMenu";
import AccountMenu from "../accountMenu";
const TOP_OFFSET = 66;
const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.screenY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40 ">
      <div
        className={`px-4  md:px-16 py-6 flex flex-row items-center transition duration-500 
        ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}
      
      `}
      >
        <Image src="/images/logo.png" alt="logo" width={150} height={20} />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItems label="Home" />
          <NavbarItems label="Series" />
          <NavbarItems label="Films" />
          <NavbarItems label="My List" />
          <NavbarItems label="Browse by languages" />
        </div>
        <div
          onClick={() => setShowMobileMenu((prev) => !prev)}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-700 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-700 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={() => setShowAccountMenu((prev) => !prev)}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/profile_blue.jpg" alt="profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              } `}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
