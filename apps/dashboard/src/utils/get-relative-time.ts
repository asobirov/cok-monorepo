export const getRelativeTime = (from: Date, to: Date) => {
    const secondsPast = (to.getTime() - from.getTime()) / 1000;
    if (secondsPast < 60) {
        return Math.round(secondsPast) + 's';
    }
    if (secondsPast < 3600) {
        return Math.round(secondsPast / 60) + 'm';
    }
    if (secondsPast <= 86400) {
        return Math.round(secondsPast / 3600) + 'h';
    }
    if (secondsPast > 86400) {
        
        return new Intl.DateTimeFormat('en-GB', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }).format(to);
    }
}