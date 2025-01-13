# Desafio 01 - Fundamentos do Node.js  

Este projeto é uma API para gerenciamento de **tasks** (tarefas) com suporte a operações CRUD (Criar, Ler, Atualizar, Deletar). A API utiliza os métodos HTTP: **GET**, **POST**, **PUT**, **PATCH** e **DELETE**, com validações de dados nas rotas **POST** e **PUT**.  

### Desafio Extra  
A aplicação inclui uma funcionalidade adicional para criação de tasks a partir de um arquivo CSV, utilizando o conceito de **streams** para processar os dados de forma eficiente.  

## Funcionalidades  

- **GET**: Recuperar uma ou mais tasks podendo usar filtros.  
- **POST**: Criar uma nova task com validação de dados.  
- **PUT**: Atualizar uma task existente, substituindo todos os seus dados (com validação).  
- **PATCH**: Atualizar parcialmente uma task.  
- **DELETE**: Remover uma task existente.  
- **Importação CSV**: Criar tasks em massa a partir de um arquivo CSV usando streams.  

A aplicação está documentada para facilitar a compreensão e o uso.  

---

## Como executar o projeto  

### Pré-requisitos  
Certifique-se de ter instalado em sua máquina:  
- **Node.js** (versão 20 ou superior)  
- **npm** (gerenciador de pacotes do Node.js)  

### Passos para execução  

1. **Instalar as dependências**  
   Execute o comando abaixo para instalar todas as dependências necessárias:  
   ```bash
   npm install
2. **Executar criação via CSV**
   Execute o comando abaixo para executar o método para realizar a ação:
   ```bash
   node stream/create-tasks-using-csv-with-stream.js
