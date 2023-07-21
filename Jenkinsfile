pipeline {
    agent any
        tools{ 
            
            nodejs 'NodeJs'
        }
    stages {
        
        stage('Install Dependencies') {
            steps {

                sh 'npm install -g @angular/cli'
                
                sh 'npm install'
            }
        }

         stage('Build image') {
      steps {
        sh ' docker build -t fares123456/angularapp:latest .'
      }
    }
        stage ('Login'){
        steps{
            script{
withCredentials([string(credentialsId: 'DOCKERHUB_JENKINS', variable: 'dockerpwd')]) {
       sh 'docker login -u fares123456 -p ${dockerpwd} '
    }
  }}
}
 stage('Push image') {
      steps {
        sh ' docker push fares123456/angularapp:latest'
      }
    }
    
        stage('Deploy') {
      steps {
        sh 'export PATH=$PATH:/usr/local/bin/docker-compose'
        sh 'docker-compose -f docker-compose.yml up -d'
      }
    }
        
    }
  
    post {
        always {
            // Clean up workspace and log out from the server
            cleanWs()
            sh 'docker logout'
        }
    }
}
