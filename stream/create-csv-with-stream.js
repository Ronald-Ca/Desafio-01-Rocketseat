import fs from 'fs'
import { parse } from 'csv-parse'
import fetch from 'node-fetch'

const csvFilePath = './tasks.csv'

async function importCsv() {
    const parser = fs
        .createReadStream(csvFilePath)
        .pipe(parse({ delimiter: ',', from_line: 2 })) 

    for await (const [title, description] of parser) {
        const response = await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        })

        if (response.ok) {
            console.log(`Tarefa criada: ${title}`)
        } else {
            console.error(`Erro ao criar tarefa: ${title}`)
        }
    }
}

importCsv().catch(console.error)
