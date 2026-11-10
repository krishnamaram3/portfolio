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

The Python Skills page uses FastAPI. For local development, start FastAPI on
port 8000 as described in [the FastAPI README](../fastapi/README.md), then
start the React development server. The development default is
`http://localhost:8000/portfolio/api/python`. Set
`REACT_APP_FASTAPI_BASE_URL` before starting React to use a different backend;
the value must include the `/portfolio/api/python` prefix.

Production builds default to the same-origin path `/portfolio/api/python`.
Configure the ingress to route that path to FastAPI, or supply
`REACT_APP_FASTAPI_BASE_URL` at build time (including as a Docker build argument).
Restart the development server or rebuild the production app after changing it.

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

   aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 865366202861.dkr.ecr.eu-west-2.amazonaws.com

   docker tag csp-portfolio-reactjs:latest 865366202861.dkr.ecr.eu-west-2.amazonaws.com/csp-portfolio-reactjs:latest

   docker push 865366202861.dkr.ecr.eu-west-2.amazonaws.com/csp-portfolio-reactjs:latest
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
