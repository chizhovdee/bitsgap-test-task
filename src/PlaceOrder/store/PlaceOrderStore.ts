import { observable, computed, action } from "mobx";
import last from "lodash/last";
import sumBy from "lodash/sumBy";
import maxBy from "lodash/maxBy";
import { OrderSide } from "../model";
import { Profit } from "./Profit";
import { MAX_PROFITS_COUNT, DEFAULT_PROFIT_AMOUNT_PROP, DEFAULT_PROFIT_INCREMENT } from "../constants";

export class PlaceOrderStore {
  @observable activeOrderSide: OrderSide = "buy";
  @observable price: number = 0;
  @observable amount: number = 0;
  @observable profits: Profit[] = [];

  @computed get total(): number {
    return this.price * this.amount;
  }

  @computed get isReachedMaxProfitsCount(): boolean {
    return this.profits.length >= MAX_PROFITS_COUNT;
  }

  @computed get profitsAmountSum(): number {
    return sumBy(this.profits, "amount");
  }

  @computed get projectedProfit(): number {
    return sumBy(this.profits, (profit) => profit.calcProjectedProfit(this.activeOrderSide));
  }

  @action.bound
  public setOrderSide(side: OrderSide) {
    this.activeOrderSide = side;
  }

  @action.bound
  public setPrice(price: number) {
    this.price = price;
    this.profits.forEach((profit) => profit.setOrderPrice(this.price));
  }

  @action.bound
  public setAmount(amount: number) {
    this.amount = amount;
    this.profits.forEach((profit) => profit.setOrderAmount(this.amount));
  }

  @action.bound
  public setTotal(total: number) {
    this.amount = this.price > 0 ? total / this.price : 0;
  }

  @action.bound
  public addProfit() {
    if (this.isReachedMaxProfitsCount) return;

    const lastProfit = last(this.profits);
    const newProfit = new Profit();

    newProfit.setOrderPrice(this.price);
    newProfit.setOrderAmount(this.amount);
    newProfit.setProfit((lastProfit?.profit ?? 0) + DEFAULT_PROFIT_INCREMENT);
    newProfit.setAmount(lastProfit ? DEFAULT_PROFIT_AMOUNT_PROP : 100);

    this.profits.push(newProfit);

    this.checkAndFixProfitsAmount();
  }

  @action.bound
  public removeProfit(id: number) {
    const index = this.profits.findIndex((p) => p.id === id);
    if (index >= 0) this.profits.splice(index, 1);
  }

  @action.bound
  public removeAllProfits() {
    this.profits = [];
  }

  private checkAndFixProfitsAmount() {
    if (this.profitsAmountSum <= 100) return;
    const biggestProfit = maxBy(this.profits, "amount") as Profit;
    const extraAmount = this.profitsAmountSum - 100;
    biggestProfit.setAmount(biggestProfit.amount - extraAmount);
  }
}
