import { removeFavorite, updateFavorite } from "@/lib/services/favoriteService";

export async function DELETE(request, { params }) {
  const { id } = await params;
  const numId = Number(id);
  const result = removeFavorite(numId);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json({ message: "Berhasil dihapus" });
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const numId = Number(id);
    
    // Debug: log dulu
    console.log("PATCH id:", numId);
    
    const body = await request.json();
    console.log("PATCH body:", body);

    if (!body || Object.keys(body).length === 0) {
      return Response.json(
        { error: "Request body tidak boleh kosong" },
        { status: 400 }
      );
    }

    const result = updateFavorite(numId, body);
    console.log("Update result:", result);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: result.status });
    }

    return Response.json(result.data, { status: 200 });
    
  } catch (error) {
    console.error("PATCH ERROR:", error);  // ← Lihat error log di terminal!
    return Response.json(
      { error: "Gagal update favorite", message: error.message },
      { status: 500 }
    );
  }
}