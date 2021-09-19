/* eslint @typescript-eslint/no-use-before-define: 0 */

import React, { useCallback } from "react";
import { observer } from "mobx-react";
import block from "bem-cn-lite";
import { Cancel } from "@material-ui/icons";

import { NumberInput } from "components";
import { QUOTE_CURRENCY } from "../../constants";
import { Profit } from "../../store/Profit";
import { ProfitError } from "../../model";

import "./ProfitItem.scss";

const b = block("profit");

type Props = {
  profit: Profit;
  removeProfit(id: number) : void;
  clearErrors() : void;
  errors?: ProfitError | null;
};

const ProfitItem = observer(({ profit, removeProfit, errors, clearErrors } : Props) => {
  const handleProfitBlur = useCallback((value) => {
    profit.setProfit(Number(value));
    clearErrors();
  }, [profit, clearErrors]);

  const handleTargetPriceBlur = useCallback((value) => {
    profit.setTargetPrice(Number(value));
    clearErrors();
  }, [profit, clearErrors]);

  const handleAmountBlur = useCallback((value) => {
    profit.setAmount(Number(value));
    clearErrors();
  }, [profit, clearErrors]);

  return (
    <div className={b("inputs")}>
      <NumberInput
        value={profit.profit}
        decimalScale={2}
        InputProps={{ endAdornment: "%" }}
        variant="underlined"
        onBlur={handleProfitBlur}
        error={errors?.profit}
      />
      <NumberInput
        value={profit.targetPrice}
        decimalScale={2}
        InputProps={{ endAdornment: QUOTE_CURRENCY }}
        variant="underlined"
        onBlur={handleTargetPriceBlur}
        error={errors?.targetPrice}
      />
      <NumberInput
        value={profit.amount}
        decimalScale={2}
        InputProps={{ endAdornment: "%" }}
        variant="underlined"
        onBlur={handleAmountBlur}
        error={errors?.amount}
      />
      <div className={b("cancel-icon")} onClick={() => removeProfit(profit.id)}>
        <Cancel />
      </div>
    </div>
  );
});

export { ProfitItem };
