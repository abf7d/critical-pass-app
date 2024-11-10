export interface LibraryFilters {
    page: number;
    pageSize: number;
    listName: string | null;
    sortDirection: string | null;
    ownerFilter: string | null;
    searchFilter: string | null;
    details: string | null;
}
