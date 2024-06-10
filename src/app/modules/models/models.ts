export interface OptionSelect {
  id: number;
  name?: string | number;
}

export const InitOptionSelect: OptionSelect = {
} as OptionSelect;
export interface OptionReactSelect {
  code?: string | number;
  name?: string;
  value?: string | number;
  bacLuong?: string | number;
  heSoLuong?: string | number;
  id?: string;
  scategoryId?: string | number;
  attributeId?: string | number;
}
export const InitOptionReactSelect: OptionReactSelect = {
} as OptionReactSelect;
export interface APIResponse<T = null> {
  timestamp: string;
  code: number;
  message: string;
  data: DataResponse<T> | T | null;
  total: number;
}

type DataResponse<T = unknown> = {
  content: any[] | T[];
  totalPages?: number;
  numberOfElements?: number;
  totalElements?: number;
  pageable: pageable,
}

type pageable = {
  pageNumber: number,
  pageSize: number,
  totalElements: number,
}

export interface IErrorResponse {
  errorMessage: string;
};

export interface IObject {
  [key: string]: any
}
