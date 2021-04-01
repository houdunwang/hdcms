<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers:x-xsrf-token,content-type");
header("Access-Control-Allow-Credentials: true");
$dirs = ['./', '../data', '../storage', './modules'];
$exts = ['gd', 'bcmath', 'Ctype', 'Fileinfo', 'JSON', 'Mbstring', 'OpenSSL', 'PDO', 'Tokenizer', 'XML'];
switch ($_GET['action']) {
    case 'env':
        $response = ["dir" => [], "exts" => []];
        foreach ($dirs as $d) {
            $response['dirs'][] = ['name' => $d, 'state' => is_writable($d)];
        }
        foreach ($exts as $ext) {
            $response['exts'][] = ['name' => $ext, 'state' => extension_loaded($ext)];
        }
        die(json_encode($response, JSON_UNESCAPED_UNICODE));
        break;
    case 'connection':
        $config = json_decode(file_get_contents('php://input'), true);
        try {
            $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8', $config['host'], $config['database'], 'utf8');
            $pdo = new PDO($dsn, $config['user'], $config['password']);
            file_put_contents('../data/database.php', "<?php return " . var_export($config, true) . ';');
            die('success');
        } catch (PDOException $e) {
            die('fail');
        }
}
