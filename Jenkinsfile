pipeline {

    agent any

    stages {

        stage('Build Backend & Unit Test') {

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

                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                    '''

                }

            }

        }

        stage('Push Backend Image') {

            steps {

                sh '''

                docker tag talentsphere-backend:latest zaidaftab/talentsphere-backend:latest

                docker push zaidaftab/talentsphere-backend:latest

                '''

            }

        }

        stage('Push Frontend Image') {

            steps {

                sh '''

                docker tag talentsphere-frontend:latest zaidaftab/talentsphere-frontend:latest

                docker push zaidaftab/talentsphere-frontend:latest

                '''

            }

        }

        stage('Deploy Backend') {

            steps {

                sh '''

                docker stop talentsphere-backend || true

                docker rm talentsphere-backend || true

                docker run -d \
                  --name talentsphere-backend \
                  --network bridge \
                  -e SPRING_DATASOURCE_URL=jdbc:mysql://172.17.0.1:3306/talentsphere \
                  -e SPRING_DATASOURCE_USERNAME=root \
                  -e SPRING_DATASOURCE_PASSWORD=root123 \
                  -p 8081:8080 \
                  zaidaftab/talentsphere-backend:latest

                '''

            }

        }

        stage('Deploy Frontend') {

            steps {

                sh '''

                docker stop talentsphere-frontend || true

                docker rm talentsphere-frontend || true

                docker run -d \
                  --name talentsphere-frontend \
                  -p 3000:80 \
                  zaidaftab/talentsphere-frontend:latest

                '''

            }

        }

    }

}
