import React, { FC } from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="bg-black w-56 absolute top-16 left-48 py-5 border-2 flex-col border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-white hover:underline">Home</div>
        <div className="px-3 text-white hover:underline">Series</div>
        <div className="px-3 text-white hover:underline">Movies</div>
        <div className="px-3 text-white hover:underline">My List</div>
        <div className="px-3 text-white hover:underline">
          Browse by languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
