/*
-basic async function to hit api and return data of interest
-use url object methods to manipulate the sort of data returned
*/
export async function fetchData<TData>({
  url,
  units,
  options,
}: {
  url: string;
  units?: string;
  options?: RequestInit;
}): Promise<TData> {
  const response = await fetch(url + (units ?? ''), options);

  if (!response.ok) {
    throw new HTTPError(response.status, response.statusText, response);
  }
  return await response.json();
}
export class HTTPError extends Error {
  readonly response: any;
  readonly status: number;
  readonly statusText: string;

  constructor(status: number, statusText: string, response: any) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
    this.response = response;
  }
}
