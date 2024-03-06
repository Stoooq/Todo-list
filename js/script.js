import Project from "./Project.js";
import Todo from "./Todo.js";

const LOCAL_STORAGE_KEY = 'projects'
const GLOBAL_PROJECT = 'todo'

const headerTitle = document.querySelector(".header-title")
const burgerBtn = document.querySelector(".burger");
const burgerBarsIco = document.querySelector(".burger .fa-bars");
const burgerXIco = document.querySelector(".burger .fa-times");
const burgerUl = document.querySelector(".burger-container ul");
const todoAddBtn = document.querySelector(".todo-add");
const addInput = document.querySelector(".add-input");
const confirmBtn = document.querySelector(".add-confirm");
const cancelBtn = document.querySelector(".add-cancel");
const todos = document.querySelector(".todos");
const addText = document.querySelector(".add-text");
const projectsList = document.querySelector(".projects");
const projectInput = document.querySelector(".project-input");
const projectAddForm = document.querySelector(".add-project");
const projectBtn = document.querySelector(".project-button");
const projectConfirmBtn = document.querySelector(".project-confirm");
const projectCancelBtn = document.querySelector(".project-cancel");

let projects = [];

const todo = new Project();
todo.name = GLOBAL_PROJECT

let currentProject = todo;

const saveToLocalStorage = () => {
    const data = [todo, ...projects].map(({ name, todos }) => {
        return {
            name,
            todos: todos.map(({ name, checked }) => ({ name, checked }))
        }
    })
    const dataJson = JSON.stringify(data)
    localStorage.setItem(LOCAL_STORAGE_KEY, dataJson)
}

const loadLocalStorage = () => {
    const dataJson = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (dataJson) {
        const data = JSON.parse(dataJson)
        data.forEach((projectData) => {
            const project = projectData.name === GLOBAL_PROJECT
                ? todo : addNewProject(projectData.name)
            projectData.todos.forEach(({ name, checked }) => {
                const newTodo = new Todo(name, checked)
                project.addTodo(newTodo)
            })
        })
    }

    showAllTodos()
}

const handleBurger = () => {
	burgerBtn.classList.toggle("active");
	burgerBarsIco.classList.toggle("hide");
	burgerXIco.classList.toggle("hide");
	burgerUl.classList.toggle("active");
};

const closeBurger = () => {
    burgerBtn.classList.remove("active");
	burgerBarsIco.classList.remove("hide");
	burgerXIco.classList.add("hide");
	burgerUl.classList.remove("active");
};

const openTodoForm = () => {
    closeBurger()
	addInput.classList.remove("hide-add");
};

const addNewTodo = () => {
    closeBurger()
	const newTodo = todoValues()
	currentProject.addTodo(newTodo);
	showAllTodos();
    saveToLocalStorage()
};

const todoValues = () => {
    const todoText = addText.value

    return new Todo(todoText)
}

const addTodoToList = (newTodo) => {
	const divTodo = document.createElement("div");
	const divCheckBox = document.createElement("div");
	const unChecked = document.createElement("i");
	const checked = document.createElement("i");
	const divText = document.createElement("div");
    const input = document.createElement("input");
	const divBtns = document.createElement("div");
	const divDate = document.createElement("div");
	const divCancel = document.createElement("div");
	const x = document.createElement("i");

	divTodo.classList.add("todo");
	divCheckBox.classList.add("todo-check-box");


	unChecked.classList.add("fa-regular");
	unChecked.classList.add("fa-circle");
	checked.classList.add("fa-solid");
	checked.classList.add("fa-circle-check");
    if (newTodo.checked === false) {
        checked.classList.add("hide");
    } else if (newTodo.checked === true) {
        unChecked.classList.add("hide")
    }
    
	divText.classList.add("todo-text");
    input.classList.add("todo-text-input");
    input.classList.add("hide");
	divBtns.classList.add("todo-btns");
	divDate.classList.add("todo-date");
	divCancel.classList.add("todo-x");
	x.classList.add("fas");
	x.classList.add("fa-times");

    divText.addEventListener("click", editTodo)

    divCheckBox.setAttribute("data-id", newTodo.name)
    x.setAttribute("data-id", newTodo.name)

    x.addEventListener("click", removeTodo)
    divCheckBox.addEventListener("click", switchChecked)

	divText.textContent = newTodo.name;
    input.value = newTodo.name;
	divDate.textContent = "no date";

	divTodo.appendChild(divCheckBox);
	divCheckBox.appendChild(unChecked);
	divCheckBox.appendChild(checked);
	divTodo.appendChild(divText);
    divText.appendChild(input);
	divTodo.appendChild(divBtns);
	divBtns.appendChild(divDate);
	divBtns.appendChild(divCancel);
	divCancel.appendChild(x);
	todos.appendChild(divTodo);
};

