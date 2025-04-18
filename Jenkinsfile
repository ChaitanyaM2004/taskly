pipeline {
    agent {
        docker {
            image 'node:18'
            args '--rm'
        }
    }

    environment {
        MONGO_URI = 'mongodb+srv://chaitu_0904:1234@taskly.m3tks.mongodb.net/?retryWrites=true&w=majority&appName=taskly'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/ChaitanyaM2004/taskly.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Lint or Tests') {
            steps {
                echo 'Tests can go here'
                // sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo 'No build step for backend, skip or add frontend build if needed'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Add deployment script here if needed'
            }
        }
    }
}
