import express from 'express';
import applicantRouter from './routes/applicantRoutes';

const app = express();

app.use(express.json());
app.use('/awesome/applicant', applicantRouter);

export default app;