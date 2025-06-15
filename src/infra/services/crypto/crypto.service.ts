import bcrypt from "bcrypt";
import type { ICryptoService } from "./crypto.service.definition";

export class CryptoService implements ICryptoService {
  private readonly bcrypt: typeof bcrypt;
  constructor() {
    // pass and setup repositories here
    this.bcrypt = bcrypt;
  }

  async encrypt(stringToHash: string): Promise<string> {
    return await this.bcrypt.hash(stringToHash, 10);
  }

  async compare(stringToCompare: string, hash: string): Promise<boolean> {
    return await this.bcrypt.compare(stringToCompare, hash);
  }
}
