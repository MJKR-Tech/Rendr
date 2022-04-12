# Rendr

## What is Rendr

This project tackles the problem of automated financial report rendering. Rendr is a responsive web application created using React.JS for frontend, Java Spring Boot for the backend and MySQL for the database.\
Our web application produces an excel report file from JSON data files and an excel template file that the user inputs. The excel templates are stored in a database meaning that the user is able to reuse the template without uploading multiple times. Rendr has the ability to retrieve data from multiple JSON files to produce a single complex report containing one or many tables.

## How to install Rendr to your local environment

To install Rendr on your local environment, start by cloning both the rendr and rendr-frontend repositories from our [github](https://github.com/MJKR-Tech).

### Run the Backend

From the cloned backend repository, navigate to RendrApplication.java and press run. This should get the backend up and running on your localhost at port 3306.

### Run the Frontend

After you have the backend running, go to the frontend and in the command line terminal, type `cd react-website` to change the directory to react-website. Then use the script `npm start` to start the frontend. A webpage should pop up and the application should be running.
