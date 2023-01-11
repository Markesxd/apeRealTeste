import { Sort } from './sort';
import { Pageable } from './pageable';
import { Observatory } from './observarory';

export interface DataResponse {
  content: Observatory[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
