import { customAlphabet } from "nanoid";
const alphabet: string = "abcdefghijklmnopqrtsuvwxyz0123456789";

const nanoId = customAlphabet(alphabet, 19);

export const generateId = (key: keyof typeof prefixes): string => {
  return prefixes[key] + nanoId();
};

export enum prefixes {
  Database = "dbase_",
  User = "user_",
  Tokens = 'token_'
};
