pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'http://192.168.127.137:8089/root/orange-kpi-front'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                tool 'NodeJS' 

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
