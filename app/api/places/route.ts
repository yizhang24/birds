import { NextRequest } from "next/server";

const idToRequests = new Map<string, number>();
const limitParams = {
    windowStart: Date.now(),
    windowSize: 5000, // Five second
    maxRequests: 10 // Ten requests per five seconds
};

const limit = (ip: string) => {
    const now = Date.now();
    const reset = now - limitParams.windowStart > limitParams.windowSize;
    if (reset) {
        limitParams.windowStart = now;
        idToRequests.set(ip, 0);
    }
    const tally = idToRequests.get(ip) ?? 0;
    if (tally >= limitParams.maxRequests) return true;
    idToRequests.set(ip, tally + 1);
    return false;
};

export async function GET(req: NextRequest) {
    const ip = req.ip ?? req.headers.get('X-Forwarded-For') ?? "";
    if(limit(ip)) {
        return new Response(JSON.stringify({"message": "rate limited"}), {
            status: 429
        });
    }
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/` +
        `json?input=${encodeURIComponent(query ? query : "")}` +
        `&language=en` +
        `&type=%28cities%29` +
        `&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch {
        return new Response(JSON.stringify({ "message": "Failed to fetch data" }), {
            status: 500
        });
    }
}