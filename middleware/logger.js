const fs = require('fs');
const path = require('path');
const logFilePath = path.join(__dirname, 'requests.log');

const logger = (req, res, next) => {
    const start = Date.now();  // Record start time
    res.on('finish', () => {  
        const responseTime = Date.now() - start;  
        const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url} - ${responseTime}ms\n`;
        console.log(logMessage);
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file', err);
            }
        });
    });
    next();  
};
module.exports = logger;
