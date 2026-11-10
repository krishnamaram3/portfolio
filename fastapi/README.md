# Title
This project is intended to touch and feel FastAPI framework.

# Execution Flow
* Step 1: Clone repo
```
git clone https://github.com/csit-robots/csp-dev.git && cd csp-dev/portfolio/fastapi
```
* Step 2: Install dependencies
```
sudo apt update
sudo apt install python3-pip -y
pip3 install -r requirements.txt --break-system-packages
sudo pip3 install "fastapi[standard]" --break-system-packages
sudo pip3 install uvicorn --break-system-packages
```
* Step 3: Export environment variables
```
export DB_SERVER="localhost"
export DB_USR="cloud"
export DB_PWD="Cloud@123"
```
* Step 4: To run the server
```
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
* Step 5: URL for Testing
```
http://127.0.0.1:8000/portfolio/api/docs
http://127.0.0.1:8000/portfolio/api/openapi.json
```

# Containerize
* Build Image, Tag and Push to DockerHub and  ECR 
   ```
   docker login

   docker build -t csp-portfolio-fastapi .

   docker tag csp-portfolio-fastapi:latest krishnamaram2/csp-portfolio-fastapi:latest

   docker push krishnamaram2/csp-portfolio-fastapi:latest
   ```
   ```
   docker build -t csp-portfolio-fastapi .

   aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 865366202861.dkr.ecr.eu-west-2.amazonaws.com

   docker tag csp-portfolio-fastapi:latest 865366202861.dkr.ecr.eu-west-2.amazonaws.com/csp-portfolio-fastapi:latest

   docker push 865366202861.dkr.ecr.eu-west-2.amazonaws.com/csp-portfolio-fastapi:latest
   ```

* Run container on Local
   ```
   docker run -d -p 80:80 --name csp-portfolio-fastapi csp-portfolio-fastapi

   docker logs -f csp-portfolio-fastapi

   docker exec -it csp-portfolio-fastapi /bin/sh
   ``
