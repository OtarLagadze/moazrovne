import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug" },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  const sanityUrl = `https://cdn.sanity.io/files/8390afyw/production/${slug}.pdf`;
  const res = await fetch(sanityUrl);

  if (!res.ok) {
    return NextResponse.json(
      { error: `Sanity returned ${res.status}` },
      {
        status: res.status,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }

  const arrayBuffer = await res.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}