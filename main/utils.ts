import sha256 from 'crypto-js/sha256.js';
import Base64 from 'crypto-js/enc-base64.js';

export const passwordHash = (password: string, salt: string, challenge: string): string => {
    const base64 = Base64.stringify(sha256( password + salt))!;
    const challengeHash = Base64.stringify(sha256( base64 + challenge))!;

    return challengeHash
}