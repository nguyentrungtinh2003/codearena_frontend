import { useState } from "react";
import { MdDashboardCustomize, MdForum, MdSettingsSuggest } from "react-icons/md";
import { FaBuffer, FaUsers } from "react-icons/fa";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Users");

  const menuItems = [
    { id: "Dashboard", label: "Dashboard", icon: <MdDashboardCustomize size={25} /> },
    { id: "Courses", label: "Courses", icon: <FaBuffer size={25} /> },
    { id: "Users", label: "Users", icon: <FaUsers size={25} /> },
    { id: "Blog", label: "Blog", icon: <MdForum size={25} /> },
    { id: "Setting", label: "Setting", icon: <MdSettingsSuggest size={25} /> },
  ];

  return (
    <div className="w-64 bg-white border-2 p-4 m-2 rounded-2xl font-semibold">
      <h2 className="text-xl font-bold mb-4 text-center">Code Arena</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`p-2 rounded cursor-pointer flex items-center gap-3 transition-colors ${
              activeItem === item.id ? "bg-fcolor text-focolor" : "hover:bg-sicolor"
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            {item.icon} {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}