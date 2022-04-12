#!/bin/sh

function main() {
    # runs backend in separate terminal
    sh -e 'source /etc/profile.d/gradle.sh && cd /home/coder/project/rendr && gradle bootRun';

    # runs frontend in separate terminal
    sh -e 'cd /home/coder/project/react-website && npm start';
}

main();
