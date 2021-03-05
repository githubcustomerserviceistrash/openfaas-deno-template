// Create your own function ts files and import them here.
import demo from "./demo.ts";
const fnMaps: { [key: string]: any } = {
  ...demo,
};

export interface FnInput {
  /** function path, concat with `/`. */
  path: string;
  /** function params. */
  params: Object;
}

export interface FnOutput {
  /** error message if has. */
  err: string | number;
  /** function result */
  res: any;
}

function has(key: string, obj: Object) {
  return key in obj;
}

export default function fnHandler(input: FnInput): FnOutput {
  let err : string | number = "";
  let res : null = null;
  const { path: fnPath, params } = input;
  if (has(fnPath, fnMaps)) {
    const fn = fnMaps[fnPath];
    try {
      res = fn(params);
    } catch(error) {
      err = error;
    }
  } else {
    err = 404;
  }
  return { err, res };
}
