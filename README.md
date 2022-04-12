# Rendr Setup

## Instructions
1. Open terminal.
2. Run the following command to update the gradle version (currently unsure how convert version premanently):
    ``` bash
    source /etc/profile.d/gradle.sh
    ```
3. Run the following command to start the backend service:
    ``` bash
    cd /home/coder/project/rendr && gradle bootRun
    ```
4. Open a new terminal.
5. In the new terminal, run the following command:
    ``` bash
    cd /home/coder/project/rendr-frontend && npm start
    ```
6. Enjoy our application.

## Additional comments
1. Ensure you use ngrok to perform tunneling to a running MySQL instance outside of sandbox.
2. Ensure you have initialised the tables in your MySQL instance using the scripts in `project/rendr/src/main/resources/mysql/scripts/00-mysql-init.sql`. You can refer to `/home/coder/project/rendr/src/main/resources/mysql/README.md`.
3. Update the `/home/coder/project/rendr/src/main/resources/application.properties` to the new ngrok URL as well as your database credentials.

#!/bin/sh

function main() {
    # runs backend in separate terminal
    sh -e 'source /etc/profile.d/gradle.sh && cd /home/coder/project/rendr && gradle bootRun';

    # runs frontend in separate terminal
    sh -e 'cd /home/coder/project/react-website && npm start';
}

main();

