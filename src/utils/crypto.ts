import { createHash } from "node:crypto";

function sha256(content: string) {
  return createHash("sha256").update(content).digest("hex");
}

export function hasPassword(password: string): string {
  return sha256(password + process.env.PASSWORD_SECRET);
}