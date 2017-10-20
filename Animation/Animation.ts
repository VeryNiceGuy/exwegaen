class Animation {
    name: string;
    duration: number;

    getName(): string {
        return this.name;
    }

    getDuration(): number {
        return this.duration;
    }

    constructor(name: string, duration: number) {
        this.name = name;
        this.duration = duration;
    }
}
