function clamp(v: number, l: number, h: number): number {
    if(v < l) {
        return l;
    } else if(v > h) {
        return h;
    } else {
        return v;
    }
}