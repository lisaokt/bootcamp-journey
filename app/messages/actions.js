// actions.js
"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function deleteMessageAction(formData) {
  // 1. Ambil id dari FormData
  const id = formData.get("id");

  if (!id) {
    return { success: false, error: "ID tidak ditemukan" };
  }

  try {
    // 2. Hapus langsung dari database Supabase
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error Supabase:", error.message);
      return { success: false, error: error.message };
    }

    // 3. Revalidate halaman agar tampilan langsung diperbarui
    revalidatePath("/messages");

    return { success: true };
  } catch (err) {
    console.error("Server Action Error:", err.message);
    return { success: false, error: err.message };
  }
}