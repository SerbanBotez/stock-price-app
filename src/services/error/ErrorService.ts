/* eslint-disable no-console */
export async function logError(req: Error | string) {
  await new Promise((r) => {
    setTimeout(r, 100);
  });

  console.log(req);
}
