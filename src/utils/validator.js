export const validateDescription = (description) => {
    // Verifica se a descrição está vazia (null, undefined ou string vazia)
    // Retorna um objeto indicando que a validação falhou, com uma mensagem apropriada
    if (!description) return { isValid: false, message: "Description cannot be empty" }

    // Verifica se a descrição excede o limite de 1000 caracteres
    // Retorna um objeto indicando que a validação falhou, com uma mensagem apropriada
    if (description.length >= 1000) return { isValid: false, message: "Description is too long" }

    // Se nenhuma das condições acima for atendida, a validação é bem-sucedida
    return { isValid: true }
}

export const validateTitle = (title) => {
    // Verifica se o título está vazio (null, undefined ou string vazia)
    // Retorna um objeto indicando que a validação falhou, com uma mensagem apropriada
    if (!title) return { isValid: false, message: "Title cannot be empty" }

    // Verifica se o título excede o limite de 100 caracteres
    // Retorna um objeto indicando que a validação falhou, com uma mensagem apropriada
    if (title.length >= 100) return { isValid: false, message: "Title is too long" }

    // Se nenhuma das condições acima for atendida, a validação é bem-sucedida
    return { isValid: true }
}
