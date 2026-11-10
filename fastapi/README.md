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
