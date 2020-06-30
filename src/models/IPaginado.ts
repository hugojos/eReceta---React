export interface IPaginado <T> {
    content?: T[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    pageable?: {
        offset?: number;
        pageNumber?: number;
        pageSize?: number;
        paged?: boolean;
        sort?: ISort;
        unpaged?: boolean;
    }
    size?: number;
    sort?: ISort;
    totalElements?: number;
    totalPages?: number;
}

interface ISort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}