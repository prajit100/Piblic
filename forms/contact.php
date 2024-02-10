<?php
  // Import the PHP Email Form library
  require_once __DIR__ . '/../assets/vendor/php-email-form/php-email-form.php';

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'prajitgiri1221@gmail.com';

  // Create a new instance of PHP_Email_Form
  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  // Set the recipient email address
  $contact->to = $receiving_email_address;

  // Set the sender's name, email, and subject from the form data
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Add message content from the form data
  $contact->add_message($_POST['name'], 'From');
  $contact->add_message($_POST['email'], 'Email');
  $contact->add_message($_POST['message'], 'Message', 10);

  // Send the email
  echo $contact->send();
?>
