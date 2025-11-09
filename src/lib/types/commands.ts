export type Parameter = {
  value: string;
  description: string;
};

export type Command = {
  name: string;
  description: string;
  params?: Parameter[][];
  action: (...args: string[]) => string | void;
};
