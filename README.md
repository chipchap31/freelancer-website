# Jomari Designs - Code Institure 4th Milestone [![Build Status](https://travis-ci.org/chipchap31/freelancer-website.svg?branch=develop)](https://travis-ci.org/chipchap31/freelancer-website)

An E-commerece web application where business owner's can buy the affordable graphic designs.
Most of the times when you look for graphic designs such as logos, it can be a frustrating task. 
Especially, when you are having second thought on the final result.

With this web application users give as much information they want to fulfill their design needs and they can also request for 
unlimited changes on the concepts.

## UX Design

The UX process starts with learning the basic goals of both users and the site owner.
This can be done by listing user stories. Here are some of the most simple:

- As a visitor, I want to be able to see all of the previous graphic design projects. In order for me determine their quality.

- As a client, I want to be able to get a quote as well, so that I can buy another design.

- As an admin, I want to able to upload an image to provide a concept to the clients.


You can read more information about the stories by clicking [here](https://github.com/chipchap31/freelancer-website/blob/master/essentials/User%20Stories%20-%20Jomari%20Designs.pdf).


### Wireframing 

Wireframing is one of the important process of the design, as it helps the client, designers and developers be on the same page regarding the web application's structure.

I created the wireframe using [Balsamiq](https://balsamiq.com/). Please click [here](https://github.com/chipchap31/freelancer-website/blob/master/essentials/jomari-designs-wireframe.pdf) if you want to see them.

## Features
### Existing Features

- **Landing Page** - Contains a call out button at very top of the page (Nav bar) and also the header, as it is essential that visitors knows where to go next after loading the first page.

- **Quote Form** - Users has the ability to fill out the form which ask them for the project information and the deadline date. 

- **Login Form** - There are three forms altogether in this project. The first one is just a standard form that renders when the user clicks the client login button. The second form renders when the user wants to pay for a qoute but they already have an account already. The last one renders when the users access the payment page by typing the payment path in the browsers url.

- **Account Details Email** - New users reveives an email in order to obtain access to the platform.

- **Reset Password On First Login** - New users are required to reset their password to their own.

- **Log out** - User has the ability to log out of their account. Their token is detroyed and to obtain a new one, they must login again.

- **Dashboard** - Provides users with an overview of their own projects via calendar. 

- **Quote Payment** - Prompts users for their credit card information.

- **Mobile Friendly** - All of the views adjusts and does not look distorted when switch between mobile views.
## Features left to implement

- **Password Recovery** - Using [Sendgrid](https://sendgrid.com/), I want to give the user the ability to recover their password, just in case they forgot their password. 
- **Request Changes Modification** - In the near future, I want to be able to give users the ability to edit their changes instead of just deleting.
- **User Rating** - In the future, I want the users to be able to add comments or rate on other projects.
- **Price Calculators** - In the future, I want to include color, width, and height as a factor that changes the price of the quote.

- **Email Signup** - In the future, I also want to include a functionality when the site owner does not want to take anymore client, users will have to leave email and wait for notification when the ownere is ready again.

## Database Architecture

![Database](https://github.com/chipchap31/freelancer-website/blob/master/essentials/database-architecture.jpg?raw=true "Database")
## Technologies Used

### Languages 

- [Python3](https://www.python.org/)  
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CSS(LESS)](http://lesscss.org/) 
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)

### Libraries
I used several libraries but here are the main ones:


- [Ant Design](https://ant.design/) 
    - A library that provides a clean an simple ui for Typescript and React users. I used to this library mainly for its Calendar module, as I need the users to pick a deadline date for each of their projects. Ant Design just makes that a lot easy for me.

- [Webpack](https://webpack.js.org/)
    - An open-source Javascript module bundler. It is primarily for Javascript but I can also transform html, css and images. I used webpack so that I can transform JSX modules to a JS, less to css and also load images.

- [Babel](https://babeljs.io/) 
    - Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

- [React](https://reactjs.org/) 
    - A JavaScript libray for building user interfaces. It is use in this project to reduce cognitive load.The quote form requires so much field to fill out and it might cause for users to become overwhelmed.

- [@stripe/react-stripe-js](https://www.npmjs.com/package/@stripe/react-stripe-js)
    - An npm module that allows you to integrated stripe into any React application. I used this module in order to create a payment intent and also confirm it.
### Framework 

- [Django](https://www.djangoproject.com/) 
    - Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. I used Django to easily set up my data models and create urls with authentications.  

### Databases

- [PostgreSQL](https://www.postgresql.org/) 
    - Also known as Posgres, it is a free and open-source relational database management system emphasizing extensilbility and SQL compliance. I used this database because I have don't have a big data and it is easy to set up with Heroku.

- [Sqlite](https://www.sqlite.org/index.html) 
    - I used sqlite for development and testing purposes.

### Tools
- [VSCode](https://code.visualstudio.com/)
    - I used primarily use VSCode for debugging, syntax highlighting, code formatting and also snippets.

- [Balsamiq](https://balsamiq.com/)
    - It is a wireframing application that lets you generate clean wireframes.

- [Amazon S3](https://aws.amazon.com/s3/)
    - An object storage system and I used it in order for me to store my static files.


- [Sendgrid](https://sendgrid.com/)
    - Used for sending the account details to the user, in order for them to login to the web application.

- [Stripe](https://stripe.com/ie)
    - A payment proccessor that supports credit card, subscriptions, apple pay, etc. 
    Allows users to pay for the quote they have obtain for filling out the quote forms.

- [Github](https://github.com/)
    -It is a web-based Git or version control repository and internet hosting provider. I used to this to share my codes and store them. 
    

## Testing 

In order to testing the backend of the project I used the [APITestCase](https://www.django-rest-framework.org/api-guide/testing/), because I used Django Rest.



-  As a visitor, I want to be able to see all of the owner’s previous projects, in order for me to be able determine the quality of the projects.

    Steps: 

    1. Click on works page located on the top of the page.
    2. Verify that page is redirected to works page by seeing number of designs.
    3. Click one of the designs and verify that you can see a detailed view of a project.

- As a visitor,  I want to be able to see the type of services the owner provides, to see if it will suffice my needs.

    Steps: 
    1. In order to see the list of services, make sure that you are logged out. If not you will be redirected to the dashboard.
    2. One logged out click on the home button and scroll about half way to the page.
    3 Verify that there is a series of services.

- As a client, I want to fill out a quote form in order to give as much information about my design needs.
    Steps: 
    1. To start, click the get started button at the very top of the page or in header.
    2. Fill out the the project details and then click next.
    3. Make sure that the calendar is displayed properly and click one of the slots that are in color yellow.
    4. If you didn't pick any, verify that there is a modal pops out making sure that you do not want a deadline.
    5. Fill out the personal information about you. Verify that an error message is displayed when you do not enter an email.
    6. Click on next when you are happy enough with the information you provided.
    7. Verify that you are redirected to the page where the quote price is estimated and click next. If you are an existing user, please verify that a modal pops out for authentication.
    9. Fill out the information the payment details by using the card number 4242424242424242, expiry 22/22 and the CVC 222. verify that the price shows in the pay button and then click it.
    10. Verify project is created by clicking the project button.



- I want to be able to change the password, so that I can feel secure that I am the only one that can access my account.
    Steps: 
    1. In order to change password the user must be logged in first time. 
    2. After loggin in, verify that you are prompt for old and new password.
    3. In order to verify the password is changed, log out first.
    4. Verify the change by using your new password.

- I want to be able to login to my account, in order to see the progress of my ordered designs.
    Steps: 
    1. Click on the projects when you are logged in.
    2. Verify the status of the project by checking the status column in the projects page.
    3. Click on one of the row to expand and learn more information about the project.

- I want to able to request changes to the concepts uploaded by the designer to see if I like it.
    Steps: 
    1. Click on the projects link on the navigation bar.
    2. Verify that if the project is not finished yet, the request change is not clickable and disabled.
    3. If none of the projects are finished login as an admin and upload any image. Change the finished checkbox to True by clicking it.
    4. Click on the request changes located at the very top right of the slideshow located in the projects page.
    5. Verify that a modal pops up and then prompts you to choose the concept number and the description of the change.
    6. Click on the submit button on the bottom right of the modal.
    7. The change should show up below the Changes Request title.

- I want to be able to accept a concept, so that I can add a feedback to that particular design.
    Steps: 
    1. The first step is to make that the owner uploaded an image first, because the accept button will be disabled.
    2. Click the accept button and the add feedback page will be displayed.
    3. Fill out the form with feedback and the rate fro the particular design.

- I want to be able to log out of my account, to make sure that nobody can access my account.
    Steps: 
    1. When logged in, click on the initial icon or the avatar.
    2. Verify that the dropdown is visible.
    3. Click logout and you should be redirected to the login page.
- I want to be able to edit my profile, to change the display of my information.
    Steps: 
    1. Click on the avatar on the navigation bar.
    2. Clicks you full name and you shoud be redirected to profile page.
    3. Verify that if you didn't change any field, a warning is displayed stating you didn't change anything.
    4. Change any field and when you click save changes a notification is shown at the right top section.


### Mobile Responsiveness
To test the application if it works properly on mobile, I used the chrome developer tools and the following images where captured.


![IphoneX](https://github.com/chipchap31/freelancer-website/blob/master/essentials/Screenshot%202020-06-13%20at%2003.32.56.png?raw=true "Iphone X")

![Ipad](https://github.com/chipchap31/freelancer-website/blob/master/essentials/Screenshot%202020-06-13%20at%2003.34.04.png?raw=true "Ipad")

### Unit Testing 

In order to see if the most important feature of the application is working properly, I had to do some testing and this is can be done using travis.

I added a file called .travis.yml and added snippet below.

```javascript
language: python 
python: 
  - "3.8.1"

install: "pip3 install -r requirements.txt"
env: 
  - SECRET_KEY='Test'
script: python manage.py test
```
 
So far, I was able to run 21 successful tests.


#### Account test write up

If you want to see the test for the account application please click [here](https://github.com/chipchap31/freelancer-website/blob/master/accounts/tests.py)

To run the test for the account please open your terminal and enter: 

    ```python
        $ python3 manage.py test accounts
    ```

#### Checkout test write up

If you want to see the test for the account application please click [here](https://github.com/chipchap31/freelancer-website/blob/master/checkout/tests.py)

To run the test for the account please open your terminal and enter: 

    ```python
        $ python3 manage.py test checkout
    ```

### Admin Testing 
In order to use all of the admin functional please go to the [admin page](https://jomari-designs-app.herokuapp.com/admin/). Use the following login details.

Note: This is for the examiner only and please refrain from uploading inappropriate images.

- Username: admin
- Password: testing_password

- As an admin, I want to be able to upload an image to a particular project to show the client the initial design.

    1. Click on the project models and choose any item on the list.
    2. Check the amount of concept requested by the user. For example if the concept_amount is equal to two, please upload to images.
    3. After uploading, check the finished checkbox to let the user know that you are finished designing the concept.
    4. Verify the upload is completed by going to media section of your Amazon S3 bucket. 

### Testing Bugs
There are numerous bugs I came accross while testing. For example:

- When a new order is created the new project is not added automatically. The fix this bug, I had to fetch all of the projects after payment.


## Deployment 

### Local Deployment

In order to run the project, install the following to your local machine:

- [Git](https://git-scm.com/)
- [PIP](https://pip.pypa.io/en/stable/)
- [Python3](https://www.python.org/) 

Follow the steps below to run the project locally:

1. Open .bash_profile in the command line.

    ```python
    $ sudo nano .bash_profile
    ```
3. Save the following variables: 
    ```python
    export SECRET_KEY=<Your own secret key>
    export SENDGRID_KEY=<API key created from sendgrid>
    export STRIPE_SECRET_KEY=<Stripe secret key>
    export AWS_ACCESS_KEY_ID=<AWS access key>
    export AWS_SECRET_ACCESS_KEY=<AWS secret access key>
    export CLIENTS_EMAIL=<site owner's preferred email>
    ```

2. Open your command and move wherever you want to clone the repository and run the code below: 

    ```python
    $ git clone https://github.com/chipchap31/freelancer-website.git
    ```

3. Install the requirements. 
    ```python
    $ pip3 install -r requirements.txt
    ```
4. Run the server.
    ```python
    $ python3 manage.py runserver
    ```
5. Open your browser and go to [localhost](http://localhost:8000).

### Production Deployment

For the production deployment of this project, I used [Heroku](https://www.heroku.com/home). Follow the steps below in order to deploy your own:

1. The first step is I think the most important of all. That is to make sure that in the settings.py on the server folder. The DEBUG is set to False.
2. Create a requirements.txt file using the snippet below:

    ```python
    $ pip3 freeze > requirements.txt
    ```
3. Create a Procfile using the terminal.

    ```python
    $ echo web: gunicorn server.wsgi:application
    ```
4. Add changes to git and push it to your preferred branch.

    ```python
    $ git add . 
    $ git commit -m "deploy to heroku"
    $ git push
    ```

5. Go to your Heroku's dashboard and select new button at the very top right of the page. Select create new app and fill out the fields required.

6. Add the following environment variables to the settings section.
    ```python
    SECRET_KEY=<Your own secret key>
    SENDGRID_KEY=<API key created from sendgrid>
    STRIPE_SECRET_KEY=<Stripe secret key>
    AWS_ACCESS_KEY_ID=<AWS access key>
    AWS_SECRET_ACCESS_KEY=<AWS secret access key>
    CLIENTS_EMAIL=<site owner's preferred email>
    DISABLE_COLLECTSTATIC=1 # essential to prevent Heroku from uloading static files
    ```

7. Click the configure add-ons and on the search field, type in Heroku Postgres.

8. Apply the migrations to this new database. Note that DEBUG on the settings.py must be set to False

    ```python
    $ python3 manage.py migrate
    ```
9. Create an account with an admin permission.

    ```python
    $ python3 manage.py createsuperuser
    ```


10. Go to the deploy section on your Heroku dashboard and then deploy the application.

## Credits 
### Media
- I used several images from [Unsplash](https://unsplash.com/)


### Acknowledgements
- I would like to show my appreciation towards the Code Institute Slack Community and also my mentor.