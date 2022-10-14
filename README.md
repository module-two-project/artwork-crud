# The Digital Artwork Gallery by Saskia & Marc

For our project we created an online art gallery. With an account, a person is able to view all artwork on the website, create new pieces of art, update current pieces of art and delete their own previous creations.
Without an account, you may only view art, and cannot contribute to the online gallery.
Each user with an account also has a user profile, allowing them to favourite pieces of art.  Existing art can be edited by anyone, so that specifics can be altered to reflect the nature of change in the art world.


## **Instructions to run on your computer**  

### Create a .env file - in this add:  
PORT=3000,   
SESSION_SECRET='stringOfYourChoice',   
  
    
You will then need to create an account on Cloudinary.com  
From your Cloudinary Dashboard, you will need to copy your Cloud Name, API Key & API Secret and enter them into your .env file following this format (without quotation marks).

CLOUDINARY_NAME='your cloud name',    
CLOUDINARY_KEY='your API key',   
CLOUDINARY_SECRET='your API secret'  
  
Next you will need to run the command **npm install** to install all the dependencies for this app.

Finally, to run the script in your local computer, enter the command **npm run dev**.


## Check the online version
Take a look at our online art gallery:   
[Gallery Link](https://artwork-project.herokuapp.com/?)

