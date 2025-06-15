export interface ICryptoService {
  encrypt(stringToEncrypt: string): Promise<string>;
  compare(stringToCompare: string, hash: string): Promise<boolean>;
}
