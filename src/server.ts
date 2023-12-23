import app from './app';

const PORT = Number(process.env.PORT) || 443;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
