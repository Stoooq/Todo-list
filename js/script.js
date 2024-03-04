import Project from "./Project.js";

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
const projectContainer = document.querySelector(".project-container");
const projectsList = document.querySelector(".projects");
const projectInput = document.querySelector(".project-input");
const projectAddForm = document.querySelector(".add-project");
const projectBtn = document.querySelector(".project-button");
const projectConfirmBtn = document.querySelector(".project-confirm");
const projectCancelBtn = document.querySelector(".project-cancel");

const projects = [];

const todo = new Project();
todo.name = "todo";

let currentProject = todo;

const handleBurger = () => {
	burgerBtn.classList.toggle("active");
	burgerBarsIco.classList.toggle("hide");
	burgerXIco.classList.toggle("hide");
	burgerUl.classList.toggle("active");
};

const openBurger = () => {
    burgerBtn.classList.add("active");
	burgerBarsIco.classList.add("hide");
	burgerXIco.classList.add("hide");
	burgerUl.classList.add("active");
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
	const newTodo = addText.value;
	currentProject.addTodo(newTodo);
	showAllTodos();
};

const addTodoToList = (todoText) => {
	const divTodo = document.createElement("div");
	const divCheckBox = document.createElement("div");
	const unChecked = document.createElement("i");
	const checked = document.createElement("i");
	const divText = document.createElement("div");
    const input = document.createElement("input");
	const divBtns = document.createElement("div");
	// const divEdit = document.createElement("div");
	const divDate = document.createElement("div");
	const divCancel = document.createElement("div");
	const x = document.createElement("i");

	divTodo.classList.add("todo");
	divCheckBox.classList.add("todo-check-box");
	unChecked.classList.add("fa-regular");
	unChecked.classList.add("fa-circle");
	checked.classList.add("fa-solid");
	checked.classList.add("fa-circle-check");
	checked.classList.add("hide");
	divText.classList.add("todo-text");
    input.classList.add("todo-text-input");
    input.classList.add("hide");
	divBtns.classList.add("todo-btns");
	// divEdit.classList.add("todo-edit");
	divDate.classList.add("todo-date");
	divCancel.classList.add("todo-x");
	x.classList.add("fas");
	x.classList.add("fa-times");

    divText.addEventListener("click", editTodo)

    divCheckBox.setAttribute("data-id", todoText)
    x.setAttribute("data-id", todoText)

    x.addEventListener("click", removeTodo)
    divCheckBox.addEventListener("click", switchChecked)

	divText.textContent = todoText;
	// divEdit.textContent = "EDIT";
	divDate.textContent = "no date";

	divTodo.appendChild(divCheckBox);
	divCheckBox.appendChild(unChecked);
	divCheckBox.appendChild(checked);
	divTodo.appendChild(divText);
    divText.appendChild(input);
	divTodo.appendChild(divBtns);
	// divBtns.appendChild(divEdit);
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
}

const switchChecked = (e) => {
    const todoCheck = e.target.parentElement
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
        const text = e.target.parentElement.firstChild
        const input = e.target
        text.textContent = input.value
        input.classList.add("hide")
    }
}

///////////////////////////////////////////////////

const openProjectForm = () => {
	projectAddForm.classList.remove("hide-project");
};

const addNewProject = () => {
	const projectName = projectInput.value;

	projects.push(new Project({ name: projectName }));

	showAllProjects(projects);
};

const addProjectToList = (project) => {
	const li = document.createElement("li");
	const btn = document.createElement("button");
	const i = document.createElement("i");

	btn.classList.add("current-project");
	i.classList.add("fas");
	i.classList.add("fa-times");

	btn.textContent = project.name;
	li.setAttribute("data-id", btn.textContent);
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
    console.log("cos");
	console.log(projects);
    currentProject = todo
    showAllTodos(currentProject)
};

///////////////////////////////////////////////////

const changeProject = (e) => {
	const project = e.target.textContent;
	const thisProject = projects.find((pr) => pr.name === project);

	currentProject = thisProject;

    headerTitle.textContent = `Todo List - ${currentProject.name}`

	resetTodos();
	showAllTodos(currentProject);
};

const defaultTodo = () => {
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
projectConfirmBtn.addEventListener("click", addNewProject);
projectCancelBtn.addEventListener("click", resetProjectInput);

const projectList = document.getElementById("projects-list");
projectList.addEventListener("click", changeProject);

const projectTodo = document.querySelector(".todo-project");
projectTodo.addEventListener("click", defaultTodo);

// const projectDelete = document.querySelector(".projects  li i")
// projectDelete.addEventListener("click", removeProject);

// console.log(currentProject);
