pipeline {

    agent any

    environment {
        IMAGE_NAME = 'product-service'
        CONTAINER_NAME = 'product-service'
        APP_PORT = '8081'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build \
                    -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker run -d \
                    --name ${CONTAINER_NAME} \
                    -p ${APP_PORT}:8081 \
                    ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    echo "Waiting for application to start..."
                    sleep 15

                    curl --fail \
                    http://localhost:${APP_PORT}/actuator/health
                '''
            }
        }
    }

    post {

        success {
            echo 'Product Service deployed successfully on EC2.'
        }

        failure {
            echo 'Product Service deployment failed.'
        }
    }
}