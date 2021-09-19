/* eslint @typescript-eslint/no-use-before-define: 0 */

import React from "react";
import { observer } from "mobx-react";
import block from "bem-cn-lite";
import { Cancel } from "@material-ui/icons";

import { NumberInput } from "components";
import { QUOTE_CURRENCY } from "../../constants";
import { Profit } from "../../store/Profit";

import "./ProfitItem.scss";

const b = block("profit");

type Props = {
  profit: Profit;
  removeProfit(id: number) : void
};

const ProfitItem = observer(({ profit, removeProfit } : Props) => {
  return (
    <div className={b("inputs")}>
      <NumberInput
        value={profit.profit}
        decimalScale={2}
        InputProps={{ endAdornment: "%" }}
        variant="underlined"
        onBlur={(value) => profit.setProfit(Number(value))}
      />
      <NumberInput
        value={profit.targetPrice}
        decimalScale={2}
        InputProps={{ endAdornment: QUOTE_CURRENCY }}
        variant="underlined"
        onBlur={(value) => profit.setTargetPrice(Number(value))}
      />
      <NumberInput
        value={profit.amount}
        decimalScale={2}
        InputProps={{ endAdornment: "%" }}
        variant="underlined"
        onBlur={(value) => profit.setAmount(Number(value))}
      />
      <div className={b("cancel-icon")} onClick={() => removeProfit(profit.id)}>
        <Cancel />
      </div>
    </div>
  );
});

export { ProfitItem };
