require("dotenv").config();
const fs = require("fs");
const path = require("path");
const connectDB = require("./db");
const { insertMessage, updateStatus } = require("./services/message.service");

(async () => {
  try {
    await connectDB();

    const dataDir = path.join(__dirname, "../data");
    const files = fs.readdirSync(dataDir);

    for (const file of files) {
      const jsonData = JSON.parse(
        fs.readFileSync(path.join(dataDir, file), "utf8")
      );
      const payload = jsonData.metaData.entry[0].changes[0].value;

      if (payload.messages) {
        console.log(`📩 Inserting message from ${file}`);
        await insertMessage(payload);
      } else if (payload.statuses) {
        console.log(`📡 Updating status from ${file}`);
        await updateStatus(payload);
      }
    }

    console.log("✅ Seeding complete");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
