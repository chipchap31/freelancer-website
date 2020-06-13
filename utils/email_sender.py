from sendgrid.helpers.mail import Mail, From, To, Subject, Content, PlainTextContent, HtmlContent, Email
from bs4 import BeautifulSoup
from sendgrid import SendGridAPIClient
import os
import urllib


class CustomEmail:
    def __init__(self):

        self.sendgrid_client = SendGridAPIClient(
            api_key=os.environ.get('SENDGRID_KEY'))

    @property
    def receiver(self):
        return self._receiver

    @receiver.setter
    def receiver(self, value):
        self._receiver = value

    def send_user_info(self, username, password):
        html_text = f"""
                    <html>
                    <body>
                        <div style="
                        max-width: 60%;
                        margin: 0 auto;
                        ">
                            <p>Hello,</p>

                            <p>Your account has been created and ready to use. In order to obtain access to your account
                                please click <a href="https://jomari-designs-app.herokuapp.com/login">here</a> and enter the details below:
                            </p>
                            <ul>
                                <li>username: {username}</li>
                                <li>password: {password}</li>
                            </ul>
                            
                        </div>
                        
                    </body>
                    </html>
                    """

        from_email = From("no_reply@jomaridesigns.com")
        to_email = To(self._receiver)
        subject = Subject('Welcome To Jomari Designs')
        html_content = HtmlContent(html_text)

        soup = BeautifulSoup(html_text, features='html.parser')
        plain_text = soup.get_text()
        plain_text_content = Content("text/plain", plain_text)
        message = Mail(from_email, to_email, subject,
                       plain_text_content, html_content)
        response = self.sendgrid_client.send(message=message)

        return response
