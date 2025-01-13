import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParms } from './utils/extract-query-params.js'

// Criação do servidor HTTP
const server = http.createServer(async (req, res) => {
    // Extração das propriedades url e method do objeto req
    const { url, method } = req

    // Middleware para processar o corpo da requisição e anexar o objeto `body` ao objeto `req`
    await json(req, res)

    // Busca uma rota que corresponda ao método HTTP e ao padrão da URL
    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        // Extrai parâmetros da rota (caso existam) usando o padrão definido na rota
        const routeParams = req.url.match(route.path)

        // Separa os parâmetros de consulta (query string) dos parâmetros da rota
        const { query, ...params } = routeParams.groups

        // Armazena os parâmetros da rota no objeto `req`
        req.params = params

        // Armazena os parâmetros de consulta no objeto `req`
        req.query = query ? extractQueryParms(query) : {}

        // Executa o handler associado à rota
        return route.handler(req, res)
    }

    // Retorna um status 404 (não encontrado) se nenhuma rota for correspondente
    return res.writeHead(404).end()
})

// Configura o servidor para escutar na porta 3333
server.listen(3333, () => {
    console.log('Server is running on port 3333')
})