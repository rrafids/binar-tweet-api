import app from './app';

const PORT = Number(process.env.APP_PORT) || 443;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});
