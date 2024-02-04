export enum LIST_ACTION {
    ADD = 'Add',
    REMOVE = 'Remove',
}
export interface ProjectList {
    name: string;
    id: number;
    isNew: boolean;
    action?: LIST_ACTION;
}
