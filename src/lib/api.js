export const getRequest = () => ({
    method: 'GET',
    mode: 'cors',
    headers: {
        Accept: 'application/json',
    },
});

export const ResponseType = {
    JSON: 'json',
};

export const postRequest = (data) => ({
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data || {}),
});

export const deleteRequest = () => ({
    method: 'DELETE',
    mode: 'cors',
});

export const putRequest = () => ({
    method: 'PUT',
    mode: 'cors',
});

export const fetchJSON = async (url, options, type = 'text') =>
    await (await fetch(url, options))[type]();

/**
 * Updates url with given params
 * @param {String} url URL string
 * @param {Object} params Params object
 * @returns {String}
 */
export const injectQueryParams = (url, params) =>
    url.concat(
        Object.keys(params)
            .reduce(
                (paramString, paramKey) =>
                    paramString + `${paramKey}=${params[paramKey]}&`,
                '?'
            )
            .slice(0, -1)
    );
