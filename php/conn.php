<?php
try{
    $conn = new PDO ('mysql:host=localhost;dbname=projet_jeux;charset=UTF8','root','root');

}
catch(PDOException $e) {
    die('ERREUR' . $e->getMessage());
}
