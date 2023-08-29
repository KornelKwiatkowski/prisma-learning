import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function GET(request: Request) {
  /* Return all memes filtered by title and ordered by create_at */
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  const memes = await prisma.memes.findMany({
    where: {
      title: {
        contains: title || "",
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json(memes);
}

export async function POST(request: Request) {
  /* Add new meme into db. Return newly created meme with 201 http status */
  const { title, url } = await request.json();

  const meme = await prisma.memes.create({
    data: {
      title,
      image_url: url,
    },
  });

  return NextResponse.json(meme, { status: 201 });
}
