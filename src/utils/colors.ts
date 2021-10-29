export class Colors{
    static toColor(num: number): string {
        const hue = Math.floor(num % 360);
        const pastel = 'hsl(' + hue + ', 100%, 80%)';
        
        return pastel;
    }
}
