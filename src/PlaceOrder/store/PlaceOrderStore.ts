import { observable, computed, action } from "mobx";

import { OrderSide } from "../model";
import { Profit } from "./Profit";
import { MAX_PROFITS_COUNT } from "../constants";

export class PlaceOrderStore {
  @observable activeOrderSide: OrderSide = "buy";
  @observable price: number = 0;
  @observable amount: number = 0;
  @observable profits: Profit[] = [new Profit(100, 2, 20), new Profit(100, 4, 20)];

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

    this.profits.push(new Profit(100, 2, 20));
  }
}
