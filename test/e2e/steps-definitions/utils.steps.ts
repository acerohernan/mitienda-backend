export function wait(millisecons: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, millisecons));
}
