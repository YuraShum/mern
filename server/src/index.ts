import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { config, corsOptions } from './config';
import { apiRoutes } from './routes';
import { ErrorHandler } from './errors';
import { connectDB } from './config';
import { logEvents, errorMiddleware } from './middleware';
import { LOGGER_MONOGO_ERROR_FILE_NAME } from './constants';
import Logger from './libs/winston/logger';

//!! Поправити імпорти у файлах

const app: Application = express();

const errorHandler = new ErrorHandler(Logger);

const { port } = config;
// Підяключення до бази даних
connectDB();

app.use(express.json());

//!! Перевірити працездатність обмежень корсу
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api', apiRoutes);
app.use(errorMiddleware);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});


mongoose.connection.once('open', () => {
    console.log('✅ MongoDB connected successfully');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        LOGGER_MONOGO_ERROR_FILE_NAME,
    );
});

process.on('uncaughtException', async (error: Error) => {
    await errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
    throw reason;
});

