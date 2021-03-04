import { Application } from "./deps.ts";
import fnHandler from "./function/index.ts";

const app = new Application();

/// types
app.use(async (ctx) => {
  const { request } = ctx;

  // function path
  const { url: { pathname } } = request;

  let params = {}
  // function params(only support JSON currently)
  if (request.hasBody) {
    const body = request.body();
    if (body.type === 'json') {
      params = await body.value
    } else {
      ctx.response.body = {
        code: 403,
        data: 'Invalid post body, please use JSON format.'
      }
      return
    }
  }

  // call the function if has.
  const { err, res: fnRes } = fnHandler({ path: pathname, params })  
  // return the result.
  ctx.response.body = {
    code: err ? 401: 200,
    data: fnRes
  }
});

await app.listen({ port: 3000 });