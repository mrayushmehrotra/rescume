export async function createContext() {
  return {
    userId: null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
