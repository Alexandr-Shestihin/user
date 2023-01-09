interface IURLParams {
    [key: string]: string;
}

function transformToAssocArray(paramString: string) {
    const params: IURLParams = {};
    const paramArray = paramString.split("&");
    for (let i = 0; i < paramArray.length; i++) {
        const tempArray = paramArray[i].split("=");
        params[tempArray[0]] = tempArray[1];
    }
    return params;
}

export function getUrlParams() {
    const paramString = window.location.search.substr(1);
    return paramString != null && paramString !== "" ? transformToAssocArray(paramString) : {};
}