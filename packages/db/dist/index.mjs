// src/index.ts
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
var prisma = global.prisma || new PrismaClient({
  log: ["query"]
});
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
export {
  prisma
};
//# sourceMappingURL=index.mjs.map