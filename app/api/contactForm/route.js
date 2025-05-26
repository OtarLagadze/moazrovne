import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  formData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY || "");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  return NextResponse.json(data);
}