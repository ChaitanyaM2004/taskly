pipeline {
    label agent 'docker' // Use a Docker agent for the pipeline
    agent {
        docker {
            image 'node:18'
            label 'docker' // Optional: You can specify a label if your Jenkins agent requires it.
            args '--rm'    // Optional: Clean up the container after the build is finished.
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
                // If you have any test scripts
                // sh 'npm test'
                echo 'Tests can go here'
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
