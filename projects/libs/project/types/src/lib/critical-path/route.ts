import { Vertex } from './vertex';
import { Edge } from './edge';

export interface Route {
    startId: number;
    endId: number;
    vertices: Array<Vertex>;
    edges: Array<Edge>;
    found: boolean;
    unvisited: Array<any>;
    end: Vertex | null;
    start: Vertex | null;
    pathFound: boolean;
    isRunning: boolean;
}
