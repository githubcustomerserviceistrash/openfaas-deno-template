// import all function modules into fnMaps
let fnMaps: { [key: string]: any } = {};
const excludes = ["index.ts"];
for (const fileStat of Deno.readDirSync("./function")) {
  if (fileStat.isFile && !excludes.includes(fileStat.name)) {
    const read = async () => {
      const module = await import(`./${fileStat.name}`);
      if (module?.default) {
        fnMaps = {
          ...fnMaps,
          ...module.default,
        };
      }
    };
    await read();
  }
}

export interface FnInput {
  /** function path, concat with `/`. */
  path: string;
  /** function params. */
  params: Object;
}

export interface FnOutput {
  /** error message if has. */
  err: string;
  /** function result */
  res: any;
}

function has(key: string, obj: Object) {
  return key in obj;
}

export default function fnHandler(input: FnInput): FnOutput {
  let err: string = "";
  let res: null = null;
  const { path: fnPath, params } = input;
  if (has(fnPath, fnMaps)) {
    const fn = fnMaps[fnPath];
    try {
      res = fn(params);
    } catch (error) {
      err = error;
    }
  } else {
    err = "Function not found.";
  }
  return { err, res };
}
