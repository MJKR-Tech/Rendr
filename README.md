# Rendr

Customizable Report Rendering with MJKR-Tech’s Rendr

## What is Rendr

This project tackles the problem of automated financial report rendering. Rendr is a responsive web application created using React.JS for frontend, Java Spring Boot for the backend and MySQL for the database.

Our web application produces an excel report file from JSON data files and an excel template file that the user inputs. The excel templates are stored in a database meaning that the user is able to reuse the template without uploading multiple times. Rendr has the ability to retrieve data from multiple JSON files to produce a single complex report containing one or many tables.

## Setup

For generic setups, read the `README.md` files in the separate folders.

## Setup Instructions on APIX Sandbox (for GS Engage purposes)

Ensure that you have git clone the repository on the sandbox.

1. Open terminal.
2. Run the following command to update the gradle version to 7.4.2:
    ``` bash
    source /etc/profile.d/gradle.sh
    ```
3. Run the following command to start the backend service:
    ``` bash
    cd /home/coder/project/Rendr/backend && gradle bootRun
    ```
4. Open a new terminal.
5. In the new terminal, run the following command:
    ``` bash
    cd /home/coder/project/Rendr/frontend && npm start
    ```
6. Enjoy our application.

### Additional Comments

- Ensure you use ngrok to perform tunneling to a running MySQL instance outside of sandbox.
- Ensure you have initialised the tables in your MySQL instance using the scripts in `project/Rendr/backend/src/main/resources/mysql/scripts/00-mysql-init.sql`. You can refer to `/home/coder/project/Rendr/backend/src/main/resources/mysql/README.md`.
- Update the `/home/coder/project/Rendr/backend/src/main/resources/application.properties` to the new ngrok URL as well as your database credentials.
