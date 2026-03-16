pipeline {
    agent { label 'ec2-fleet' }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = "backend-app:${env.BUILD_NUMBER}"
                    sh "docker build -t ${imageName} ."
                    env.BACKEND_IMAGE = imageName
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker run -d --rm --name backend-test -p 5000:5000 ${env.BACKEND_IMAGE} || echo 'Container may already be running'"
                }
            }
        }
    }
}
