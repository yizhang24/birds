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

const data = JSON.parse('{"predictions":[{"description":"Davis, CA, USA","matched_substrings":[{"length":5,"offset":0}],"place_id":"ChIJP1SVlJkphYAR_4_ibhs_AcM","reference":"ChIJP1SVlJkphYAR_4_ibhs_AcM","structured_formatting":{"main_text":"Davis","main_text_matched_substrings":[{"length":5,"offset":0}],"secondary_text":"CA, USA"},"terms":[{"offset":0,"value":"Davis"},{"offset":7,"value":"CA"},{"offset":11,"value":"USA"}],"types":["geocode","political","locality"]},{"description":"Davis, WV, USA","matched_substrings":[{"length":5,"offset":0}],"place_id":"ChIJhRV4mNTLSogRDls-ZeSXl0E","reference":"ChIJhRV4mNTLSogRDls-ZeSXl0E","structured_formatting":{"main_text":"Davis","main_text_matched_substrings":[{"length":5,"offset":0}],"secondary_text":"WV, USA"},"terms":[{"offset":0,"value":"Davis"},{"offset":7,"value":"WV"},{"offset":11,"value":"USA"}],"types":["locality","political","geocode"]},{"description":"Davison, MI, USA","matched_substrings":[{"length":5,"offset":0}],"place_id":"ChIJvVJTcIh-JIgRgFDLBBejEF4","reference":"ChIJvVJTcIh-JIgRgFDLBBejEF4","structured_formatting":{"main_text":"Davison","main_text_matched_substrings":[{"length":5,"offset":0}],"secondary_text":"MI, USA"},"terms":[{"offset":0,"value":"Davison"},{"offset":9,"value":"MI"},{"offset":13,"value":"USA"}],"types":["geocode","political","locality"]},{"description":"Davis, OK, USA","matched_substrings":[{"length":5,"offset":0}],"place_id":"ChIJ4zH-WkPYsocR38st5i-cN0w","reference":"ChIJ4zH-WkPYsocR38st5i-cN0w","structured_formatting":{"main_text":"Davis","main_text_matched_substrings":[{"length":5,"offset":0}],"secondary_text":"OK, USA"},"terms":[{"offset":0,"value":"Davis"},{"offset":7,"value":"OK"},{"offset":11,"value":"USA"}],"types":["locality","political","geocode"]},{"description":"Davisville, WV, USA","matched_substrings":[{"length":5,"offset":0}],"place_id":"ChIJ-TIiRcGySYgRudA5O1aZHkQ","reference":"ChIJ-TIiRcGySYgRudA5O1aZHkQ","structured_formatting":{"main_text":"Davisville","main_text_matched_substrings":[{"length":5,"offset":0}],"secondary_text":"WV, USA"},"terms":[{"offset":0,"value":"Davisville"},{"offset":12,"value":"WV"},{"offset":16,"value":"USA"}],"types":["geocode","political","locality"]}],"status":"OK"}');

export async function GET(req: NextRequest) {
    const ip = req.ip ?? req.headers.get('X-Forwarded-For') ?? "";
    if(limit(ip)) {
        return new Response(JSON.stringify({"message": "rate limited"}), {
            status: 429
        });
    }
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');
    const uuid = searchParams.get('sessionId');
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/` +
        `json?input=${encodeURIComponent(query ? query : "")}` +
        `&language=en` +
        `&type=%28cities%29` +
        `&sessiontoken=${uuid}` +
        `&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    console.log(url);
    try {
        // const response = await fetch(url);
        // const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch {
        return new Response(JSON.stringify({ "message": "Failed to fetch data" }), {
            status: 500
        });
    }
}