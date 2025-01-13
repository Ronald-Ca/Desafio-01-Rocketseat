export function extractQueryParms(query) {
    return query.substr(1) // Remove o "?" inicial da query string
        .split('&') // Divide a query string em pares `chave=valor` com base no caractere "&"
        .reduce((queryParams, paramn) => {
            const [key, value] = paramn.split('=') // Divide cada par em chave e valor
            queryParams[key] = value // Adiciona a chave e o valor ao objeto acumulador
            return queryParams
        }, {}) // Inicia o objeto acumulador como um objeto vazio
}
