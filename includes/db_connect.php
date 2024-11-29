<?php
//es el link de conexion a la base de datos
$dsn = 'mysql:host=localhost;dbname=todo_list';
$username = 'root';
$password = '';
$options = [];

try {
    //PDO para conectar a la BD
    $pdo = new PDO($dsn, $username, $password, $options);
    //mensaje de error si no se llegara a conectar con la base de datos 
} catch (PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}
?>
