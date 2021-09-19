export type OrderSide = "buy" | "sell";

export type ProfitError = {
  [prop : string] : string
};

export type ProfitsErrors = {
  [index: number]: ProfitError
};
