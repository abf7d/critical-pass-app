export interface CanUndoRedo {
    canUndo: boolean;
    canRedo: boolean;
    undoCount?: number;
    redoCount?: number;
}
