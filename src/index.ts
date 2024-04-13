// index.ts
import dotenv from 'dotenv';
import path from 'path';
import app from './app';

const envPath = path.resolve(__dirname, '.env');

dotenv.config({ path: envPath });

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});