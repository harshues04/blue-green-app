pipeline {
    agent {
        docker {
            image 'docker:24.0-dind'
            args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    stages {
        stage('Test Docker') {
            steps {
                sh '''
                    docker --version
                    docker ps
                    echo "✅ Docker works in Jenkins!"
                '''
            }
        }
    }
}
