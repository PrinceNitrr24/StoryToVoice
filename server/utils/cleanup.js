const fs = require("fs");
const path = require("path");

const audioDir = path.join(__dirname, "../../public/audio");

function cleanupOldAudioFiles(maxAge = 7 * 24 * 60 * 60 * 1000) {
  if (!fs.existsSync(audioDir)) return;

  const files = fs.readdirSync(audioDir);
  const now = Date.now();

  files.forEach((file) => {
    const filePath = path.join(audioDir, file);
    const stats = fs.statSync(filePath);

    if (now - stats.mtime.getTime() > maxAge) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Cleaned up old audio file: ${file}`);
    }
  });
}

module.exports = { cleanupOldAudioFiles };
