<?php

$to = "bharathy22.1996@gmail.com";

$subject = $_POST["contact-us-subject"];
$name=strip_tags($_POST["contact-us-name"]);
$email=strip_tags($_POST["contact-us-mail"]); 
$phone=strip_tags($_POST["contact-us-phone"]);
$option=strip_tags($_POST["contact-us-option"]);
$message2=strip_tags($_POST["contact-us-message"]);

$headers .= 'From: '.$email."\r\n".

    'Reply-To: '.$email."\r\n" .

    'X-Mailer: PHP/' . phpversion();
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

$message = '<html><body>';
$message .= '<table rules="all" style="border-color: #666;" cellpadding="10" border="1">';
$message .= "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>" . $name. "</td></tr>";
$message .= "<tr><td><strong>Email:</strong> </td><td>" . $email . "</td></tr>";
$message .= "<tr><td><strong>Phone:</strong> </td><td>" . $phone . "</td></tr>";
$message .= "<tr><td><strong>Option:</strong> </td><td>" . $option . "</td></tr>";
$message .= "<tr><td><strong>Message:</strong> </td><td>" . $message2 . "</td></tr>";

// compose message
$message .= "</table>";
$message .= "</body></html>";



// send email
mail($to, $subject, $message, $headers);

 echo "success";   
 // header("location: index.php?status=1");  



?>
