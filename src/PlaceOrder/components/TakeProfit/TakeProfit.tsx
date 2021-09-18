/* eslint @typescript-eslint/no-use-before-define: 0 */

import React from "react";
import block from "bem-cn-lite";
import { AddCircle } from "@material-ui/icons";

import { Switch, TextButton } from "components";

import { QUOTE_CURRENCY } from "../../constants";
import { OrderSide } from "../../model";
import { Profit } from '../../store/Profit'
import "./TakeProfit.scss";
import { ProfitItem } from "../ProfitItem/ProfitItem";

type Props = {
  orderSide: OrderSide;
  profits: Profit[];
};

const b = block("take-profit");

const TakeProfit = ({ orderSide, profits }: Props) => {
  return (
    <div className={b()}>
      <div className={b("switch")}>
        <span>Take profit</span>
        <Switch checked />
      </div>
      <div className={b("content")}>
        {renderTitles()}
        {renderProfits({ profits })}
        <TextButton className={b("add-button")}>
          <AddCircle className={b("add-icon")} />
          <span>Add profit target 2/5</span>
        </TextButton>
        <div className={b("projected-profit")}>
          <span className={b("projected-profit-title")}>Projected profit</span>
          <span className={b("projected-profit-value")}>
            <span>0</span>
            <span className={b("projected-profit-currency")}>
              {QUOTE_CURRENCY}
            </span>
          </span>
        </div>
      </div>
    </div>
  );

  function renderTitles() {
    return (
      <div className={b("titles")}>
        <span>Profit</span>
        <span>Target price</span>
        <span>Amount to {orderSide === "buy" ? "sell" : "buy"}</span>
      </div>
    );
  }

  function renderProfits({ profits } : { profits: Profit[] }) {
    return profits.map((profit) =>
      <ProfitItem key={profit.id} profit={profit} />
    );
  }
};

export { TakeProfit };
