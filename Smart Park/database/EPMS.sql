CREATE DATABASE IF NOT EXISTS EPMS;
USE EPMS;

CREATE TABLE IF NOT EXISTS Department (
  DepartmentCode VARCHAR(10) PRIMARY KEY,
  DepartmentName VARCHAR(60) NOT NULL,
  GrossSalary INT NOT NULL,
  TotalDeduction INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Employee (
  employeeNumber VARCHAR(20) PRIMARY KEY,
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  Position VARCHAR(60),
  Address VARCHAR(100),
  Telephone VARCHAR(20),
  Gender VARCHAR(10),
  hiredDate DATE,
  DepartmentCode VARCHAR(10) NOT NULL,
  FOREIGN KEY (DepartmentCode) REFERENCES Department(DepartmentCode)
);

CREATE TABLE IF NOT EXISTS Salary (
  salaryId INT AUTO_INCREMENT PRIMARY KEY,
  employeeNumber VARCHAR(20) NOT NULL,
  GrossSalary INT NOT NULL,
  TotalDeduction INT NOT NULL,
  NetSalary INT NOT NULL,
  month VARCHAR(7) NOT NULL,
  FOREIGN KEY (employeeNumber) REFERENCES Employee(employeeNumber)
);

CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(40) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

INSERT IGNORE INTO Department VALUES
 ('CW','Carwash',300000,20000),
 ('ST','Stock',200000,5000),
 ('MC','Mechanic',450000,40000),
 ('ADMS','Administration Staff',600000,70000);
