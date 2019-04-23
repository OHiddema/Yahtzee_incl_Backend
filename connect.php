<?php

if ($_SERVER["SERVER_NAME"] == "localhost") {
  $host = 'localhost';
  $username = 'root';
  $password = '';
  $dbname = 'yahtzee';
} else {
  $host = 'sql100.byethost.com';
  $username = 'b3_23649021';
  $password = 'RLy991YV';
  $dbname = 'b3_23649021_yahtzee';
}

$con = new mysqli($host, $username, $password, $dbname);
if ($con->connect_errno) {
  die('connection failed: '.$con->connect_error);
}

if ($con->set_charset('utf8') === false) {
  die('failed setting charset');
}

?>