export const validateDescription = (description) => {
    if (!description) return { isValid: false, message: "Description cannot be empty" }

    if (description.length >= 1000) return { isValid: false, message: "Description is too long" }

    return { isValid: true }
}

export const validateTitle = (title) => {
    if (!title) return { isValid: false, message: "Title cannot be empty" }

    if (title.length >= 100) return { isValid: false, message: "Title is too long" }

    return { isValid: true }
}
