import { NextRequest, NextResponse } from "next/server";

interface WikiSearchResult {
  title: string;
  snippet: string;
  pageid: number;
}

interface WikiPage {
  title: string;
  thumbnail?: { source: string };
  extract?: string;
  pageid: number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  if (!query || !query.trim()) {
    return NextResponse.json({ results: [] });
  }

  const searchUrl = `https://ja.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=12&format=json&origin=*`;

  const searchRes = await fetch(searchUrl, {
    headers: { "User-Agent": "project_ACMN_Viv/1.0" },
  });
  const searchData = (await searchRes.json()) as {
    query: { search: WikiSearchResult[] };
  };

  const searchItems: WikiSearchResult[] = searchData.query?.search ?? [];
  if (searchItems.length === 0) {
    return NextResponse.json({ results: [] });
  }

  const titles = searchItems.map((r) => r.title).join("|");
  const detailUrl = `https://ja.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=pageimages|extracts&exintro&explaintext&exsentences=5&pithumbsize=120&format=json&origin=*`;

  const detailRes = await fetch(detailUrl, {
    headers: { "User-Agent": "project_ACMN_Viv/1.0" },
  });
  const detailData = (await detailRes.json()) as {
    query: { pages: Record<string, WikiPage> };
  };

  const pages: WikiPage[] = Object.values(detailData.query?.pages ?? {});

  const stripHtml = (html: string): string =>
    html.replace(/<[^>]*>/g, "").replace(/[<>]/g, "");

  const results = searchItems.map((item) => {
    const page = pages.find((p) => p.title === item.title);
    return {
      pageid: item.pageid,
      title: item.title,
      snippet: stripHtml(item.snippet),
      thumbnail: page?.thumbnail?.source,
      extract: page?.extract,
      url: `https://ja.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
    };
  });

  return NextResponse.json({ results });
}
