<?php
require_once('conn.php');
if(strlen($_POST['pseudo']) > 0){
//    echo "oui";
    $pseudo = $_POST['pseudo'];
    $points = $_POST['points'];

    $req = $conn->prepare('INSERT INTO joueurs (pseudo, points) VALUES (:pseudo, :points)');

    $req->bindValue(':pseudo', $pseudo);
    $req->bindValue(':points', $points);
    $req->execute();
}
header('location:../jeu.php');
exit();
