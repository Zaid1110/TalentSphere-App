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

              -p 8081:8080 \

              talentsphere-backend:latest

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

              talentsphere-frontend:latest

            '''

        }

    }

}



}
