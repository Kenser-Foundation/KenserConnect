import mongoose from "mongoose"
import winston, { error } from "winston"
import dotenv from "dotenv"
dotenv.config()

const { printf, combine, timestamp, colorize } = winston.format

const databaseInfoLogger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A'}),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    level: 'error',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A'}),
        printf((info) => `[${info.timestamp}] ${error.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ 
            filename: path.join(__dirname, 'Logs', 'db-infos.log')
        }),
        new winston.transports.Console()
    ]
});

try {
    await mongoose.connect(process.env.MONGO_CONN_STR)
    console.log("Connection Successful to the KenserConnect Database")
} catch (error) {
    console.error()
}