const showAllTodos = () => {
	resetTodos();
	addInput.classList.add("hide-add");
	currentProject.todos.forEach((todo) => addTodoToList(todo));
};

const resetTodos = () => {
	addText.value = "";
	todos.textContent = "";
};

const resetTodoInput = () => {
	addText.value = "";
	addInput.classList.add("hide-add");
};

const removeTodo = (e) => {
    const todoName = e.target.getAttribute("data-id")
    currentProject.removeTodo(todoName)
    showAllTodos()
    saveToLocalStorage()
}

const switchChecked = (e) => {
    const todoCheck = e.target.parentElement
    currentProject.changeTodoCheck(todoCheck.getAttribute("data-id"))
    todoCheck.firstChild.classList.toggle("hide")
    todoCheck.lastChild.classList.toggle("hide")
}

const editTodo = (e) => {
    const input = e.target.lastChild
    input.classList.remove("hide")
    input.select()
    input.addEventListener("keyup", confirmEdit)
}

const confirmEdit = (e) => {
    if (e.key === "Enter") {
        console.log("cos");
        const text = e.target.parentElement.firstChild
        const input = e.target
        console.log(text.textContent, input.value);
        const editedTodo = currentProject.todos.find((todo) => todo.name === text.textContent)
        editedTodo.name = input.value
        if (currentProject.checkTodoName(text.textContent)) {
            input.classList.add("hide")
        }
        showAllTodos()
        saveToLocalStorage()
    }
}

///////////////////////////////////////////////////

const openProjectForm = () => {
	projectAddForm.classList.remove("hide-project");
};

const handleProjectInput = () => {
    const name = projectInput.value

    addNewProject(name)
}

const addNewProject = (name) => {
    const project = new Project({ name })
	projects.push(project);

	showAllProjects(projects);

    saveToLocalStorage()
    return project
};

const addProjectToList = (project) => {
	const li = document.createElement("li");
	const btn = document.createElement("button");
	const i = document.createElement("i");

	btn.classList.add("current-project");
	i.classList.add("fas");
	i.classList.add("fa-times");

	btn.textContent = project.name;
	btn.setAttribute("data-id", project.name);
    i.addEventListener("click", removeProject)

	li.appendChild(btn);
	li.appendChild(i);
	projectsList.appendChild(li);
};

const showAllProjects = () => {
	resetProjects();
	projectAddForm.classList.add("hide-project");
	projects.forEach((project) => addProjectToList(project));
};

const resetProjects = () => {
	projectInput.value = "";
	projectsList.textContent = "";
};

const resetProjectInput = () => {
	projectInput.value = "";
	projectAddForm.classList.add("hide-project");
};

const removeProject = (e) => {
    const projectName = e.target.parentElement.firstChild.textContent
    console.log(projectName);
    projects = projects.filter((pr) => pr.name !== projectName)
    defaultTodo()
    showAllProjects(projects)
    saveToLocalStorage()
};

///////////////////////////////////////////////////

const selectProject = (e) => {
	const project = e.target;
    console.log();
    if (project.getAttribute("data-id") === project.textContent) {
        changeProject(project)
    }
};

const changeProject = (project) => {
    closeBurger()

    const thisProject = projects.find((pr) => pr.name === project.textContent);
    currentProject = thisProject;
    headerTitle.textContent = `Todo List - ${currentProject.name}`

    resetTodos();
	showAllTodos(currentProject);
}

const defaultTodo = () => {
    closeBurger()

	currentProject = todo;
    headerTitle.textContent = "Todo List"

	resetTodos();
	showAllTodos(currentProject);
};

burgerBtn.addEventListener("click", handleBurger);

todoAddBtn.addEventListener("click", openTodoForm);
confirmBtn.addEventListener("click", addNewTodo);
cancelBtn.addEventListener("click", resetTodoInput);

projectBtn.addEventListener("click", openProjectForm);
projectConfirmBtn.addEventListener("click", handleProjectInput);
projectCancelBtn.addEventListener("click", resetProjectInput);

const projectList = document.getElementById("projects-list");
projectList.addEventListener("click", selectProject);

const projectTodo = document.querySelector(".todo-project");
projectTodo.addEventListener("click", defaultTodo);

loadLocalStorage()