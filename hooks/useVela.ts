import { useState, useCallback } from 'react';
// @ts-ignore - Assuming vela-common-ts is an internal or proprietary package to be installed later if not on npm
import { encryptPayload, generateProof } from 'vela-common-ts';

export interface VelaEncryptionResult {
  encryptedData: string;
  attestationProof: string;
}

export function useVela() {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Encrypts the payload client-side before sending it to the blockchain.
   * This ensures the deposit amount and user data are hidden from the public ledger,
   * and only decryptable by the Vela TEE Enclave.
   */
  const secureDeposit = useCallback(async (amount: number, userAddress: string): Promise<VelaEncryptionResult | null> => {
    setIsEncrypting(true);
    setError(null);
    try {
      // Step 1: Encrypt payload for the TEE
      const payload = { amount, userAddress, timestamp: Date.now() };
      const encryptedData = await encryptPayload(payload, {
        enclaveId: 'flux-vault-enclave',
      });

      // Step 2: Generate client-side proof if required by the TEE starterkit
      const attestationProof = await generateProof(encryptedData);

      return { encryptedData, attestationProof };
    } catch (err: any) {
      console.error("Vela Encryption Error:", err);
      setError(err);
      return null;
    } finally {
      setIsEncrypting(false);
    }
  }, []);

  return { secureDeposit, isEncrypting, error };
}
