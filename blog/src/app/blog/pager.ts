export interface Pager {
    limit: number;
    current: number;
    reachedEnd: boolean;
    total: number;
}