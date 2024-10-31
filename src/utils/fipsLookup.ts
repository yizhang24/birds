import fipsTable from "@/data/fips.json";

export function lookup(state: string, county: string) {
    return fipsTable.find(item => item.STATE == state && item.COUNTYNAME == county).COUNTYFP;
}