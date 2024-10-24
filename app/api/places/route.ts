import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('query')
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/` +
        `json?input=${encodeURIComponent(query ? query : "")}` +
        `&language=en` +
        `&type=%28cities%29` +
        `&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return new Response(JSON.stringify(data), {
            status: 200
        })
    } catch (err) {
        return new Response(JSON.stringify({"message" : "Failed to fetch data"}), {
            status:500
        })
    }
}