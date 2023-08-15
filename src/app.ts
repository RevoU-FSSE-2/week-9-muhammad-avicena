import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import * as dotenv from 'dotenv';

import usersRouter from "./routes/userRoutes";
import indexRouter from "./routes/indexRoutes";
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';

const app = express();
dotenv.config();
app.use(cors({
    credentials: true
}))
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/auth', authRoutes);
app.use('/api/transaction', transactionRoutes)

// App listeners
const server = http.createServer(app);
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log('Running on http://localhost:' + port);
})

// Error handlers
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send('Error: ' + err.status + " " + err.message);
});

export default app;
