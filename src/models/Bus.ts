export interface Pagination {
    page: number;
    size: number;
    sort: string[];
  }

export interface Page {
    content:          Bus[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Bus {
    id:            number;
    bus_number:    number;
    license_plate: string;
    features:      string;
    status:        boolean;
    brand_name:    string;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
export const createPaginationOption = (req: Pagination): URLSearchParams => {
    const params = new URLSearchParams();
    
    params.append("page", req.page.toString());
    params.append("size", req.size.toString());

    return params;
};