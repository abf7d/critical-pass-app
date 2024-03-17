import { Project } from '@critical-pass/project/types';
import { off } from 'process';

export interface LibraryPayload {
    projects: Project[];
    append: boolean;
}
export interface LibraryPagePayload {
    limit: number;
    offset: number;
    searchValue?: string; // Value to search for within the specified JSON property
    searchProperty?: string; // JSON path for the property to search in dot notation, e.g., "details.name"
    sortProperty?: string; // JSON path for the property to sort by in dot notation, e.g., "details.priority"
    order?: 'ASC' | 'DESC'; // Sort order
}
