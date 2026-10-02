import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ---------------------------------------------------------------------------
  // 0. Filter Asset Internal & API
  // ---------------------------------------------------------------------------
  // Mencegah intercept pada file build Next.js/Turbopack, file statis, dan API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ---------------------------------------------------------------------------
  // 1. Fitur: Logger
  // ---------------------------------------------------------------------------
  // Mencatat setiap request halaman yang masuk ke terminal server
  const waktu = new Date().toISOString();
  console.log(`[LOG - ${waktu}] ${request.method} ${pathname}`);

  // ---------------------------------------------------------------------------
  // 2. Fitur: Maintenance Mode
  // ---------------------------------------------------------------------------
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const isMaintenancePage = pathname === "/maintenance";

  if (isMaintenance && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // Jika maintenance mode sedang aktif dan user membuka halaman /maintenance,
  // langsung kembalikan respon agar tidak kena Auth Guard di bawahnya.
  if (isMaintenancePage) {
    return NextResponse.next();
  }

  // ---------------------------------------------------------------------------
  // 3. Fitur: Auth Guard
  // ---------------------------------------------------------------------------
  // Daftar rute halaman privat yang butuh login
  const protectedRoutes = ["/favorites", "/dashboard", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const token = request.cookies.get("token");

  // Jika mencoba akses halaman privat tapi belum punya token -> lempar ke login / home
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ---------------------------------------------------------------------------
  // Lanjutkan request jika semua pengecekan aman
  // ---------------------------------------------------------------------------
  return NextResponse.next();
}