pipeline {

    agent any

    environment {
        AWS_SHARED_CREDENTIALS_FILE = "/var/jenkins_home/.aws/credentials"
        KUBECONFIG = "/var/jenkins_home/kubeconfig"
        AWS_PAGER = ""
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('SonarQube Scan') {
            steps {
                dir('backend') {
                    withSonarQubeEnv('sonarqube') {
                        sh 'mvn sonar:sonar -Dsonar.projectKey=TalentSphere'
                    }
                }
            }
        }

        stage('Trivy FS Scan') {
            steps {
                sh 'trivy fs .'
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

        stage('Upload Artifact To Nexus') {
            steps {
                dir('backend') {
                    sh 'mvn deploy -DskipTests'
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

        stage('Trivy Image Scan') {
            steps {
                sh 'trivy image talentsphere-backend:latest'
                sh 'trivy image talentsphere-frontend:latest'
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                    echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
                    '''
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                sh '''
                docker tag talentsphere-backend:latest zaidaftab/talentsphere-backend:${BUILD_NUMBER}
                docker push zaidaftab/talentsphere-backend:${BUILD_NUMBER}
                '''
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh '''
                docker tag talentsphere-frontend:latest zaidaftab/talentsphere-frontend:${BUILD_NUMBER}
                docker push zaidaftab/talentsphere-frontend:${BUILD_NUMBER}
                '''
            }
        }

        stage('Deploy To EKS') {
            steps {
                sh '''
                kubectl set image deployment/talentsphere-backend 
                talentsphere-backend=zaidaftab/talentsphere-backend:${IMAGE_TAG}

                kubectl set image deployment/talentsphere-frontend 
                talentsphere-frontend=zaidaftab/talentsphere-frontend:${IMAGE_TAG}

                kubectl rollout status deployment/talentsphere-backend

                kubectl rollout status deployment/talentsphere-frontend
                '''
            }
        }
    }

    post {

        success {
            echo 'Pipeline completed successfully!'
        }

        failure {

            echo 'Pipeline failed. Rolling back deployment...'

            sh '''
            kubectl rollout undo deployment/talentsphere-backend || true

            kubectl rollout undo deployment/talentsphere-frontend || true
            '''
        }
    }
}
