import { createKey, encodeKey } from "../../../core/encryption.js";
function createCryptoKeyGenerator() {
  return {
    async generate() {
      const key = await createKey();
      const encoded = await encodeKey(key);
      return encoded;
    }
  };
}
export {
  createCryptoKeyGenerator
};
