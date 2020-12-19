// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todos");

// Event listeners
document.addEventListener('DOMContentLoaded', getLSTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', handleListClick);
filterOption.addEventListener('click', filterTodos);

// Functions
function addTodo(event) {
    event.preventDefault();
    createTodoItem(todoInput.value);
    todoInput.value = "";
    saveToLocalStorage();
}

function createTodoItem(itemName) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = itemName;
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

    todoList.appendChild(todoDiv);
}

function handleListClick(event) {
    const item = event.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    if (item.classList[0] === 'complete-btn') {
        item.parentElement.classList.toggle('complete');
    }
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
    console.log(todoList.innerHTML);
    const todos = [...todoList.childNodes].map(t => t.childNodes[0].innerText);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLSTodos() {
    let todosJSON = localStorage.getItem('todos');
    if (todosJSON === null) {
        todosJSON = '[]';
    }
    const todos = JSON.parse(todosJSON);
    todos.forEach(createTodoItem);
}