/* eslint @typescript-eslint/no-use-before-define: 0 */

import React from "react";
import { observer } from "mobx-react";
import block from "bem-cn-lite";
import { AddCircle } from "@material-ui/icons";

import { Switch, TextButton } from "components";

import { QUOTE_CURRENCY, MAX_PROFITS_COUNT } from "../../constants";
import { useStore } from "../../context";
import { Profit } from "../../store/Profit";
import "./TakeProfit.scss";
import { ProfitItem } from "../ProfitItem/ProfitItem";

type ProfitsProps = {
  profits: Profit[],
  removeProfit(id: number): void
};

type AddProfitButton = {
  profits: Profit[];
  isReachedMaxProfitsCount: boolean;
  addProfit(): void;
};

const b = block("take-profit");

const TakeProfit = observer(() => {
  const {
    activeOrderSide,
    profits,
    addProfit,
    removeProfit,
    isReachedMaxProfitsCount
  } = useStore();

  return (
    <div className={b()}>
      <div className={b("switch")}>
        <span>Take profit</span>
        <Switch checked />
      </div>
      <div className={b("content")}>
        {renderTitles()}
        {renderProfits({ profits, removeProfit })}
        {renderAddProfitButton({ profits, addProfit, isReachedMaxProfitsCount })}
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
        <span>Amount to {activeOrderSide === "buy" ? "sell" : "buy"}</span>
      </div>
    );
  }

  function renderProfits({ profits, removeProfit } : ProfitsProps) {
    return profits.map((profit) =>
      <ProfitItem key={profit.id} profit={profit} removeProfit={removeProfit} />
    );
  }

  function renderAddProfitButton({ profits, addProfit, isReachedMaxProfitsCount }: AddProfitButton) {
    if (isReachedMaxProfitsCount) return null;

    return (
      <TextButton className={b("add-button")} onClick={addProfit}>
        <AddCircle className={b("add-icon")} />
        <span>Add profit target {profits.length}/{MAX_PROFITS_COUNT}</span>
      </TextButton>
    );
  }
});

export { TakeProfit };
