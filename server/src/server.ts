import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';

const startServer = async () => {
  await connectDB();

  const app = createApp();

  app.listen(ENV.PORT, () => {
    console.log(`[KAVACH CARE Server] running on http://localhost:${ENV.PORT}`);
    console.log(`[API Base URL]: http://localhost:${ENV.PORT}/api`);
  });
};

startServer().catch((err) => {
  console.error('Fatal Server Startup Error:', err);
  process.exit(1);
});
