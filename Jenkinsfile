pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'harshues04/myapp'  // ← REPLACE
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }
    
    stages {
        stage('Build') {
            steps {
                script {
                    def image = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        image.push("${env.BUILD_NUMBER}")
                        image.push('latest')
                    }
                }
            }
        }
        
        stage('Deploy Green') {
            steps {
                script {
                    sh '''
                        docker stop green-app || true
                        docker rm green-app || true
                        docker run -d --network blue-green-net --name green-app -p 9091:3000 \\
                            -e VERSION=v${BUILD_NUMBER} -e ENV=GREEN ${DOCKER_IMAGE}:${BUILD_NUMBER}
                    '''
                }
            }
        }
        
        stage('Test Green') {
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