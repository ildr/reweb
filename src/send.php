<?php

if (isset($_POST['name'])) {$cashname = $_POST['name'];}
if (isset($_POST['email'])) {$cashemail = $_POST['email'];}
if (isset($_POST['subject'])) {$cashphone = $_POST['subject'];}
if (isset($_POST['text'])) {$cashtext = $_POST['text'];}
$to = "info@asiawealth.in";
$subject = "New enquiry !";
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: AsiaWealth <info@asiawealth.in>'."\r\n";
$message ="<p>Name :".$cashname."</p><p>Email :".$cashemail."</p><p>Subject :".$cashphone."</p><p>Message :".$cashtext."</p>";
$verify = mail($to,$subject,$messagevendor,$headers);

?>