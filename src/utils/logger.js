const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logFile = path.join(__dirname, '../../logs/log.txt');
    this.ensureLogFileExists();
  }

  ensureLogFileExists() {
    const logsDir = path.dirname(this.logFile);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    if (!fs.existsSync(this.logFile)) {
      fs.writeFileSync(this.logFile, '');
    }
  }

  log(message, type = 'INFO') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${type}: ${message}\n`;
    
    try {
      fs.appendFileSync(this.logFile, logEntry);
      console.log(` Log registrado: ${type} - ${message}`);
    } catch (error) {
      console.error(' Erro ao escrever no log:', error);
    }
  }

  error(message) {
    this.log(message, 'ERROR');
  }

  info(message) {
    this.log(message, 'INFO');
  }

  success(message) {
    this.log(message, 'SUCCESS');
  }
}

module.exports = new Logger();