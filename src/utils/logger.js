const fs = require("fs");
const path = require("path");

class Logger {
  static log(error) {
    const timestamp = new Date().toISOString();
    const message = `[${timestamp}] - ${error}\n`;

    const logDir = path.resolve(__dirname, "../../logs");
    const logPath = path.join(logDir, "log.txt");

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(logPath, message);
    console.error(message); // Agora exibe no console também
  }
}

module.exports = Logger;
