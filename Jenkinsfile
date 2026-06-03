pipeline {

```
agent any

stages {

    stage('Build Backend') {
        steps {
            dir('backend') {
                sh 'mvn clean package -DskipTests'
            }
        }
    }

}
```

}

