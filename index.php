<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>To-Do List App</title>
</head>
<body>
    <h1>To-Do List</h1>
    <div>
        <input type="text" id="taskDescription" placeholder="Descripción de la tarea">
        <input type="date" id="taskDueDate">
        <button onclick="addTask()">Agregar Tarea</button>
    </div>
    <div>
        <button onclick="setFilter('all')">Todas</button>
        <button onclick="setFilter('pending')">Pendientes</button>
        <button onclick="setFilter('completed')">Completadas</button>
    </div>
    <ul id="taskList"></ul>
    <script src="js/script.js"></script>
</body>
</html>

