export interface ShallowSState {
    svg: any;
    mainG: any;
    innerWidth: number | null;
    innerHeight: number | null;
    focusLine: any;
    margin: { top: number; bottom: number; left: number; right: number };
    scales: { x: any; y: any } | null;
}

export class ShallowSStateFactory {
    create(): ShallowSState {
        return {
            svg: null,
            mainG: null,
            innerWidth: null,
            innerHeight: null,
            margin: { top: 60, right: 90, bottom: 100, left: 90 },
            scales: null,
            focusLine: null,
        };
    }
}
