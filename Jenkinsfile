pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    script {
                        def imageName = "backend-app:${env.BUILD_NUMBER}"
                        sh "docker build -t ${imageName} ."
                        env.BACKEND_IMAGE = imageName
                    }
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker run -d --rm --name backend-test -p 3000:3000 ${env.BACKEND_IMAGE} || echo 'Container may already be running'"
                }
            }
        }
    }
}
