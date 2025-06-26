<?php

require_once('class.phpmailer.php');

$mail = new PHPMailer();

if( isset( $_POST['careers-submit'] ) ) {
    if( $_POST['career-name'] != '' && $_POST['career-email'] != '' && $_POST['birth-date'] != '' && $_POST['experience-years'] != '' && $_POST['career-position'] != '') {
        $message_content = '';
		$detect_errors = $_SERVER['HTTP_REFERER'] ? '<br><br><br><br>This Message Was Sent From: ' . $_SERVER['HTTP_REFERER'] : '';
		
		$receiver_mail = 'idealtheme@gmail.com'; // Add a recipient
        $poss_name = 'IdealTheme'; // Name is optional
		
		$client_subject = isset($client_subject) ? $client_subject : 'Message from ( Careers Form )'; // change it to any name
		
        $client_name = isset( $_POST['career-name'] ) ? $_POST['career-name'] : '';
        $client_email = isset( $_POST['career-email'] ) ? $_POST['career-email'] : '';
        $client_address = isset( $_POST['career-address'] ) ? $_POST['career-address'] : '';
		$client_birth_date = isset( $_POST['birth-date'] ) ? $_POST['birth-date'] : '';
		$client_experience_years = isset( $_POST['experience-years'] ) ? $_POST['experience-years'] : '';
        $client_careers_position = isset( $_POST['career-position'] ) ? $_POST['career-position'] : '';
        $client_message = isset( $_POST['career-message'] ) ? $_POST['career-message'] : '';

		$mail->SetFrom( $client_email , $client_name );
		$mail->AddReplyTo( $client_email , $client_name );
		$mail->AddAddress( $receiver_mail , $poss_name );
		$mail->Subject = "Employment application for: ".$client_careers_position;
        
		$client_name = isset( $client_name ) ? "Name: ".$client_name : '';
        $client_email = isset( $client_email ) ? "<br><br>Email: ".$client_email : '';
        $client_address = isset( $client_address ) ? "<br><br>Address: ".$client_address : '';
		$client_birth_date = isset( $client_birth_date ) ? "<br><br>Date of birth: ".$client_birth_date : '';
		$client_experience_years = isset( $client_experience_years ) ? "<br><br>Years of experience: ".$client_experience_years : '';
        $client_careers_position = isset( $client_careers_position ) ? "<br><br>Job title: ".$client_careers_position : '';
        $client_message = isset( $client_message ) ? "<br><br>Message: ".$client_message : '';
		
		$message_content .= $client_name.$client_email.$client_address.$client_birth_date.$client_experience_years.$client_careers_position.$client_message.$detect_errors;
		
		$maxsize = 2 * 1024 * 1024; // 2 MB
		$types = array('application/msword', 'application/pdf'); 
		
		$file_format = $_FILES["cv-attachment"]["name"];
		$file_extension = strrchr($file_format, ".");
		$not_send_reasons = '';
		
		if ( isset( $_FILES['cv-attachment'] ) && $_FILES['cv-attachment']['error'] == UPLOAD_ERR_OK && filesize( $_FILES['cv-attachment']['tmp_name'] ) < $maxsize && ( in_array( $_FILES['cv-attachment']['type'] ,$types ) || $file_extension=".txt" || $file_extension=".doc" || $file_extension=".docx" ) ) {
			$mail->IsHTML(true);
            $mail->AddAttachment( $_FILES['cv-attachment']['tmp_name'], $_FILES['cv-attachment']['name'] );
			$mail->MsgHTML( $message_content );
		    $succesfully_send = $mail->Send();
		   
        }else if( !in_array( $_FILES['cv-attachment']['type'] ,$types ) ){
			$not_send_reasons .= 'Invalid file format ( pdf - doc - docx - txt )';
			$mail->MsgHTML( $message_content );
		    $succesfully_send = false;
		}else if( filesize( $_FILES['cv-attachment']['tmp_name'] ) > $maxsize ){
			$not_send_reasons .= 'Exceeded filesize limit is ( 2 MB )';
			$mail->MsgHTML( $message_content );
		    $succesfully_send = false;
		}else{
			$mail->MsgHTML( $message_content );
		    $succesfully_send = $mail->Send();
		}
		
			
		if( $succesfully_send == true ){
			echo 'Your application has been <strong>successfully</strong> sent, We will send you a reply as soon as possible.';
		}else{
			echo 'Email <strong>could not</strong> be sent due to some Unexpected Error. Please Try Again.<br /><br /><strong>Reason:</strong><br />' . $not_send_reasons . '';
		}

    } 
} else {
    echo 'An <strong>unexpected error</strong> occured. Please Try Again later.';
}

?>