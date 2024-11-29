<?php
// incluye la BD
require '../includes/db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$requestMethod = $_SERVER['REQUEST_METHOD'];
//Selecciona las tareas para guardar 
switch ($requestMethod) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM tasks');
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tasks);
        break;
// Controla el guardado de las tareas 
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['description'], $data['due_date'])) {
            $stmt = $pdo->prepare('INSERT INTO tasks (description, due_date) VALUES (?, ?)');
            $stmt->execute([$data['description'], $data['due_date']]);
            echo json_encode(['id' => $pdo->lastInsertId()]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
        }
        break;
// Actualiza el estado de las tareas
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'], $data['status'])) {
            $stmt = $pdo->prepare('UPDATE tasks SET status = ? WHERE id = ?');
            $stmt->execute([$data['status'], $data['id']]);
            echo json_encode(['status' => 'success']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
        }
        break;
// Borra las tareas seleccionadas 
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'])) {
            $stmt = $pdo->prepare('DELETE FROM tasks WHERE id = ?');
            $stmt->execute([$data['id']]);
            echo json_encode(['status' => 'success']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
        break;
}
?>


