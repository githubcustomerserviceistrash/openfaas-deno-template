import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

// Hello World!
app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 3000 });