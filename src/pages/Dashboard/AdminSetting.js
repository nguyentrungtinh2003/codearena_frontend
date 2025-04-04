import { useState } from "react";
import { FaCog, FaUserShield, FaBell, FaCreditCard } from "react-icons/fa";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex-1">
      <div className="flex-1 flex flex-col h-fit py-6 px-3">
        <AdminNavbar />

        <div className="flex gap-2 items-center mb-4">
          <FaCog size={30} />
          <h2 className="text-lg font-bold">Admin Settings</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b pb-2">
          {[
            { key: "general", icon: <FaCog />, label: "General" },
            {
              key: "account",
              icon: <FaUserShield />,
              label: "Account Settings",
            },
            {
              key: "configuration",
              icon: <FaCreditCard />,
              label: "Configuration",
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === tab.key
                  ? "font-bold bg-scolor text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow space-y-4">
          {activeTab === "general" && (
            <div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="w-1/4 text-gray-700 font-medium">
                    Website Name:
                  </label>
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scolor"
                    placeholder="Code Arena"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="w-1/4 text-gray-700 font-medium">
                    Logo:
                  </label>
                  <input
                    type="file"
                    className="flex-1 border rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex justify-end">
                  <button className="text-white px-6 py-2 bg-scolor text-ficolor rounded-lg hover:bg-opacity-80">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="w-1/4 text-gray-700 font-medium">
                    Avatar:
                  </label>
                  <input
                    type="file"
                    className="flex-1 border rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="w-1/4 text-gray-700 font-medium">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scolor"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="w-1/4 text-gray-700 font-medium">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scolor"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="w-1/4 text-gray-700 font-medium">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scolor"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "configuration" && (
            <div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="w-1/4 text-gray-700 font-medium">
                    Dark Mode:
                  </label>
                  <input type="checkbox" className="w-6 h-6" />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="w-1/4 text-gray-700 font-medium">
                    Language:
                  </label>
                  <select className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scolor">
                    <option>English</option>
                    <option>Vietnamese</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
