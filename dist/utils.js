"use strict";
// src/utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndParseUrl = exports.logMessage = exports.isValidCronExpression = void 0;
// Fungsi untuk memvalidasi ekspresi cron
const isValidCronExpression = (expression) => {
    const cronRegex = /^(\*|([0-5]?[0-9])([,/-][0-5]?[0-9])*) (\*|([0-1]?[0-9]|2[0-3])([,/-][0-1]?[0-9]|2[0-3])*) (\*|([0-2]?[0-9]|3[0-1])([,/-][0-2]?[0-9]|3[0-1])*) (\*|([0-5]?[0-9])([,/-][0-5]?[0-9])*) (\*|([0-5]?[0-9])([,/-][0-5]?[0-9])*)$/;
    return cronRegex.test(expression);
};
exports.isValidCronExpression = isValidCronExpression;
// Fungsi untuk mencatat pesan log dengan format
const logMessage = (message, level = 'info') => {
    const levels = {
        info: '[INFO]',
        warn: '[WARN]',
        error: '[ERROR]'
    };
    console.log(`${levels[level]} ${message}`);
};
exports.logMessage = logMessage;
// Fungsi untuk memvalidasi dan mengurai URL
const validateAndParseUrl = (urlString) => {
    try {
        return new URL(urlString);
    }
    catch (error) {
        (0, exports.logMessage)(`Invalid URL: ${urlString}`, 'error');
        return null;
    }
};
exports.validateAndParseUrl = validateAndParseUrl;
