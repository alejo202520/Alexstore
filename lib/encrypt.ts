// lib/encrypt.ts
const encoder = new TextEncoder();

// Verificamos que la clave existe en las variables de entorno
if (!process.env.ENCRYPTION_KEY) {
  throw new Error("❌ ENCRYPTION_KEY no está definido en el archivo .env");
}

// Convertimos la clave a Uint8Array
const key = encoder.encode(process.env.ENCRYPTION_KEY);

// Función de hashing usando HMAC con SHA-256
export const hash = async (plainPassword: string): Promise<string> => {
  const passwordData = encoder.encode(plainPassword);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign', 'verify']
  );

  const hashBuffer = await crypto.subtle.sign('HMAC', cryptoKey, passwordData);

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

// Función para comparar una contraseña en texto plano con la cifrada
export const compare = async (
  plainPassword: string,
  encryptedPassword: string
): Promise<boolean> => {
  const hashedPassword = await hash(plainPassword);
  return hashedPassword === encryptedPassword;
};
