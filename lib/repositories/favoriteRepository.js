import { favorites } from "@/lib/db";

export function findAllFavorites() {
  return favorites;
}

export function findFavoriteById(id) {
  return favorites.find((f) => f.id === id);
}

export function insertFavorite(data) {
  favorites.push(data);
  return data;
}

export function deleteFavoriteById(id) {
  const index = favorites.findIndex((f) => f.id === id);
  if (index === -1) return false;

  favorites.splice(index, 1);
  return true;
}

// ✅ TAMBAHAN: Update Favorite
export function updateFavoriteById(id, updateData) {
  const index = favorites.findIndex((fav) => fav.id === id);
  if (index === -1) return null;

  favorites[index] = {
    ...favorites[index],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };

  return favorites[index];
}