from sendgrid.helpers.mail import Mail, From, To, Subject, Content, PlainTextContent, HtmlContent, Email
from bs4 import BeautifulSoup
from sendgrid import SendGridAPIClient
import os
import urllib


class CustomEmail:
    def __init__(self):
        self._receiver = ''

        self.sendgrid_client = SendGridAPIClient(
            api_key=os.environ.get('SENDGRID_KEY'))

    @property
    def receiver(self):
        return self._receiver

    @receiver.setter
    def receiver(self, value):
        self._receiver = value

    def send_quote(self, data):
        html_text = """
                    <html>
                    <body style='margin-top: 20px;'>
                        <div style="
                        background-color: white;
                        max-width: 60%;
                        margin: 0 auto;
                        ">
                            <h2 style="color: #364DFF;text-align: center;">first, Thank You For Considering Me</h2>
                            <p style="text-align: center;">You're now click away from getting your data</p>


                            <div style="background-color: #FFB34F; padding: 20px;">

                            <h2 style='color: white;
                            text-align: center;'>
                            <span style="text-transform: capitalize;">icon</span> Quote</h2>
                            </div>
                        </div>
                        
                    </body>
                    </html>
                    """

        from_email = From("no_reply@test.com")
        to_email = To(self._receiver)
        subject = Subject('test subject')
        html_content = HtmlContent(html_text)

        soup = BeautifulSoup(html_text, features='html.parser')
        plain_text = soup.get_text()
        plain_text_content = Content("text/plain", plain_text)
        message = Mail(from_email, to_email, subject,
                       plain_text_content, html_content)

        return self.sendgrid_client.send(message=message)
