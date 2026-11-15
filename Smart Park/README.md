# Smart Park EPMS

Starter project for the Smart Park Employee Payroll Management System.

## Stack
- React + Vite
- Tailwind CSS 3
- Axios
- Node.js + Express
- MySQL (`mysql2`)
- Session login (`express-session`)
- Password hashing (`bcryptjs`)

## Requirements
Install Node.js (LTS) and XAMPP/MySQL. Import `database/EPMS.sql` in phpMyAdmin if you need to create the database. If your EPMS database already exists, keep it and skip importing the SQL file.

## 1. Configure MySQL
Edit `backend-project/.env`:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=EPMS
DB_PORT=3306
SESSION_SECRET=change_this_to_a_long_random_secret
CLIENT_ORIGIN=http://localhost:5173
```
Use your actual MySQL password if root has one.

## 2. Start backend
```bash
cd backend-project
npm install
npm run dev
```
Backend: http://localhost:3000

## 3. Start frontend (in a second terminal)
```bash
cd frontend-project
npm install
npm run dev
```
Frontend: http://localhost:5173

## Login
The SQL seed includes username `king` and a bcrypt hash. The matching plain-text password is not included in this project. For a known password, create a user using the registration/seed method you choose, or replace the hash with one generated using bcryptjs:
```bash
node -e "require('bcryptjs').hash('YourPassword', 10).then(console.log)"
```
Then update the `Users.password` value in MySQL.

## API
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/check`
- GET, POST `/api/departments`
- GET, POST `/api/employees`
- GET, POST, PUT, DELETE `/api/salaries`
- GET `/api/reports/monthly?month=YYYY-MM`

## Notes
- Session cookies are configured for local development. For production, use HTTPS, a persistent session store, strong secrets, and secure cookie settings.
- This starter uses the database schema provided for EPMS. `Salary.month` is stored as `YYYY-MM`.
- Department and employee retrieval endpoints are included for application screens; adjust these if your assessor requires a stricter interpretation of the assignment operations.
