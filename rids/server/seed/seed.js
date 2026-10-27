import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import slugify from "slugify";
import User from "../models/User.js";
import Department from "../models/Department.js";
import Field from "../models/Field.js";
import Faculty from "../models/Faculty.js";

import ResearchPaper from "../models/ResearchPaper.js";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();
 
const FIELDS = [
  "Science & Technology",
  "Engineering & Applied Sciences",
  "Medical & Health Sciences",
  "Social Sciences",
  "Business & Management",
  "Law & Governance",
  "Arts & Creative Studies",
  "Sustainable Development Goals",
  "Philosophy and Psychology",
  "History and Geography",
];
 
const DEPARTMENTS = [
  { name: "Agriculture", description: "Crop sciences, soil science and agronomy research." },
  { name: "Veterinary Sciences", description: "Animal health, husbandry and veterinary medicine." },
  { name: "Food Sciences", description: "Food technology, nutrition and processing research." },
  { name: "Computer Science", description: "Software, AI and systems research." },
  { name: "Environmental Sciences", description: "Climate, ecology and sustainability research." },
];
 
const run = async () => {
  await connectDB();
 
  const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@rids.edu.pk";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!";
 
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({ name: "RIDS Admin", email: adminEmail, password: adminPassword, role: "admin" });
    console.log(`Admin user created: ${adminEmail} / ${adminPassword} (change this password after first login)`);
  } else {
    console.log("Admin user already exists, skipping.");
  }
 
  // findOneAndUpdate with upsert doesn't run the schema's pre('validate') hooks
  // (those only fire on .save()), so the slug has to be computed here explicitly
  // or every upserted doc would get slug: null and collide on the unique index.
  const fieldDocs = [];
  for (const name of FIELDS) {
    const slug = slugify(name, { lower: true, strict: true });
    const doc = await Field.findOneAndUpdate(
      { name },
      { name, slug },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    fieldDocs.push(doc);
  }
  console.log(`Seeded ${fieldDocs.length} knowledge fields.`);
 
  const deptDocs = [];
  for (const d of DEPARTMENTS) {
    const slug = slugify(d.name, { lower: true, strict: true });
    const doc = await Department.findOneAndUpdate(
      { name: d.name },
      { ...d, slug },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    deptDocs.push(doc);
  }
  console.log(`Seeded ${deptDocs.length} departments.`);
 
  const existingPapers = await ResearchPaper.countDocuments();
  if (existingPapers === 0) {
    const faculty1 = await Faculty.create({
      name: "Dr. Amina Batool",
      designation: "Assistant Professor",
      department: deptDocs[0]._id,
      bio: "Researches sustainable crop yield optimization.",
    });
 
    const paper = await ResearchPaper.create({
      title: "Sustainable Wheat Yield Optimization Under Water Stress",
      abstract:
        "This study evaluates irrigation scheduling strategies to maximize wheat yield under limited water availability, contributing to regional food security goals.",
      department: deptDocs[0]._id,
      field: fieldDocs.find((f) => f.name === "Sustainable Development Goals")._id,
      authors: ["Dr. Amina Batool"],
      tags: ["agriculture", "sustainability", "water", "wheat"],
      publishedYear: 2025,
      isFeatured: true,
    });
 
    faculty1.researchPapers.push(paper._id);
    await faculty1.save();
    console.log("Seeded one demo faculty member and research paper.");
  }
 
  console.log("Seeding complete.");
  await mongoose.connection.close();
  process.exit(0);
};
 
run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});;


// import dotenv from "dotenv";
// import { connectDB } from "../config/db.js";
// import mongoose from "mongoose";
// import User from "../models/User.js";
// import Department from "../models/Department.js";
// import Field from "../models/Field.js";
// import Faculty from "../models/Faculty.js";
// import ResearchPaper from "../models/ResearchPaper.js";
// import dns from "dns";

// dns.setServers(["8.8.8.8", "1.1.1.1"]);
// dotenv.config();

// const FIELDS = [
//   "Science & Technology",
//   "Engineering & Applied Sciences",
//   "Medical & Health Sciences",
//   "Social Sciences",
//   "Business & Management",
//   "Law & Governance",
//   "Arts & Creative Studies",
//   "Sustainable Development Goals",
//   "Philosophy and Psychology",
//   "History and Geography",
// ];

// const DEPARTMENTS = [
//   { name: "Agriculture", description: "Crop sciences, soil science and agronomy research." },
//   { name: "Veterinary Sciences", description: "Animal health, husbandry and veterinary medicine." },
//   { name: "Food Sciences", description: "Food technology, nutrition and processing research." },
//   { name: "Computer Science", description: "Software, AI and systems research." },
//   { name: "Environmental Sciences", description: "Climate, ecology and sustainability research." },
// ];

// const run = async () => {
//   await connectDB();

//   const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@rids.edu.pk";
//   const adminPassword = process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!";

//   const existingAdmin = await User.findOne({ email: adminEmail });
//   if (!existingAdmin) {
//     await User.create({ name: "RIDS Admin", email: adminEmail, password: adminPassword, role: "admin" });
//     console.log(`Admin user created: ${adminEmail} / ${adminPassword} (change this password after first login)`);
//   } else {
//     console.log("Admin user already exists, skipping.");
//   }

//   const fieldDocs = [];
//   for (const name of FIELDS) {
//     const doc = await Field.findOneAndUpdate({ name }, { name }, { upsert: true, new: true });
//     fieldDocs.push(doc);
//   }
//   console.log(`Seeded ${fieldDocs.length} knowledge fields.`);

//   const deptDocs = [];
//   for (const d of DEPARTMENTS) {
//     const doc = await Department.findOneAndUpdate({ name: d.name }, d, { upsert: true, new: true });
//     deptDocs.push(doc);
//   }
//   console.log(`Seeded ${deptDocs.length} departments.`);

//   const existingPapers = await ResearchPaper.countDocuments();
//   if (existingPapers === 0) {
//     const faculty1 = await Faculty.create({
//       name: "Dr. Amina Batool",
//       designation: "Assistant Professor",
//       department: deptDocs[0]._id,
//       bio: "Researches sustainable crop yield optimization.",
//     });

//     const paper = await ResearchPaper.create({
//       title: "Sustainable Wheat Yield Optimization Under Water Stress",
//       abstract:
//         "This study evaluates irrigation scheduling strategies to maximize wheat yield under limited water availability, contributing to regional food security goals.",
//       department: deptDocs[0]._id,
//       field: fieldDocs.find((f) => f.name === "Sustainable Development Goals")._id,
//       authors: ["Dr. Amina Batool"],
//       tags: ["agriculture", "sustainability", "water", "wheat"],
//       publishedYear: 2025,
//       isFeatured: true,
//     });

//     faculty1.researchPapers.push(paper._id);
//     await faculty1.save();
//     console.log("Seeded one demo faculty member and research paper.");
//   }

//   console.log("Seeding complete.");
//   await mongoose.connection.close();
//   process.exit(0);
// };

// run().catch((err) => {
//   console.error("Seed failed:", err);
//   process.exit(1);
// });
