import { FC } from "react";

interface NavbarItemsProps {
  label: string;
}
const NavbarItems: FC<NavbarItemsProps> = ({ label }) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};

export default NavbarItems;
