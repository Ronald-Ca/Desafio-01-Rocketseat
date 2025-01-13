import fs from 'node:fs/promises'

// Caminho para o arquivo de banco de dados JSON
const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    // Objeto privado para armazenar os dados do banco
    #database = {}

    constructor() {
        // Carrega o banco de dados do arquivo na inicialização
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            // Cria o arquivo se ele não existir
            this.#persist()
        })
    }

    // Método privado para salvar o banco de dados no arquivo
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    // Seleciona registros de uma tabela, com suporte a filtros de busca
    select(table, search) {
        // Obtém os dados da tabela ou retorna um array vazio
        let data = this.#database[table] ?? []
    
        if (search) {
            // Filtra os registros com base no critério de busca
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return (
                        typeof row[key] === 'string' &&
                        row[key].toLowerCase().includes(value.toLowerCase())
                    )
                })
            })
        }
    
        return data
    }
    
    // Insere um novo registro em uma tabela
    insert(table, data) {
        // Adiciona o registro à tabela ou cria a tabela, se necessário
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        // Salva as alterações no arquivo
        this.#persist()

        return data
    }

    // Atualiza um registro em uma tabela com base no ID
    update(table, id, data) {
        // Encontra o índice do registro pelo ID
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
    
        // Cria um novo registro com os dados atualizados
        const updatedRow = {
            ...this.#database[table][rowIndex], // Dados existentes.
            ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)), // Apenas os campos definidos
            updated_at: new Date().toISOString(), // Atualiza a data de modificação
        }
    
        // Substitui o registro no banco de dados
        this.#database[table][rowIndex] = updatedRow
    
        // Salva as alterações no arquivo
        this.#persist()
    } 

    // Remove um registro de uma tabela com base no ID
    delete(table, id) {
        // Encontra o índice do registro pelo ID
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            // Remove o registro da tabela
            this.#database[table].splice(rowIndex, 1)
            // Salva as alterações no arquivo
            this.#persist()
        }
    }
}
