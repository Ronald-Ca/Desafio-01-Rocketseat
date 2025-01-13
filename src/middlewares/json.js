export async function json(req) {
    // Armazena os chunks (fragmentos) de dados recebidos na requisição
    const buffers = []

    // Lê os chunks de dados da requisição de forma assíncrona
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        // Concatena todos os chunks e tenta parsear o conteúdo como JSON
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch (error) {
        // Caso ocorra um erro (ex.: JSON inválido), define `req.body` como `null`
        req.body = null
    }
}