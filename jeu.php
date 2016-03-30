<?php
require_once('php/conn.php');
$requete = $conn->query('SELECT `pseudo`, `points` FROM `joueurs` ORDER BY points DESC LIMIT 1');
$resultat = $requete->fetch();
$high_score = $resultat['points'];
?>

<!DOCTYPE html>
<html lang="fr"> 
<head>
	<meta charset="UTF-8">
	<title>Firefly</title>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/style.css">
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script src="js/phaser.min.js"></script>
	<script src="js/world_1.js"></script>
	<script src="js/world_2.js"></script>
	<script src="js/world_3.js"></script>
	<script src="js/main.js"></script>


</head>
<body id="body_jeu">
	<section id="header_jeu">
		<span class="arrows-9"></span>
		<a href="index.html">Retour</a>
	</section>
	<section id="jeu">
		<div class="globales first_part" id="start_game">
			<h1>Firefly</h1>
			<button class="lunchGame">Commencer la partie</button>
			<p>Meilleur score : <?=$high_score;?> lucioles</p>
		</div>

		<!--DEBUT PARTIE CACHE-->
		<div class="globales" id="map">
			<!--<button>Quitter la partie</button>-->
			<div id="circles_center">
				<a href="#"><div class="circles" id="circle_un"></div></a>
				<a href="#"><div class="circles none" id="circle_deux"></div></a>
				<a href="#"><div class="circles none" id="circle_trois"></div></a>
				<div class="planetes">
					<ul>
						<li id="one"><span class="number_planete">1</span><a class="name_planete" href="#">Spectrum</a></li>
						<li id="two"><span class="number_planete">2</span><a class="name_planete" href="#">Nebula</a></li>
						<li id="three"><span class="number_planete">3</span><a class="name_planete" href="#">Halcyon</a></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="globales" id="popup">
			<h1>Firefly</h1>
			<h2 id="game_over"> GAME OVER...</h2>
			<button class="retryWorld">Recommencer la partie</button>
			<button class="changeWorld">Changer de monde</button>
		</div>

		<div class="globales" id="score_final">
			<h1>Firefly</h1>
			<p>Monde 1 : <span class="final_1"></span></p>
			<p>Monde 2 : <span class="final_2"></span></p>
			<p>Monde 3 : <span class="final_3"></span></p>
			<p id="score_total"></p>
			<button id="nextGame">Suivant</button>
		</div>

		<div class="globales" id="score_global">
			<h1>Firefly</h1>
			<p id="score_global_p"></p>
			<form action="php/save_post.php" method="POST">
				<input type="text" name="pseudo" id="pseudo" placeholder="Entre ton pseudonyme">
				<input type="hidden" id="points" name="points">
				<input type="submit" id="enregistrement" value="Enregistrer">
			</form>
			<!--<button>Suivant</button>-->
		</div>


		<!--FIN PARTIE CACHE-->
		<div class="globales" id="zone_timer">
			<div class="timer"></div>
		</div>

		<!--AFFICHAGE DE LA BASE DE DONNEES-->
		<div class="globales" id="bdd">

			<?php
			$reponse = $conn->query('SELECT `pseudo`, `points` FROM `joueurs` ORDER BY points DESC LIMIT 0,5 ');
			while($row = $reponse->fetchObject()){
				echo "<p><b>$row->pseudo</b> : <b>$row->points</b> points</p><br>";
			}
			?>
		</div>

		<div id="canvas"></div>
	</section>

</body>
</html>