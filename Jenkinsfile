pipeline {
    agent any
    environment {
        SERVER_REG = "balgittuber"

        APP_NAME = "corven-talk-ai"
        PORT = "3000"
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
                    docker push ${SERVER_REG}/${APP_NAME}:${BRANCH_NAME}-${BUILD_ID}
                    '''
            }
        }
    }
}