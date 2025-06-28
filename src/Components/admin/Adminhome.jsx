import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [admin, setAdmin] = useState({ name: "", role: "" });
    const navigate= useNavigate()
  useEffect(() => {
    const name = localStorage.getItem("name") || "Admin";
    const role = localStorage.getItem("role") || "admin";

    setAdmin({ name, role });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-6">
      <button className=" cursor-pointer bg-emerald-600 p-5 font-bold text-emerald-50 rounded-4xl"
        onClick={() => {
          localStorage.removeItem("name");
          localStorage.removeItem("role");
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          navigate('/login')
        }}
      >LogOut</button>
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, <span className="text-blue-600">{admin.name}</span>
          </h1>
          <span className="bg-blue-200 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
            Role: {admin.role}
          </span>
        </header>

        <main className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Users</h2>
            <p className="text-gray-600">
              Manage registered users and permissions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Products
            </h2>
            <p className="text-gray-600">
              Add, edit, or delete store products.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Orders</h2>
            <p className="text-gray-600">
              View and manage recent orders and invoices.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Analytics
            </h2>
            <p className="text-gray-600">View charts and business insights.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Settings
            </h2>
            <p className="text-gray-600">
              Update store settings and preferences.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
