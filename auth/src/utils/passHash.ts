import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class PasswordHasher {
  static async toHash(password: string) {
    const hash = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(password, hash, 64)) as Buffer;

    return `${buffer.toString("hex")}.${hash}`;
  }

  static async compare(storedPass: string, passedPass: string) {
    const [hashedPass, hash] = storedPass.split(".");
    const buffer = (await scryptAsync(passedPass, hash, 64)) as Buffer;

    return buffer.toString("hex") === hashedPass;
  }
}
