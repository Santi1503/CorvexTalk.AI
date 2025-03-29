pipeline {
    agent any
    environment {
        SERVER_REG = "balgittuber"

        APP_NAME = "corven-talk-ai"
        PORT = "3000"
        ENV = "/var/jenkins_home/envs/${APP_NAME}/env"
    }

    stages {
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo '====== DEPLOYING ======'
                sh '''
                    docker build . -f Dockerfile -t ${SERVER_REG}/${APP_NAME}:${BRANCH_NAME}-${BUILD_ID}
                    docker login 
                    docker push ${SERVER_REG}/${APP_NAME}:${BRANCH_NAME}-${BUILD_ID}

                    if docker ps -a --format '{{.Names}}' | grep -Eq "^${APP_NAME}\$"; then
                        echo "Stopping and removing existing container: ${APP_NAME}"
                        docker stop ${APP_NAME}
                        docker rm ${APP_NAME}
                    fi

                    # Run the new container
                    docker run -d --env-file ${ENV} --name ${APP_NAME} --restart always -p ${PORT}:3000 ${SERVER_REG}/${APP_NAME}:${BRANCH_NAME}-${BUILD_ID}
                    '''
            }
        }
    }
}