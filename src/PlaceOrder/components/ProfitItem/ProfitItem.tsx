/* eslint @typescript-eslint/no-use-before-define: 0 */

import React from "react";
import block from "bem-cn-lite";
import { Cancel } from "@material-ui/icons";

import { NumberInput } from "components";
import { QUOTE_CURRENCY } from "../../constants";
import { Profit } from '../../store/Profit'

import "./ProfitItem.scss";

const b = block("profit");

type Props = {
  profit: Profit
}

const ProfitItem = ({ profit } : Props) => {
  console.log(profit);
  return (
    <div className={b("inputs")}>
      <NumberInput
        value={profit.profit}
        decimalScale={2}
        InputProps={{ endAdornment: "%" }}
        variant="underlined"
      />
      <NumberInput
        value={profit.targetPrice}
        decimalScale={2}
        InputProps={{ endAdornment: QUOTE_CURRENCY }}
        variant="underlined"
      />
      <NumberInput
        value={profit.amount}
        decimalScale={2}
        InputProps={{ endAdornment: "%" }}
        variant="underlined"
      />
      <div className={b("cancel-icon")}>
        <Cancel />
      </div>
    </div>
  );
}

export { ProfitItem };
