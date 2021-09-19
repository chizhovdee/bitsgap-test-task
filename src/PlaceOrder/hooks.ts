import { useState, useCallback, useEffect } from "react";
import * as yup from "yup";
import sumBy from "lodash/sumBy";
import isEmpty from "lodash/isEmpty";
import { useStore } from "./context";
import { Profit } from "./store/Profit";
import { ProfitError, ProfitsErrors } from "./model";
import { MAX_PROFITS_SUM, MAX_PROFIT_AMOUNT_SUM } from "./constants";

type Errors = {
  profits?: ProfitsErrors | null
}

type ProfitSchemaParams = {
  profitsSum: number,
  amountSum: number,
  previousProfit?: Profit
}

const makeProfitsSchema = ({ previousProfit, profitsSum, amountSum } : ProfitSchemaParams) => {
  const greaterThanPrevious = (value? : number) : boolean => !previousProfit || Number(value) > previousProfit.profit;

  return yup.object().shape({
    profit: yup.number()
      .min(0.01, "Minimum value is 0.01")
      .test("profitsSum", "Maximum profit sum is 500%", () => profitsSum <= MAX_PROFITS_SUM)
      .test("greaterThanPrevious", "Each target's profit should be greater than the previous one", greaterThanPrevious),
    targetPrice: yup.number().moreThan(0, "Price must be greater than 0"),
    amount: yup.number()
      .test(
        "maxAmountSum",
        `${amountSum} out of 100% selected. Please decrease by ${amountSum - MAX_PROFIT_AMOUNT_SUM}`,
        () => amountSum <= MAX_PROFIT_AMOUNT_SUM
      )
  });
};

const validateProfits = (profits: Profit[]) : ProfitsErrors | null => {
  if (profits.length === 0) return null;

  const profitsSum = sumBy(profits, "profit");
  const amountSum = sumBy(profits, "amount");

  const errors = {} as ProfitsErrors;
  profits.forEach((profit, index) => {
    const previousProfit = profits[index - 1];
    const schema = makeProfitsSchema({ previousProfit, profitsSum, amountSum });

    try {
      schema.validateSync(profit, { abortEarly: false });
    } catch (err) {
      const inner = (err as yup.ValidationError).inner;
      errors[profit.id] = inner.reduce((result, error) => {
        if(error.path) result[error.path] = error.message;
        return result;
      }, {} as ProfitError);
    }
  });

  return errors;
};

export const useForm = () => {
  const [errors, setErrors] = useState({} as Errors);
  const { profits, price, amount } = useStore();

  const submit = useCallback((e) => {
    e.preventDefault();

    const profitsErrors = validateProfits(profits);
    if (!isEmpty(profitsErrors)) {
      setErrors({ profits: profitsErrors });
    }
  }, [profits]);

  const clearErrors = useCallback(() => {
    setErrors({} as Errors);
  }, [setErrors]);

  useEffect(() => {
    clearErrors();
  }, [price, amount, clearErrors]);

  return { submit, errors, clearErrors };
};
