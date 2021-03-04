import { Application } from "./deps.ts";
import type { FnInput, FnOutput } from "./function/index.ts";
import fnHandler from "./function/index.ts";

const app = new Application();

/// types
app.use(async (ctx) => {
  const { request } = ctx;

  // function input params(only support JSON currently)
  let input: FnInput = {
    path: "",
    params: {}
  };
  if (request.hasBody) {
    const body = request.body();
    if (body.type === "json") {
      input = await body.value;
    } else {
      ctx.response.body = {
        code: 403,
        data: "Invalid post body, please use JSON format.",
      };
      return;
    }
  }

  // call the function.
  const { err, res: fnRes }: FnOutput = fnHandler(input);
  // return the result.
  ctx.response.body = {
    code: err ? 401 : 200,
    data: err ? err : fnRes,
  };
});

await app.listen({ port: 3000 });
