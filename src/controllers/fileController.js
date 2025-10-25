import { parseCSV } from "../utils/csvParser.js";
import pool from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const uploadData = async (req, res) => {
  console.log("\n🚀 Starting CSV import...\n");
  
  const startTime = Date.now();
  const startMemory = process.memoryUsage().heapUsed;

  try {
    // Parse CSV
    console.log("📄 Parsing CSV file...");
    const records = parseCSV(process.env.CSV_FILE_PATH);
    console.log(`✅ Parsed ${records.length} records\n`);

    // Batch insert for performance
    console.log("💾 Inserting into database (batch mode)...");
    await batchInsert(records);

    const endTime = Date.now();
    const endMemory = process.memoryUsage().heapUsed;

    // Performance metrics
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    const memoryUsed = ((endMemory - startMemory) / 1024 / 1024).toFixed(2);

    console.log("\n📊 Performance Metrics:");
    console.log(`⏱️  Time taken: ${timeTaken} seconds`);
    console.log(`💾 Memory used: ${memoryUsed} MB`);
    console.log(`📈 Records/second: ${(records.length / timeTaken).toFixed(0)}\n`);

    // Age distribution
    console.log("📊 Calculating age distribution...");
    await printAgeDistribution();

    res.send({
      message: "Data uploaded successfully!",
      records: records.length,
      timeTaken: `${timeTaken}s`,
      memoryUsed: `${memoryUsed} MB`,
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).send({ error: error.message });
  }
};

// Optimized batch insert function
const batchInsert = async (records) => {
  const BATCH_SIZE = 1000; // Insert 1000 records at a time
  const batches = Math.ceil(records.length / BATCH_SIZE);

  for (let i = 0; i < batches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, records.length);
    const batch = records.slice(start, end);

    // Build multi-row INSERT query
    const values = [];
    const placeholders = [];

    batch.forEach((record, index) => {
      const { name, age, address, ...extra } = record;
      const offset = index * 4;
      placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`);
      values.push(name, parseInt(age) || 0, address || {}, extra || {});
    });

    const query = `
      INSERT INTO users (name, age, address, additionalinfo)
      VALUES ${placeholders.join(", ")}
    `;

    await pool.query(query, values);
    console.log(`   ✓ Inserted batch ${i + 1}/${batches} (${end}/${records.length} records)`);
  }
};

// Age distribution calculator
const printAgeDistribution = async () => {
  const result = await pool.query("SELECT age FROM users");
  const ages = result.rows.map((r) => r.age);

  const total = ages.length;
  const groupA = ages.filter((a) => a < 20).length;
  const groupB = ages.filter((a) => a >= 20 && a <= 40).length;
  const groupC = ages.filter((a) => a > 40 && a <= 60).length;
  const groupD = ages.filter((a) => a > 60).length;

  console.log("\n📊 Age-Group Distribution:");
  console.log(`   <20        ${((groupA / total) * 100).toFixed(2)}%`);
  console.log(`   20–40      ${((groupB / total) * 100).toFixed(2)}%`);
  console.log(`   40–60      ${((groupC / total) * 100).toFixed(2)}%`);
  console.log(`   >60        ${((groupD / total) * 100).toFixed(2)}%`);
  console.log("");
};
