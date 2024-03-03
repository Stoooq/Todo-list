class Project {
    constructor({ name } = {}) {
        this.todos = []
        this.name = name
    }

    addTodo(newTodo) {
        const duplicated = this.todos.find((todo) => todo === newTodo)
        if (duplicated) {
            window.alert("Taka ksiazka juz istnieje")
            return
        }
        this.todos.push(newTodo)
    }

    removeTodo(todoName) {
        this.todos = this.todos.filter((todo) => todo !== todoName)
    }
}

export default Project