/*
-basic async function to hit api and return data of interest
-use url object methods to manipulate the sort of data returned
*/
export async function fetchData({ url, units, options, }) {
    const response = await fetch(url + (units ?? ''), options);
    if (!response.ok) {
        throw new HTTPError(response.status, response.statusText, response);
    }
    return await response.json();
}
export class HTTPError extends Error {
    response;
    status;
    statusText;
    constructor(status, statusText, response) {
        super(statusText);
        this.status = status;
        this.statusText = statusText;
        this.response = response;
    }
}
//# sourceMappingURL=apiUtilities.js.map