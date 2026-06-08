import React from "react";

function Buttons({ text, type = "button", variant = "primary" }) {
  const styles = {
    primary:
      "mr-4 mt-2 text-white text-center font-semibold py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors",
    secondary:
      "w-full mt-2 text-gray-700 font-semibold py-2.5 px-4 rounded bg-gray-200 hover:bg-gray-300 transition-colors",
  };

  return (
    <div className="flex justify-end">
      <button type={type} className={styles.primary}>
        {text}
      </button>
    </div>
  );
}

export default Buttons;
