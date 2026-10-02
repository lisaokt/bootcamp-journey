const profileData = {
  name: "Lisa Oktarani",
  role: "peserta bootcamp Perempuan Inovasi 2026",
  favoriteTech: ["Next.js", "Tailwind CSS", "React", "Supabase"],
};

export async function GET() {
  return Response.json(profileData);
}