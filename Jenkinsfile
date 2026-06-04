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



    stage('Deploy Backend') {



        steps {



            sh 'docker rm -f talentsphere-backend || true'



            sh 'docker run -d --name talentsphere-backend -p 8081:8080 --link talentsphere-mysql:mysql -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/talentsphere -e SPRING_DATASOURCE_USERNAME=root -e SPRING_DATASOURCE_PASSWORD=root123 talentsphere-backend:latest'

        }

    }



    stage('Deploy Frontend') {



        steps {



            sh 'docker rm -f talentsphere-frontend || true'



            sh 'docker run -d --name talentsphere-frontend -p 3000:80 talentsphere-frontend:latest'

        }

    }

}

}
