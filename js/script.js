document.addEventListener('DOMContentLoaded', loadTasks);

function apiRequest(url, method, data) {
    return fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
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
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = task.status === 'completed' ? 'completed' : '';
                taskItem.innerHTML = `
                    ${task.description} (due: ${task.due_date})
                    <button onclick="toggleTask(${task.id}, '${task.status === 'completed' ? 'pending' : 'completed'}')">Mark as ${task.status === 'completed' ? 'Pending' : 'Completed'}</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                `;
                taskList.appendChild(taskItem);
            });
        });
}

function addTask() {
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDueDate').value;

    apiRequest('http://localhost/todo-list-app/api/tasks.php', 'POST', { description, due_date: dueDate })
        .then(() => {
            document.getElementById('taskDescription').value = '';
            document.getElementById('taskDueDate').value = '';
            loadTasks();
        });
}

function toggleTask(id, status) {
    apiRequest('http://localhost/todo-list-app/api/tasks.php', 'PUT', { id, status })
        .then(loadTasks);
}

function deleteTask(id) {
    apiRequest('http://localhost/todo-list-app/api/tasks.php', 'DELETE', { id })
        .then(loadTasks);
}
