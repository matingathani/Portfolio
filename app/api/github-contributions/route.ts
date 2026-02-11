import { NextRequest, NextResponse } from "next/server";

const CONTRIB_API = "https://github-contributions-api.jogruber.de/v4";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username") || "matingathani";
  const currentYear = new Date().getFullYear();
  try {
    const [lastYearRes, thisYearRes] = await Promise.all([
      fetch(`${CONTRIB_API}/${username}?y=last`, { next: { revalidate: 3600 } }),
      fetch(`${CONTRIB_API}/${username}?y=${currentYear}`, { next: { revalidate: 3600 } }),
    ]);
    if (!lastYearRes.ok) throw new Error("GitHub contributions fetch failed");
    const lastYear = (await lastYearRes.json()) as { total?: { lastYear?: number } };
    const totalLastYear = lastYear.total?.lastYear ?? 0;
    let contributionsThisYear = 0;
    if (thisYearRes.ok) {
      const thisYear = (await thisYearRes.json()) as { total?: Record<string, number> };
      contributionsThisYear = thisYear.total?.[String(currentYear)] ?? 0;
    }
    const totalContributions = totalLastYear + contributionsThisYear;
    return NextResponse.json({
      contributionsLastYear: totalLastYear,
      contributionsThisYear: contributionsThisYear,
      totalContributions,
      estimatedLinesOfCode: Math.round(totalContributions * 45),
    });
  } catch (e) {
    console.error("github-contributions", e);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 502 }
    );
  }
}
