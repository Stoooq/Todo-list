import Project from "./Project.js";

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
const allProjects = document.querySelectorAll(".current-project");
// const todoCheckBox = document.querySelector('.todo-check-box')
// const todoCircleIco = document.querySelectorAll('.todo-check-box .fa-circle')
// const todoCheckCircleIco = document.querySelectorAll('.todo-check-box .fa-circle-check')

const projects = [];

const todo = new Project();

const currentProject = todo;

const handleBurger = () => {
	burgerBtn.classList.toggle("active");
	burgerBarsIco.classList.toggle("hide");
	burgerXIco.classList.toggle("hide");
	burgerUl.classList.toggle("active");
};

const openTodoForm = () => {
	addInput.classList.remove("hide-add");
};

const addNewTodo = () => {
	const newTodo = addText.value;
	todo.addTodo(newTodo);
	showAllTodos();
};

const addTodoToList = (todo) => {
	const divTodo = document.createElement("div");
	const divCheckBox = document.createElement("div");
	const unChecked = document.createElement("i");
	const checked = document.createElement("i");
	const divText = document.createElement("div");
	const divBtns = document.createElement("div");
	const divEdit = document.createElement("div");
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
	divBtns.classList.add("todo-btns");
	divEdit.classList.add("todo-edit");
	divDate.classList.add("todo-date");
	divCancel.classList.add("todo-x");
	x.classList.add("fas");
	x.classList.add("fa-times");

	divText.textContent = todo;
	divEdit.textContent = "EDIT";
	divDate.textContent = "no date";

	divTodo.appendChild(divCheckBox);
	divCheckBox.appendChild(unChecked);
	divCheckBox.appendChild(checked);
	divTodo.appendChild(divText);
	divTodo.appendChild(divBtns);
	divBtns.appendChild(divEdit);
	divBtns.appendChild(divDate);
	divBtns.appendChild(divCancel);
	divCancel.appendChild(x);
	todos.appendChild(divTodo);
};

const showAllTodos = () => {
	resetTodos();
	addInput.classList.add("hide-add");
	todo.todos.forEach((todo) => addTodoToList(todo));
};

const resetTodos = () => {
	addText.value = "";
	todos.textContent = "";
};

const resetTodoInput = () => {
	addText.value = "";
	addInput.classList.add("hide-add");
};

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

	btn.classList.add("current-project");

	btn.textContent = project.name;
	li.setAttribute("data-id", btn.textContent);

	li.appendChild(btn);
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

///////////////////////////////////////////////////

burgerBtn.addEventListener("click", handleBurger);

todoAddBtn.addEventListener("click", openTodoForm);
confirmBtn.addEventListener("click", addNewTodo);
cancelBtn.addEventListener("click", resetTodoInput);

projectBtn.addEventListener("click", openProjectForm);
projectConfirmBtn.addEventListener("click", addNewProject);
projectCancelBtn.addEventListener("click", resetProjectInput);

const projectList = document.getElementById("projects-list");

// console.log(projectList);

projectList.addEventListener("click", (e) => {
	console.log(e.target);
});
