import path from "node:path";
import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// 加载环境变量
config();

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: "npx tsx prisma/seed.ts"
  },
});
