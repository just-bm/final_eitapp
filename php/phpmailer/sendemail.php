<?php

require_once('class.phpmailer.php');
require_once('class.smtp.php');

$mail = new PHPMailer();

if( isset( $_POST['contact-us-mail'] ) ) {
    if( $_POST['contact-us-name'] != '' && $_POST['contact-us-mail'] != '' && $_POST['contact-us-message'] != '' ) {
	$mail->IsSMTP();
	$mail->SMTPAuth = true;
	$mail->Host = "smtp.gmail.com";
	$mail->Port = 465;
	$mail->Username = "contactus@eitworks.com";
	$mail->Password = "eit54321";
        $message_content = '';
		$detect_errors = $_SERVER['HTTP_REFERER'] ? '<br><br><br><br>This Mail Submitted From: ' . $_SERVER['HTTP_REFERER'] : '';
		
		$receiver_mail = 'bharathy@eitworks.com'; // Add a recipient
        $poss_name = 'IdealTheme'; // Name is optional
		
		$client_subject = isset($client_subject) ? $client_subject : 'Message from ( Form 1 )'; // change it to any name
		
        $client_name = isset( $_POST['contact-us-name'] ) ? $_POST['contact-us-name'] : '';
        $client_email = isset( $_POST['contact-us-mail'] ) ? $_POST['contact-us-mail'] : '';
        $client_phone = isset( $_POST['contact-us-phone'] ) ? $_POST['contact-us-phone'] : '';
        $client_service = isset( $_POST['contact-us-option'] ) ? $_POST['contact-us-option'] : '';
        $client_subject = isset( $_POST['contact-us-subject'] ) ? $_POST['contact-us-subject'] : '';
        $client_message = isset( $_POST['contact-us-message'] ) ? $_POST['contact-us-message'] : '';

		$mail->SetFrom('arun@eitworks.com', 'Web App');
		$mail->Subject = $client_subject;

		$client_name = isset($client_name) ? "Name: ".$client_name : '';
		$client_email = isset($client_email) ? "<br><br>Email: ".$client_email : '';
		$client_phone = isset($client_phone) ? "<br><br>Phone: ".$client_phone : '';
		$client_service = isset($client_service) ? "<br><br>Service: ".$client_service : '';
		$client_message = isset($client_message) ? "<br><br>Message: ".$client_message : '';
        
		$message_content .= $client_name.$client_email.$client_phone.$client_service.$client_message;
        $message_content .= $detect_errors;
		
		$mail->MsgHTML( $message_content );
		$succesfully_send = $mail->Send();

		if( $succesfully_send == true ){
			echo 'Your message has been <strong>successfully</strong> sent, We will send you a reply as soon as possible.';
		}else{
			echo 'Email <strong>could not</strong> be sent due to some Unexpected Error. Please Try Again later.<br /><br /><strong>Reason:</strong><br />' . $mail->ErrorInfo . '';
		}

    } 
} else {
    echo 'An <strong>unexpected error</strong> occured. Please Try Again later.';
}

?>