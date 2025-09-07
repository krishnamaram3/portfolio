# Portfolio

A portfolio single page application using React and Material UI

# Execution Flow: on Linux Machine
```
git clone https://github.com/devopsmadeeasyorg/csp-dev.git && cd csp-dev/portfolio/reactjs
vi src/components/Skills.js
const API_BASE_URL
npm install
npm install react-scripts
npm start
http://localhost:3000/
```
# Containerize
* Build Image, Tag and Push to DockerHub and  ECR 
   ```
   docker login

   docker build -t csp-portfolio-reactjs .

   docker tag csp-portfolio-reactjs:latest krishnamaram2/csp-portfolio-reactjs:latest

   docker push krishnamaram2/csp-portfolio-reactjs:latest
   ```
   ```
   docker build -t csp-portfolio-reactjs .

   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 214531026619.dkr.ecr.us-east-1.amazonaws.com

   docker tag csp-portfolio-reactjs:latest 214531026619.dkr.ecr.us-east-1.amazonaws.com/csp-portfolio-reactjs:latest

   docker push 214531026619.dkr.ecr.us-east-1.amazonaws.com/csp-portfolio-reactjs:latest
   ```

* Run container on Local
   ```
   docker run -d -p 80:80 --name csp-portfolio-reactjs csp-portfolio-reactjs

   docker logs -f csp-portfolio-reactjs

   docker exec -it csp-portfolio-reactjs /bin/sh
   ``

# References
```
https://github.com/devmahmud/material-ui-portfolio.git
```
