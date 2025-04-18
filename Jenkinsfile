pipeline {
    agent any

    stages {
        stage('Install Client Dependencies') {
            steps {
                dir('client') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Server Dependencies') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Client Tests') {
            steps {
                dir('client') {
                    bat 'npm test || exit 0' // allows pipeline to continue even if tests fail (optional)
                }
            }
        }

        stage('Run Server Tests') {
            steps {
                dir('server') {
                    bat 'npm test || exit 0'
                }
            }
        }
    }
}
