import { BaseSearchItem, Response } from "../types/search-result";

export const mapSearchResponseToArray = (response: Response): BaseSearchItem[] =>
  response.data.children.map(({ data }) => data);
