pipeline {
    agent any  // Use default Jenkins agent
    
    stages {
        stage('Test Docker') {
            steps {
                sh '''
                    echo "Jenkins is running!"
                    docker --version || echo "Docker not available on host"
                '''
            }
        }
    }
}
