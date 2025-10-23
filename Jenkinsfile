pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'harshues04/myapp'  // ← REPLACE
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }
    
    stages {
        stage('Test Docker') {
            steps {
                sh '''
                    sleep 10
                    curl -f http://localhost:9091 || exit 1
                '''
            }
        }
        
        stage('Switch Traffic') {
            steps {
                sh '''
                    docker exec nginx-proxy sh -c "sed -i 's/blue-app/green-app/g' /etc/nginx/nginx.conf && nginx -s reload"
                '''
            }
        }
        
        stage('Cleanup Blue') {
            steps {
                sh '''
                    docker stop blue-app || true
                    docker rm blue-app || true
                '''
            }
        }
    }
}
