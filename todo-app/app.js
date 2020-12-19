// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todos");

// Event listeners
document.addEventListener('DOMContentLoaded', getStoredTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', handleListClick);
filterOption.addEventListener('click', filterTodos);

// State
let items = [];

// Functions
function getStoredTodos() {
    let todosJson = localStorage.getItem('todos');
    if (todosJson === null) {
        todosJson = '[]';
    }
    const loaded = JSON.parse(todosJson);
    loaded.forEach(i => createTodoItem(i.name, i.complete));
}

function addTodo(event) {
    event.preventDefault();
    createTodoItem(todoInput.value);
    saveToLocalStorage();
}

function createTodoItem(name, complete=false) {
    if (items.findIndex(i => i.name === name) !== -1) return;

    items.push({name, complete});

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = name;
    newTodo.classList.add("list-item");
    todoDiv.appendChild(newTodo);
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"/>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"/>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoInput.value = "";

    if (complete) {
        toggleComplete(todoDiv);
    }

    todoList.appendChild(todoDiv);
}

function handleListClick(event) {
    const clicked = event.target;
    if (clicked.classList[0] === 'trash-btn') {
        deleteItem(clicked.parentElement);
    }
    if (clicked.classList[0] === 'complete-btn') {
        toggleComplete(clicked.parentElement);
    }
}

function deleteItem(item) {
    const name = item.childNodes[0].innerText;
    const idx = items.findIndex(i => i.name === name);
    items.splice(idx, 1);
    saveToLocalStorage();

    item.classList.add('fall');
    item.addEventListener('transitionend', function () {
        item.remove();
    });
}

function toggleComplete(item) {
    item.classList.toggle('complete');
    const name = item.childNodes[0].innerText;
    const idx = items.findIndex(i => i.name === name);
    items[idx].complete = item.classList.contains('complete');
    saveToLocalStorage();
}

function filterTodos(event) {
    const todos = todoList.childNodes;
    const option = event.target.value;
    if (option === 'all') {
        todos.forEach(todo => {
            todo.style.display = 'flex';
        });
    }
    else {
        if (option === 'completed') {
            todos.forEach(todo => {
                todo.style.display = todo.classList.contains('complete') ? 'flex' : 'none';
            });
        }
        else {
            todos.forEach(todo => {
                todo.style.display = todo.classList.contains('complete') ? 'none' : 'flex';
            });
        }
        
    }
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(items));
}
