export function extractQueryParms(query) {
    return query.substr(1).split('&').reduce((queryParams, paramn) => {
        const [key, value] = paramn.split('=')

        queryParams[key] = value

        return queryParams
    }, {})
}