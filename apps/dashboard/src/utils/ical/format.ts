import { VEvent } from "node-ical";

export const formatEvent = (event: VEvent | null) => {
    if (!event) return null;

    const { start, end, summary, description, location } = event;

    const dArr = description
        .replace(/\t\t\n/g, "") // Workaround for "Week Pattern" description
        .replace(/[\t\r]/g, "")
        .split("\n")
        .filter(Boolean)

    const dObj: Record<string, string> = {};
    for (const row of dArr) {
        const fRow = row.split(/:(.+)/);
        const key = fRow[0]?.trim().toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        const value = fRow[1].trim();
        if (key && value) {
            dObj[key] = value;
        }
    }

    dObj.moduleName = dObj.moduleName.match(/CS[0-9]{4}/g)?.[0] ?? '';

    return {
        start,
        end,
        summary,
        location,
        description: dObj
    }
}