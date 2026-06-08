import React, { useState, useEffect } from "react";
// Agar Buttons komponentingiz boshqa papkada bo'lsa, yo'lini tekshirib oling:
import Buttons from "./components/Buttons";

const Form = ({ currentUser, onSave, onCancel, title }) => {
  // Inputlar ichidagi qiymatlarni saqlash uchun state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Tahrirlash tugmasi bosilganda inputlarni foydalanuvchi ma'lumotlari bilan to'ldirish
  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.name || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        password: currentUser.password || "",
      });
    } else {
      // Aks holda inputlarni bo'shatish
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
    }
  }, [currentUser]);

  // Inputlarga biror narsa yozilganda formData'ni yangilab boruvchi funksiya
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Forma yuborilganda (Submit bo'lganda)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Ma'lumotlarni App.jsx ga jo'natish

    // Agar yangi foydalanuvchi qo'shilayotgan bo'lsa, yuborilgandan keyin inputlarni tozalaymiz
    if (!currentUser) {
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      {/* Dinamik sarlavha (Yangi qo'shish yoki Tahrirlash) */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* FIRST NAME VA LAST NAME INPUTLARI */}
        <div className="flex gap-10 w-full items-center justify-between">
          <div className="flex flex-col w-[50%]">
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

          <div className="flex flex-col w-[50%]">
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
        </div>

        {/* EMAIL VA PASSWORD INPUTLARI */}
        <div className="flex gap-10 w-full items-center justify-between">
          <div className="flex flex-col w-[50%]">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email manzilingizni kiriting"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col w-[50%]">
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
        </div>

        {/* TUGMALAR QISMI */}
        <div className="flex justify-end gap-2 pt-2">
          {/* Agar tahrirlash rejimi bo'lsa (currentUser mavjud bo'lsa), Bekor qilish tugmasi chiqadi */}
          {currentUser && (
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-700 font-semibold py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Bekor qilish
            </button>
          )}
          {/* Agar tahrirlash bo'lsa "Saqlash", yangi bo'lsa "Yuborish" matni chiqadi */}
          <Buttons
            text={currentUser ? "Saqlash" : "Yuborish"}
            type="submit"
            variant="primary"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
