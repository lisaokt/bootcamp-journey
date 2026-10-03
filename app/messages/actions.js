"use server";

import { revalidatePath } from "next/cache";
import { messages } from "@/lib/db";

export async function deleteMessageAction(id) {
  try {
    // ✅ Cari index pesan berdasarkan id
    const index = messages.findIndex((msg) => msg.id === id);
    
    if (index === -1) {
      return { success: false, error: "Pesan tidak ditemukan" };
    }

    // ✅ Hapus pesan dari array
    messages.splice(index, 1);

    // ✅ Revalidate halaman agar tampilan otomatis update
    revalidatePath("/messages");

    return { success: true, message: "Pesan berhasil dihapus" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}