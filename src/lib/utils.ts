export async function hashData(data: string) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedData);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max-min+1)) + min
}

  