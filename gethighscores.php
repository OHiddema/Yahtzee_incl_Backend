<?php

require_once "connect.php";

$sql = "SELECT username, highscore FROM users ORDER BY highscore DESC LIMIT 10";
if ($con->real_query($sql)) {
  $res = $con->store_result();

  echo "<tr><th>Naam</th><th>Score</th></tr>";
  while ($row = $res->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row['username'] . "</td>";
    echo "<td>" . $row['highscore'] . "</td>";
    echo "</tr>";
  }

  // resultaat vrijgeven
  $res->free();
} else {
  die('query failed: '.$con->error);
}

?> 