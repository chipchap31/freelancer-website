# Jomari Designs - Code Institure 4th Milestone

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


You can read more information about the stories by clicking here.

### Wireframing 

Wireframing is one of the important process of the design, as it helps the client, designers and developers be on the same page regarding the web application's structure.

I created the wireframe using [Balsamiq](https://balsamiq.com/). Please click [here] if you want to see them.

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

## Features left to implement

- **Password Recovery** - Using [Sendgrid](https://sendgrid.com/), I want to give the user the ability to recover their password, just in case they forgot their password. 


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