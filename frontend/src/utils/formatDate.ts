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
