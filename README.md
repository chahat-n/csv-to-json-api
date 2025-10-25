# 📊 CSV to JSON Converter API

A high-performance **Node.js + PostgreSQL** API that converts CSV files into structured JSON objects, stores them efficiently in a database, and prints performance metrics including processing time, memory usage, and data distribution.  

---

## 🚀 Overview
This project was developed as part of a technical challenge. The goal was to create a backend API that reads CSV data, handles nested keys using **dot notation** (like `address.city`), and stores it as JSON in PostgreSQL. After uploading, the application computes and displays the **Age Group Distribution** of all imported users.

---

## ⚙️ Features
- 🧩 **Custom CSV Parser**: Handles nested dot notation (`user.name.first`, etc.).
- ⚡ **Optimized Batch Inserts**: Imports 50,000+ records in under 2 seconds.
- 🧠 **Performance Tracking**: Logs total time, memory usage, and records/second.
- 🗂️ **PostgreSQL JSONB Storage**: Stores flexible JSON data structures efficiently.
- 🧮 **Console Summary**: Prints an age distribution histogram after upload.
- 🔧 **Environment-Based Configuration** via `.env`.

---

## 🧱 Tech Stack
| Component | Technology |
|------------|-------------|
| Backend | Node.js (Express.js) |
| Database | PostgreSQL (pg module) |
| Configuration | dotenv |
| File Parsing | Custom CSV parser (pure JS, no libraries) |

---

## 📝 Environment Setup

1. **Clone the Repository**
git clone https://github.com/your-username/csv-to-json-api.git
cd csv-to-json-api
npm install


2. **Configure Environment Variables**
Create a `.env` file in the root directory:
CSV_FILE_PATH=./data/users_large.csv
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=challenge_db
DB_PORT=5432
PORT=3000


3. **Create PostgreSQL Database and Table**
CREATE TABLE public.users (
id SERIAL PRIMARY KEY,
name JSONB NOT NULL,
age INT NOT NULL,
address JSONB,
additionalinfo JSONB
);


4. **Generate CSV Data**
node generateCSV.js

This script produces a large `users_large.csv` file with randomly generated data.

5. **Run the Application**
npm start

Then open your browser at:
http://localhost:3000/api/files/upload



---

## 📁 Project Structure
csv-to-json-api/
├── data/
│ └── users_large.csv
├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── fileController.js
│ ├── routes/
│ │ └── fileRoutes.js
│ ├── utils/
│ │ └── csvParser.js
│ ├── app.js
│ └── server.js
├── generateCSV.js
├── .env
├── package.json
└── README.md

---

## 🧠 How It Works

1. **CSV Parsing**
   - Reads CSV using `fs.readFileSync()`.
   - Splits headers (`name.firstName`) and values to form nested JSON objects dynamically.

2. **Database Upload**
   - Converts parsed data into structured objects (`name`, `address`, `additionalinfo`).
   - Performs **batch inserts** (1,000 records per query) for optimized writes.

3. **Performance Analysis**
   - Captures total runtime (`Date.now()` difference).
   - Measures memory footprint with `process.memoryUsage()`.
   - Calculates import throughput (records per second).

4. **Console Output**
   Displays data processing summary on terminal:
📊 Performance Metrics:
⏱ Time: 1.95 seconds
💾 Memory: 32.65 MB
📈 Records/sec: 25,641

📊 Age-Group Distribution:
<20 20%
20–40 45%
40–60 25%
60 10%>


---

## 💡 Performance Highlights
| Records | Time (s) | Memory (MB) | Records/sec |
|----------|-----------|-------------|--------------|
| 50,000 | 1.95 | 32.65 | 25,641 |

Optimizations include batch inserts, minimal iterative processing, and optimized I/O — ensuring excellent scalability for large datasets.

---

## 🧮 Example Output JSON
A sample record from CSV:
name.firstName,name.lastName,age,address.city,address.state,gender
Rohit,Prasad,35,Pune,Maharashtra,male


JSON equivalent stored in PostgreSQL:
{
"name": { "firstName": "Rohit", "lastName": "Prasad" },
"age": 35,
"address": { "city": "Pune", "state": "Maharashtra" },
"additionalinfo": { "gender": "male" }
}


---

## 🌱 Challenge Summary
This project fulfills the assignment requirement from the coding challenge document:
> “After reading a large CSV file, convert it to JSON, insert into PostgreSQL, and display age distribution in the terminal.”

Key accomplishments:
- Fully dynamic nested property handling.
- Efficient database operations for 50k+ records.
- Stable memory and time footprint.
- Modular, production-ready engineering structure.

---

## 🧔 Author
**Your Name**  
Software Developer | Computer Engineering  
📍 Based in India  
📧 your_email@example.com  
🔗 [LinkedIn Profile](https://linkedin.com/in/your-profile)

---

## 📜 License
MIT License. Feel free to fork, modify, and use for learning or interviews.

---

## 🪄 Quick Run Commands
Clear old data
psql -U postgres -d challenge_db -c "TRUNCATE TABLE users RESTART IDENTITY;"

Generate fresh CSV
node generateCSV.js

Start project
npm start
