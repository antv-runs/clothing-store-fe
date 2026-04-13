export const isChunkLoadError = (error: Error | null): boolean => {
  if (!error) {
    return false;
  }

  return (
    error.message.includes("Failed to fetch dynamically imported module") ||
    error.message.includes("Importing a module script failed") ||
    error.name === "ChunkLoadError"
  );
};
