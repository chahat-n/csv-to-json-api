# 📊 CSV to JSON Converter API

A high-performance **Node.js + PostgreSQL** API that converts CSV files into nested JSON objects, efficiently imports them into PostgreSQL, and prints time, memory, and analytics.

---

## Overview
This project parses CSV data (with dot notation fields for nested data), converts each record to JSON, and uploads in optimized batches to PostgreSQL. After import, it prints age-group distribution and performance stats on the console.

---

## Features
- Handles nested dot notation (`user.name.first` → nested JSON)
- Batch-inserts 50,000+ records in under 2 seconds
- Prints import time, memory usage, and records/sec
- Console summary for age-group analytics
- Clean modular code, environment config via `.env`

---

## Tech Stack

| Component    | Technology                      |
|--------------|---------------------------------|
| Backend      | Node.js (Express.js)            |
| Database     | PostgreSQL (`pg` module)        |
| Config       | dotenv                          |
| CSV Parsing  | Custom parser (pure JS)         |

---

## Environment Setup

1. **Clone**
   ```
   git clone https://github.com/your-username/csv-to-json-api.git
   cd csv-to-json-api
   npm install
   ```

2. **Configure Environment**
   - Create `.env`:
     ```
     CSV_FILE_PATH=./data/users_large.csv
     DB_HOST=localhost
     DB_USER=postgres
     DB_PASSWORD=yourpassword
     DB_NAME=challenge_db
     DB_PORT=5432
     PORT=3000
     ```

3. **Create PostgreSQL Table**
   ```
   CREATE TABLE public.users (
       id SERIAL PRIMARY KEY,
       name JSONB NOT NULL,
       age INT NOT NULL,
       address JSONB,
       additionalinfo JSONB
   );
   ```

4. **Generate CSV**
   ```
   node generateCSV.js
   ```
   (Creates new `users_large.csv` for large dataset tests.)

5. **Run**
   ```
   npm start
   # Visit: http://localhost:3000/api/files/upload
   ```

---

## Sample Output

```
Performance Metrics:
Time: 1.95 seconds
Memory: 32.65 MB
Records/sec: 25,641

Age-Group Distribution:
<20        20%
20–40      45%
40–60      25%
>60        10%
```

---

## Project Structure

```
csv-to-json-api/
├── data/
│   └── users_large.csv
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── fileController.js
│   ├── routes/
│   │   └── fileRoutes.js
│   ├── utils/
│   │   └── csvParser.js
│   ├── app.js
│   └── server.js
├── generateCSV.js
├── .env
├── package.json
└── README.md
```

---

## Example Output JSON

Given:
```
name.firstName,name.lastName,age,address.city,address.state,gender
Rohit,Prasad,35,Pune,Maharashtra,male
```
Stored as:
```
{
  "name": { "firstName": "Rohit", "lastName": "Prasad" },
  "age": 35,
  "address": { "city": "Pune", "state": "Maharashtra" },
  "additionalinfo": { "gender": "male" }
}
```

---
