import CryptoJS from 'crypto-js';

// IMPORTANT: Replace with a strong, securely stored secret key
// This key should ideally be managed via environment variables and not be hardcoded.
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const encryptNote = (note) => {
  if (!note) return null;
  return CryptoJS.AES.encrypt(JSON.stringify(note), SECRET_KEY).toString();
};

export const decryptNote = (encryptedNote) => {
  if (!encryptedNote) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedNote, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Error decrypting note:", error);
    return null; // Or handle the error appropriately
  }
};
