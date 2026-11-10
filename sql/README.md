# Title
This project is intended to touch and feel SQL.

# PostgreSQL server setup on Ubuntu
* Step 0: clone
```
git clone https://github.com/krishnamaram3/portfolio.git && cd portfolio/sql
```

* Step 1: Install PostgreSQL
```
sudo apt update
sudo apt install postgresql postgresql-contrib -y
```

* Step 2: Verify the service is running
```
sudo systemctl enable postgresql
sudo systemctl status postgresql
psql --version
```

* Step 3: Log in as the postgres user
```
sudo -i -u postgres
psql
```

* Step 4: Set a password for the postgres user
```
ALTER USER postgres WITH PASSWORD 'password';
```

* Step 5: Create a database and a user
```
CREATE DATABASE portfolio;
CREATE USER cloud WITH ENCRYPTED PASSWORD 'Cloud@123';
GRANT ALL PRIVILEGES ON DATABASE portfolio TO cloud;
\c portfolio
GRANT ALL ON SCHEMA public TO cloud;
\q
exit
```

* Step 5.1: Create the skills table
```
psql -h localhost -U cloud -d portfolio
```
```
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25),
    stream VARCHAR(25)
);
```
```
INSERT INTO skills (name, stream) VALUES ('aws', 'operations');
INSERT INTO skills (name, stream) VALUES ('azure', 'operations');
INSERT INTO skills (name, stream) VALUES ('gcp', 'operations');
```
```
SELECT * FROM skills;
```

* Step 6: Allow remote connections (optional)
```
sudo vi /etc/postgresql/<version>/main/postgresql.conf
# change to: listen_addresses = '*'

sudo vi /etc/postgresql/<version>/main/pg_hba.conf
# add: host    all    all    0.0.0.0/0    scram-sha-256

sudo systemctl restart postgresql
sudo ufw allow 5432/tcp
```

* Step 7: Connect and test
```
psql -h localhost -U cloud -d portfolio
\l      -- list databases
\dt     -- list tables
SELECT * FROM skills;
```
