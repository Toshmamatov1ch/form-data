import React, { useState } from "react";

const UserCard = ({ user, isEditing, onEdit, onDelete }) => {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-md border flex flex-col justify-between gap-4 transition transform hover:-translate-y-1 hover:shadow-lg ${
        isEditing ? "border-amber-400 ring-2 ring-amber-100" : "border-gray-100"
      }`}
    >
      <div>
        <div className="flex items-center gap-3 border-b pb-2 border-gray-100">
          <div
            className={`w-10 h-10 font-bold rounded-full flex items-center justify-center uppercase ${
              isEditing
                ? "bg-amber-100 text-amber-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {user.firstName[0]}
          </div>
          <div className="overflow-hidden">
            <h4 className="font-bold text-gray-800 truncate">
              {user.firstName} {user.lastName}
            </h4>
          </div>
        </div>

        <div className="space-y-1.5 text-sm text-gray-600 mt-3">
          <p className="break-all">
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            {user.email}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Password:</span>{" "}
            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs">
              {user.password}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t pt-3 border-gray-100 mt-auto">
        <button
          onClick={() => onEdit(user)}
          className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium py-1.5 px-3 rounded-lg text-sm transition duration-150 border border-amber-200"
        >
          Tahrirlash
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium py-1.5 px-3 rounded-lg text-sm transition duration-150 border border-rose-200"
        >
          O'chirish
        </button>
      </div>
    </div>
  );
};

// --- ASOSIY FORMA KOMPONENTI ---
const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setSubmittedData((prevList) =>
        prevList.map((user) =>
          user.id === editId ? { ...formData, id: editId } : user,
        ),
      );
      setEditId(null);
    } else {
      setSubmittedData((prevList) => [
        ...prevList,
        { ...formData, id: Date.now() },
      ]);
    }

    setFormData({ firstName: "", lastName: "", email: "", password: "" });
  };

  const handleDelete = (id) => {
    setSubmittedData((prevList) => prevList.filter((user) => user.id !== id));
    if (editId === id) {
      setEditId(null);
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-10">
      {/* Form qismi */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {editId ? "Ma'lumotni tahrirlash" : "Ro'yxatdan o'tish"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Ismingizni kiriting"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Familiyangizni kiriting"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Parolni kiriting"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className={`w-full mt-2 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 shadow-md ${
              editId
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Yangilash" : "Yuborish"}
          </button>
        </form>
      </div>

      {submittedData.length > 0 && (
        <div className="w-full max-w-4xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
            Foydalanuvchilar Ro'yxati
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {submittedData.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
