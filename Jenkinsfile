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
    
        stage('Build') {
            steps {
                sh 'ng build --prod'
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
