pipeline {
    agent {
        docker {
            image 'docker:24.0-dind'
            args '''
                --privileged 
                -v /var/run/docker.sock:/var/run/docker.sock
                -u root
            '''
        }
    }
    
    stages {
        stage('Test Docker') {
            steps {
                sh '''
                    # Install Docker client inside container
                    apk add --no-cache docker-cli
                    
                    # Test Docker
                    docker --version
                    docker ps
                    echo "✅ Docker works in Jenkins!"
                '''
            }
        }
    }
}