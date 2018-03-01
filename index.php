<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="theme-color" content="#000000">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<title>Goo Chat</title>
	<link rel="stylesheet" type="text/css" href="./assets/css/fonts.css">
	<link rel="stylesheet" type="text/css" href="./assets/css/icomoon.css">
	<link rel="stylesheet" type="text/css" href="./assets/css/animate.css">
	<link rel="stylesheet" type="text/css" href="./assets/css/bootstrap.min.css">
	
	<!-- prueba de emojis -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">


	<link href="./assets/css/emoji.css" rel="stylesheet">




	<!-- <link rel="stylesheet" type="text/css" href="./assets/css/scroll.css"> -->
	<!--
	<link rel="stylesheet" href="./dist/css/goochat.c6edbf540fef7a481817.css">
-->
	<style>
		html,body{
			height: 100%;
		}
		.emoji-menu{
			margin-top: -270px;
    		width: 50vh;
		}
	</style>
</head>
<body>
	<div id="app" style="height: 100%;margin: 0 auto;width: 100%;position:absolute;right: 0px;">
	</div>
	<!-- Sounds -->
	<div id="e"></div>

	<!--
	<script type="text/javascript" src="./dist/js/goochat.c6edbf540fef7a481817.js"></script>
-->
	<?php
		session_start();
		if(isset($_SESSION['id']) && isset($_GET['idContact'])){
			//estos son los datos que tienes  que recuperar
			$img_url="https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png";
			$name_bussines="Jose Inc";
			$url_page="jose.com";

			$dato=array(
				"id"=>$_SESSION['id'],
				"idContact"=>array(
					"id"=>$_GET['idContact'],
					"img_url"=>$img_url,
					"name_bussines"=>$name_bussines,
					"url_page"=>$url_page)
			);

			echo "<script type='text/javascript'>recibir(".json_encode($dato).")</script>";
		}else{
			header("location:http://www.google.com");
		}
	?>


	<script src="./assets/js/preloadjs.min.js"></script>
	<script src="./assets/js/load.js"></script>
	<!-- <script src="./assets/js/emojionearea.min.js"></script> -->
	<script type="text/javascript" src="js/goochat.js"></script>


	<!-- librerias de emoji -->
	<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

    <!-- Begin emoji-picker JavaScript -->
    <script src="./assets/js/config.js"></script>
    <script src="./assets/js/util.js"></script>
    <script src="./assets/js/jquery.emojiarea.js"></script>
    <script src="./assets/js/emoji-picker.js"></script>

	<script src="./assets/js/jquery.scrollbar.js"></script>

    <!-- End emoji-picker JavaScript -->
    <script>
      $(function() {
        window.emojiPicker = new EmojiPicker({
          emojiable_selector: '[data-emojiable=true]',
          assetsPath: './assets/img/',
          popupButtonClasses: 'fa fa-smile-o'
        });
        window.emojiPicker.discover();
      });
    </script>
</body>
</html>
