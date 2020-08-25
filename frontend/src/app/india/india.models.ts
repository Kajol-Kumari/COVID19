export interface Stats {
    country: string;
    cases: {
        new: number,
        active: number,
        critical: number,
        recovered: number,
        total: number
    };
    deaths: {
        new: number,
        total: number
    };
    test: {
        total: number
    };
    day: Date;
    time: Date;
    chart: [{name: string, value: number}, {name: string, value: number}, {name: string, value: number}, {name: string, value: number}];
}
