import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';
import workspaceRouter from './routes/workspace.router';

const app = express();
const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('형욱 바보');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use('/workspaces', workspaceRouter);
