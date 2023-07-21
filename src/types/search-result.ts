export type WithNull<T> = T | null;

export type ResponseHasMoreDataMarker = WithNull<string>;

export interface BaseSearchItem {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  [ken: string]: unknown;
}

export interface SearchResult {
  kind: string;
  data: BaseSearchItem;
}

export interface ResponseData {
  after: ResponseHasMoreDataMarker;
  before: ResponseHasMoreDataMarker;
  children: SearchResult[];
  dist: number;
  geo_filter?: any;
  modhash?: string;
}

export interface ResponseError {
  error?: number;
  message?: string;
  reason?: string;
}
export interface Response extends ResponseError {
  kind: string;
  data: ResponseData;
}
