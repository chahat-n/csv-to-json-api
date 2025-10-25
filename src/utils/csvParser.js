//CSV parsing logic
import fs from "fs";

export const parseCSV = (filePath) => {
  const data = fs.readFileSync(filePath, "utf-8").split("\n");
  const headers = data[0].trim().split(",");
  const rows = data.slice(1);

  const records = rows
    .filter((r) => r.trim() !== "")
    .map((row) => {
      const values = row.split(",");
      let obj = {};

      headers.forEach((header, index) => {
        const keys = header.trim().split(".");
        let temp = obj;

        keys.forEach((key, i) => {
          if (i === keys.length - 1) temp[key] = values[index].trim();
          else temp[key] = temp[key] || {};
          temp = temp[key];
        });
      });

      return obj;
    });

  return records;
};
