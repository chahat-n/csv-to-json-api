import fs from "fs";

const firstNames = ["Rohit", "Priya", "Amit", "Sneha", "Rajesh", "Ananya", "Vikram", "Pooja", "Karan", "Divya"];
const lastNames = ["Sharma", "Kumar", "Singh", "Reddy", "Prasad", "Gupta", "Verma", "Patel", "Shah", "Joshi"];
const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad"];
const states = ["Maharashtra", "Delhi", "Karnataka", "Telangana", "Tamil Nadu", "West Bengal", "Gujarat"];
const genders = ["male", "female"];

const generateRow = (index) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const age = Math.floor(Math.random() * 70) + 18; // Age between 18-87
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const gender = genders[Math.floor(Math.random() * genders.length)];
  
  return `${firstName},${lastName},${age},Building ${index},Street ${index % 100},${city},${state},${gender}`;
};

const headers = "name.firstName,name.lastName,age,address.line1,address.line2,address.city,address.state,gender\n";
let csvContent = headers;

console.log("Generating 50,000 records...");
for (let i = 1; i <= 50000; i++) {
  csvContent += generateRow(i) + "\n";
  if (i % 10000 === 0) console.log(`Generated ${i} records...`);
}

fs.writeFileSync("./data/users_large.csv", csvContent);
console.log("✅ CSV file created: data/users_large.csv");
