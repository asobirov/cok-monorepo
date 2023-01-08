import axios from 'axios';
import nodeICal, { VEvent } from 'node-ical';
import { formatEvent } from './format';

export const parseICalFromUrl = async (url: string) => {
    const { async: ical } = nodeICal;

    console.log('iCal request start')
    const { data } = await axios.get(url, {
        headers: {
            'Cache-Control': 'private, max-age=3600',
        }
    })

    console.log('iCal request end')

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
// /        upComingEvents: 
    }
}