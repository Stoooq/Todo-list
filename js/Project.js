class Project {
    constructor({ name } = {}) {
        this.todos = []
        this.name = name
    }

    checkTodoName(todoText) {
        const duplicated = this.todos.find((todo) => todo.name === todoText)
        if (duplicated) {
            window.alert("Takie todo już istnieje")
            return false
        }
        if (todoText === '') {
            window.alert("Dodaj tekst do todo")
            return false
        }
        return true
    }

    changeTodoCheck(todoText) {
        const duplicated = this.todos.find((todo) => todo.name === todoText)
        if (duplicated.checked === false) {
            duplicated.checked = true
        } else if (duplicated.checked === true) {
            duplicated.checked = false
        }
    }

    addTodo(newTodo) {
        if (this.checkTodoName(newTodo.name)) {
            this.todos.push(newTodo)
        }
    }

    removeTodo(todoName) {
        this.todos = this.todos.filter((todo) => todo.name !== todoName)
    }
}

export default Project