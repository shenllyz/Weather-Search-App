export function formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    const weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday: string = weekdays[date.getDay()];
    
    const months: string[] = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    const month: string = months[date.getMonth()];

    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${weekday}, ${month} ${day}, ${year}`;
}


export function formatSunrise(sunriseTime: string): string {
    const sunrise = new Date(sunriseTime);

    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',  
        hour12: true,
        timeZone: 'America/Los_Angeles'
    };

    return sunrise.toLocaleTimeString('en-US', options);
}

export function formatSunset(sunsetTime: string): string {
    const sunset = new Date(sunsetTime);

    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',  
        hour12: true,
        timeZone: 'America/Los_Angeles'
    };

    return sunset.toLocaleTimeString('en-US', options);
}