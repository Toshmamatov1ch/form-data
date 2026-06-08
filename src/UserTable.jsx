import React from "react";

const UserTable = ({ users, onDelete, onEdit }) => {
  return (
    <div className="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 shadow-md">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
              ID
            </th>
            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
              Familiya va Ism
            </th>
            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
              Email
            </th>
            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">
              Parol
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-semibold text-gray-900 text-right"
            >
              Amallar
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-gray-400">
                  {user.id}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.lastName} {user.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 font-mono text-xs text-gray-400 select-none">
                  <span>{user.password}</span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    {/* TAHRIRLASH TUGMASI YANGILANDI */}
                    <button
                      onClick={() => onEdit(user)}
                      className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      Tahrirlash
                    </button>

                    <button
                      onClick={() => onDelete(user.id)}
                      className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
                    >
                      O'chirish
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                Foydalanuvchilar topilmadi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
