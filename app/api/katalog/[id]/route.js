import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // sesuaikan path ke client prisma kamu

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        series: true,      // <-- WAJIB: Ambil data dari ProductSeries (defaultDesc)
        accessoriess: true, // Ambil data kelengkapan
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("API Error Detail:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}