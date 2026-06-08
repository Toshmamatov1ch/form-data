import React, { useState } from "react";
import { initialUsers } from "./data/users";
import UserTable from "./UserTable";
import Form from "./Form";

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Tahrirlash bosilganda modalni ochish
  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  // YANGI FOYDALANUVCHI QO'SHISH (Avtomatik ketma-ket ID bilan)
  const handleAddUser = (formData) => {
    // 1. Agar massiv bo'sh bo'lsa, ID 1 dan boshlanadi.
    // 2. Bo'sh bo'lmasa, barcha ID-larni raqamga o'girib, eng kattasini topamiz va 1 qo'shamiz.
    let nextId = 1;
    if (users.length > 0) {
      const maxId = Math.max(...users.map((u) => Number(u.id)));
      nextId = maxId + 1;
    }

    const newUser = {
      id: String(nextId), // ID-ni satr (string) ko'rinishida saqlaymiz
      name: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    setUsers([...users, newUser]);
  };

  // Tahrirlangan foydalanuvchini saqlash
  const handleUpdateUser = (formData) => {
    setUsers(
      users.map((u) =>
        u.id === currentUser.id
          ? {
              ...u,
              name: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              password: formData.password,
            }
          : u,
      ),
    );
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* TEPADAGI DOIMIY FORMA */}
      <Form onSave={handleAddUser} title="Yangi foydalanuvchi qo'shish" />

      <div className="max-w-7xl mx-auto mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Tizim foydalanuvchilari
        </h2>
        <UserTable
          users={users}
          onDelete={(id) => setUsers(users.filter((u) => u.id !== id))}
          onEdit={handleEdit}
        />
      </div>

      {/* TAHRIRLASH MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>

            <div className="p-4">
              <Form
                currentUser={currentUser}
                onSave={handleUpdateUser}
                onCancel={() => setIsModalOpen(false)}
                title="Foydalanuvchini tahrirlash"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
