import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'
import { validateDescription, validateTitle } from './utils/validator.js'

// Instância do banco de dados
const database = new Database()

export const routes = [
    {
        // Rota para buscar tarefas com suporte a filtro por título ou descrição
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: async (req, res) => {

            const { search } = req.query

            const searchQuery = search
            ? { title: search, description: search }
            : undefined

            // Busca as tarefas no banco
            const tasks = database.select('tasks',  searchQuery)
            
            return res.setHeader('Content-type', 'application/json').end(JSON.stringify(tasks))
        }
    },
    {
        // Rota para criar uma nova tarefa.
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: async (req, res) => {
            const { title, description } = req.body
    
            // Valida título e descrição
            const titleValidation = validateTitle(title)
            if (!titleValidation.isValid) return res.writeHead(400).end(titleValidation.message)
    
            const descriptionValidation = validateDescription(description)
            if (!descriptionValidation.isValid) return res.writeHead(400).end(descriptionValidation.message)
    
            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }
    
            // Insere a tarefa no banco
            database.insert('tasks', task)
    
            return res.writeHead(201).end()
        },
    },
    {
        // Rota para atualizar título e descrição de uma tarefa
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: async (req, res) => {
            const { id } = req.params
    
            const task = database.select('tasks').find(task => task.id === id)
            if (!task) return res.writeHead(404).end('Task not found')
    
            const { title, description } = req.body

             // Valida título e descrição
            const titleValidation = validateTitle(title)
            const descriptionValidation = validateDescription(description)

            // Se ambos estão presentes, mas são inválidos
            if (!titleValidation.isValid && !descriptionValidation.isValid) {
                return res
                    .writeHead(400)
                    .end(`Validation errors: ${titleValidation.message || ''} ${descriptionValidation.message || ''}`)
            }

            // Se apenas um está presente, mas inválido
            if (title && !titleValidation.isValid) {
                return res.writeHead(400).end(`Validation error: ${titleValidation.message}`)
            }
            if (description && !descriptionValidation.isValid) {
                return res.writeHead(400).end(`Validation error: ${descriptionValidation.message}`)
            }
    
            // Atualiza a tarefa no banco
            database.update('tasks', id, { title, description })
    
            return res.writeHead(204).end()
        }
    },
    {
        // Rota para excluir uma tarefa
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: async (req, res) => {
            const { id } = req.params

            const task = database.select('tasks').find(task => task.id === id)
            if (!task) return res.writeHead(404).end('Task not found')

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        // Rota para marcar uma tarefa como concluída ou pendente
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: async (req, res) => {
            const { id } = req.params
    
            const task = database.select('tasks').find(task => task.id === id)
            if (!task) return res.writeHead(404).end('Task not found')
            
            // Atualiza a tarefa no banco
            const isTaskCompleted = !!task.completed_at
            database.update('tasks', id, {
                completed_at: isTaskCompleted ? null : new Date().toISOString(),
            })
    
            return res.writeHead(204).end()
        }
    }  
]