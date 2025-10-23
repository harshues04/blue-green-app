pipeline {
    agent {
        docker {
            image 'docker:24.0-dind'
            args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    
    stages {
        stage('Build & Deploy Blue') {
            steps {
                sh '''
                    echo "=== DEBUG: Docker Info ==="
                    docker --version
                    docker ps -a
                    
                    echo "=== Building Blue Image ==="
                    docker build -t harshues04/blue-app:blue .
                    
                    echo "=== Deploying Blue Container ==="
                    docker stop blue || true
                    docker rm blue || true
                    docker run -d --name blue -p 9091:8080 harshues04/blue-app:blue
                    
                    echo "=== Waiting for Blue to start ==="
                    sleep 10
                    
                    echo "=== Checking Blue Status ==="
                    docker logs blue --tail 10
                    curl -f http://localhost:9091 || echo "❌ Blue not ready!"
                '''
            }
        }
        
        stage('Test Docker') {
            steps {
                sh '''
                    echo "✅ Docker agent WORKS!"
                    docker ps
                '''
            }
        }
    }
}