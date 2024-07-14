import express from 'express';
import cors from 'cors';
import drinksRouter from './routes/drinks';
import purchaseRouter from './routes/purchase';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/drinks', drinksRouter);
app.use('/api/purchase', purchaseRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

export default app;