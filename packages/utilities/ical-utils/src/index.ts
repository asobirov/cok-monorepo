import axios from 'axios';
import nodeICal, { VEvent } from 'node-ical';
import { formatEvent } from './format-event';

export const parseICalFromUrl = async (url: string) => {
    const { async: ical } = nodeICal;

    const { data } = await axios.get(url, {
        headers: {
            'Cache-Control': 'private, max-age=3600',
        }
    })

    const webEvents = await ical.parseICS(data);

    return webEvents;
}

export const getClosestEventByUrl = async (url?: string) => {
    if (!url) {
        return {
            closestEvent: null,
            events: null,
        }
    }
    const events = await parseICalFromUrl(url);

    const now = new Date();

    const closestEvent = Object.values(events).reduce((closest, event) => {
        if (event.type !== 'VEVENT') return closest;

        if (event.start > now && (!closest || event.start < closest.start)) {
            return event;
        }
        return closest;
    }, null as VEvent | null);

    return {
        closestEvent: formatEvent(closestEvent),
        // upcomingEvents: 
    }
}