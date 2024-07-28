"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDataFromApi = exports.scheduleJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const https = __importStar(require("https"));
const utils_1 = require("./utils");
/**
 * Menjadwalkan sebuah cron job.
 * @param cronExpression Ekspresi cron untuk menentukan jadwal.
 * @param job Fungsi yang akan dijalankan pada jadwal yang ditentukan.
 */
const scheduleJob = (cronExpression, job, url) => {
    if (!(0, utils_1.isValidCronExpression)(cronExpression)) {
        (0, utils_1.logMessage)(`Ekspresi cron tidak valid: ${cronExpression}`, 'error');
        return;
    }
    if (url && !(0, utils_1.validateAndParseUrl)(url)) {
        return;
    }
    try {
        node_cron_1.default.schedule(cronExpression, () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield job(url);
            }
            catch (error) {
                if (error instanceof Error) {
                    (0, utils_1.logMessage)('Error dalam menjalankan job: ' + error.message, 'error');
                }
                else {
                    (0, utils_1.logMessage)('Error dalam menjalankan job: ' + String(error), 'error');
                }
            }
        }));
    }
    catch (error) {
        if (error instanceof Error) {
            (0, utils_1.logMessage)('Error dalam menjadwalkan job: ' + error.message, 'error');
        }
        else {
            (0, utils_1.logMessage)('Error dalam menjadwalkan job: ' + String(error), 'error');
        }
    }
};
exports.scheduleJob = scheduleJob;
// Fungsi yang mengambil data dari API
const fetchDataFromApi = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    console.log('Data diterima:', parsedData);
                    resolve();
                }
                catch (error) {
                    console.error('Gagal menguraikan data:', error);
                    reject(error);
                }
            });
        }).on('error', (error) => {
            console.error('Gagal mengambil data dari API:', error);
            reject(error);
        });
    });
};
exports.fetchDataFromApi = fetchDataFromApi;
// Contoh pemanggilan fungsi jadwal cron dengan URL yang ditentukan
const apiUrl = 'https://api.example.com/data'; // Ganti dengan URL API yang sesuai
(0, exports.scheduleJob)('0 0 * * *', exports.fetchDataFromApi, apiUrl); // Ekspresi cron: setiap hari pada tengah malam
