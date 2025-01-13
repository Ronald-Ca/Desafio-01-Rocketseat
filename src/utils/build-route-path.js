export function buildRoutePath(path) {
    // Regex para identificar parâmetros dinâmicos na rota (ex: :id, :name)
    const routeParametersRegex = /:([a-zA-Z]+)/g

    // Substitui parâmetros dinâmicos por regex que captura o valor correspondente
    // Ex: '/tasks/:id' => '/tasks/(?<id>[a-z0-9\\-_]+)'
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\\-_]+)')

    // Cria regex final que também permite capturar query strings (ex: ?key=value)
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    // Retorna a regex para ser usada no roteamento
    return pathRegex
}
