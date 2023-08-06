import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

def send_email(sender_email, receiver_email, subject, message, attachment_path, smtp_server, smtp_port, username, password,logFilePath):
    # Create a multipart message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject

    # Add message body
    msg.attach(MIMEText(message, 'plain'))

    # Add attachment
    with open(attachment_path, 'rb') as attachment:
        attachment_path = 'certificate.pdf'
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename="{attachment_path}"')
        msg.attach(part)

    server = smtplib.SMTP(smtp_server, smtp_port)

    try:
        # Create a secure SSL/TLS connection to the SMTP server
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()

        # Login to the email account
        server.login(username, password)

        # Send the email
        server.sendmail(sender_email, receiver_email, msg.as_string())
        print("Email sent successfully!")
        with open(logFilePath, 'a') as log_file:
            log_file.write('Email sent successfully! :'+receiver_email+'\n')

    except Exception as e:
        print("An error occurred while sending the email:", str(e))
        with open(logFilePath, 'a') as log_file:
            log_file.write('Email sending failed:'+receiver_email+'\n')

    finally:
        # Close the connection
        server.quit()

# Provide your email details
receiver_email = "nikhilranjan7352@gmail.com"
sender_email = "adityafake8340@gmail.com"
subject = "Hello from Python!"
message = "This is the body of the email."
attachment_path = 'myfile.docx'

# Provide SMTP server details
smtp_server = "smtp.gmail.com"
smtp_port = 587
username = "adityafake8340@gmail.com"


# Call the send_email function
# send_email(sender_email, receiver_email, subject, message, attachment_path, smtp_server, smtp_port, username, password)
