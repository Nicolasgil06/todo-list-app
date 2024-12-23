document.addEventListener('DOMContentLoaded', loadTasks);
let currentFilter = 'all';
//Llamamos la funcion 
function apiRequest(url, method, data) {
    return fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: method !== 'GET' ? JSON.stringify(data) : null
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => { throw new Error(error.error) });
        }
        return response.json();
    })
    .catch(error => console.error('Error:', error));
}

function loadTasks() {
    fetch('http://localhost/todo-list-app/api/tasks.php')
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks);
        });
}
//Muestra las tareas realizadas en la pagina 
function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks
        .filter(task => currentFilter === 'all' || task.status === currentFilter)
        .forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = task.status === 'completed' ? 'completed' : '';
            taskItem.innerHTML = `
                ${task.description} (due: ${task.due_date})
                <button onclick="toggleTask(${task.id}, '${task.status === 'completed' ? 'pending' : 'completed'}')">Mark as ${task.status === 'completed' ? 'Pending' : 'Completed'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
}

function setFilter(filter) {
    currentFilter = filter;
    loadTasks();
}

function addTask() {
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDueDate').value;

    // Validar que la fecha no sea anterior a la actual 
    const today = new Date().toISOString().split('T')[0];
    if (dueDate < today) {
        alert('Elija una fecha para la tarea.');
        return;
    }

    apiRequest('http://localhost/todo-list-app/api/tasks.php', 'POST', { description, due_date: dueDate })
        .then(() => {
            document.getElementById('taskDescription').value = '';
            document.getElementById('taskDueDate').value = '';
            loadTasks();
        });
}
// Actualiza las tareas 
function toggleTask(id, newStatus) {
    apiRequest('http://localhost/todo-list-app/api/tasks.php', 'PUT', { id, status: newStatus })
        .then(loadTasks);
}
//Elimina las tareas
function deleteTask(id) {
    apiRequest('http://localhost/todo-list-app/api/tasks.php', 'DELETE', { id })
        .then(loadTasks);
}
