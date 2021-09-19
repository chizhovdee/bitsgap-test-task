import { observable, computed, action } from "mobx";
import last from "lodash/last";
import { OrderSide } from "../model";
import { Profit } from "./Profit";
import { MAX_PROFITS_COUNT, DEFAULT_PROFIT_AMOUNT_PROP } from "../constants";

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

  @action.bound
  public setOrderSide(side: OrderSide) {
    this.activeOrderSide = side;
  }

  @action.bound
  public setPrice(price: number) {
    this.price = price;
  }

  @action.bound
  public setAmount(amount: number) {
    this.amount = amount;
  }

  @action.bound
  public setTotal(total: number) {
    this.amount = this.price > 0 ? total / this.price : 0;
  }

  @action.bound
  public addProfit() {
    if (this.isReachedMaxProfitsCount) return;
    const lastProfit = last(this.profits);
    this.profits.push(
      new Profit(this.price, (lastProfit?.profit ?? 0) + 2, DEFAULT_PROFIT_AMOUNT_PROP)
    );
  }
}
