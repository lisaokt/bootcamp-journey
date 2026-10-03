"use client";

import { deleteMessageAction } from "./actions";

export default function DeleteButton({ id }) {
  const handleDelete = async () => {
    await deleteMessageAction(id);
  };

  return (
    <button
      onClick={handleDelete}
      className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm whitespace-nowrap"
    >
      Hapus
    </button>
  );
}