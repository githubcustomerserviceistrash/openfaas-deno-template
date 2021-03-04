interface Params {
  num1: number,
  num2: number
}

function add({ num1, num2 }: Params): number {
  return num1 + num2;
}

export default {
  'demo/add': add
}
