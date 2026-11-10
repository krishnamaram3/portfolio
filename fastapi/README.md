# FastAPI portfolio backend

The backend supports MySQL and PostgreSQL. Before starting the API, create the
database and `skills` table using the [MySQL setup](../sql/MySQL_README.md) or
[PostgreSQL setup](../sql/README.md). Switching databases does not migrate data.

# Execution Flow
* Step 1: Clone repo
```
git clone https://github.com/krishnamaram3/portfolio.git && cd portfolio/fastapi
```
* Step 2: Install dependencies
```
sudo apt update
sudo apt install python3-pip -y
pip3 install -r requirements.txt --break-system-packages
sudo pip3 install "fastapi[standard]" --break-system-packages
sudo pip3 install uvicorn --break-system-packages
```
* Step 3: Export database connection settings. Set `DB` to `MySQL` or
  `PostgreSQL`; it defaults to `MySQL` when omitted. `DB_NAME` defaults to
  `portfolio`, and `DB_PORT` defaults to `3306` for MySQL or `5432` for
  PostgreSQL. Use the credentials created during database setup; do not commit
  real passwords.
```bash
export DB="PostgreSQL"  # Use "MySQL" for MySQL
export DB_SERVER="localhost"
export DB_NAME="portfolio"
export DB_USR="cloud"
export DB_PWD="Cloud@123"
# Optional: export DB_PORT="5432"
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

Run the database unit tests from the `fastapi` directory:
```bash
python -m unittest discover -s tests
```
