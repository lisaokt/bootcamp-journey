import { supabase } from "@/lib/supabase";

export async function findAllFavorites() {
  const { data, error } = await supabase.from("favorites").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function findFavoriteById(id) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function insertFavorite(payload) {
  const { data, error } = await supabase
    .from("favorites")
    .insert(payload)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteFavoriteById(id) {
  const { error } = await supabase.from("favorites").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}

export function updateFavoriteById(id, updateData) {
  // 1. Cari indeks data berdasarkan ID
  const index = favorites.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  // 2. Gabungkan data lama dengan data baru yang di-update
  favorites[index] = {
    ...favorites[index],
    ...updateData,
    updatedAt: new Date().toISOString(), // Opsional: catat waktu perubahan
  };

  // 3. Kembalikan data yang sudah diperbarui
  return favorites[index];
}