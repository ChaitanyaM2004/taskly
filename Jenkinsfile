pipeline {
    agent any

    stages {
        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        // Build the frontend Docker image
                        docker.build('frontend-image')
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    script {
                        // Build the backend Docker image
                        docker.build('backend-image')
                    }
                }
            }
        }

        stage('Run Frontend Tests in Docker') {
            steps {
                dir('frontend') {
                    script {
                        // Run frontend tests in a Docker container
                        docker.image('frontend-image').inside('-v //c/ProgramData/Jenkins/.jenkins/jobs/Taskly-CI/workspace/frontend:/workspace/frontend -w /workspace/frontend') {
                            bat 'npm test || exit 0' // allows pipeline to continue even if tests fail (optional)
                        }
                    }
                }
            }
        }

        stage('Run Backend Tests in Docker') {
            steps {
                dir('backend') {
                    script {
                        // Run backend tests in a Docker container
                        docker.image('backend-image').inside('-v //c/ProgramData/Jenkins/.jenkins/jobs/Taskly-CI/workspace/backend:/workspace/backend -w /workspace/backend') {
                            bat 'npm test || exit 0'
                        }
                    }
                }
            }
        }

        stage('Cleanup Docker Images') {
            steps {
                script {
                    // Clean up Docker images after the pipeline finishes
                    sh 'docker rmi frontend-image backend-image || true'
                }
            }
        }
    }
}
