export async function resetMemory() {
  const res = await fetch("/api/reset", { method: "POST" });

  if (!res.ok) {
    throw new Error("Failed to reset memory");
  }

  return await res.json();
}
