import { getAllFavorites, addFavorite } from "@/lib/services/favoriteService";

export async function GET() {
  return Response.json(getAllFavorites());
}
 
//code lama
// export async function POST(request) {
//   const body = await request.json();
//   const result = addFavorite(body);

//   if (!result.success) {
//     return Response.json({ error: result.error }, { status: result.status });
//   }

//   return Response.json(result.data, { status: result.status });
// }

//code baru
export async function POST(request) {
  try{
    const body = await request.json();

    //validasi --> Jika body yang dikirim kosong, kembalikan status 400 dengan pesan error yang jelas.
    if(!body || Object.keys(body).length === 0){
      return Response.json(
        { error: "Request body tidak boleh kosong. Kirim data user."},
        { status: 400}
      );
    }

    // validasi --> check field id
    if(!body.id){
      return Response.json(
        { error: "Field 'id' diperlukan" },
        { status: 400 }
      );
    }

    const result = addFavorite(body);

    if(!result.success){
      return Response.json(
        { error: result.error }, 
        { status: result.status }
      );
    }
    return Response.json(result.data, { status: result.status});
  } catch (error){
    return Response.json(
      { error: result.error }, 
      { status: result.status }
    );
  }
}