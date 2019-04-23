<?php

require_once "connect.php";

$sql = "SELECT username, password, highscore FROM users WHERE username = ?";
$stmt = $con->prepare($sql);
if ($stmt->bind_param("s", $_POST['q1']) === false) {
  die('binding parameters failed');
}
$stmt->execute() or die($con->error);
$stmt->store_result();


if ($stmt->num_rows() == 0) {                   //usename niet gevonden
  echo "2";
} else {                                        //username gevonden               
  $stmt->bind_result($un, $pw, $hs);
  $stmt->fetch();
  $stmt->close();
  if ($pw == $_POST['q2']) {                     //wachtwoord klopt
    echo "4";
  } else {
    echo "3";               //wachtwoord klopt niet
  }  
}

?> 