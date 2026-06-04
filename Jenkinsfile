pipeline {

    agent any

    stages {

        stage('Build Backend') {

            steps {

                dir('backend') {

                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {

            steps {

                dir('frontend') {

                    sh 'npm install'

                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build Backend') {

            steps {

                dir('backend') {

                    sh 'docker build -t talentsphere-backend:latest .'
                }
            }
        }

        stage('Docker Build Frontend') {

            steps {

                dir('frontend') {

                    sh 'docker build -t talentsphere-frontend:latest .'
                }
            }
        }
    }
}
