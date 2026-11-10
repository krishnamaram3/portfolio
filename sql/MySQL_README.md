# Title
This project is intended to touch and feel SQL.

# MySQL server setup on Ubuntu
* Step 0: clone
```
git clone https://github.com/krishnamaram3/portfolio.git && cd portfolio/sql
```

* Step 1: Installing MySQL
```
sudo apt update
sudo apt install mysql-server -y
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
changed to bind-address = 0.0.0.0
sudo systemctl restart mysql
sudo systemctl status mysql
```
* Step 2: Configuring MySQL
```
sudo mysql_secure_installation
```
* Step 3: Login to MySQL server
```
sudo mysql -u root
```
* Step 4: create database with name portfolio and Create a dedicated MySQL user and granting privilges
```
CREATE DATABASE portfolio;
CREATE USER 'cloud'@'%' IDENTIFIED WITH mysql_native_password BY 'Cloud@123';
GRANT ALL ON *.* TO 'cloud'@'%';
FLUSH PRIVILEGES;
```
* Step 5: Create table and perform CRUD operations
```
CREATE TABLE portfolio.skills(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25),
    stream VARCHAR(25)
);
```
```				
INSERT INTO portfolio.skills (name, stream) VALUES ('aws', 'operations');
INSERT INTO portfolio.skills (name, stream) VALUES ('azure', 'operations');
INSERT INTO portfolio.skills (name, stream) VALUES ('gcp', 'operations');
```
* Step 6: Testing
```
select * from portfolio.skills;
```
