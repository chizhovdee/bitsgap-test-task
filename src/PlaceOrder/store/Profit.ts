import { observable, computed, action } from "mobx";
import { OrderSide } from "../model";

export class Profit {
  id: number = Math.random();
  @observable private orderPrice: number = 0;
  @observable private orderAmount: number = 0;
  @observable profit: number = 0;
  @observable amount: number = 0;

  @computed get targetPrice(): number {
    return this.profit / 100 * this.orderPrice + this.orderPrice;
  }

  @computed get absoluteAmount () : number {
    return this.orderAmount * this.amount / 100;
  }

  @action
  public setOrderPrice(orderPrice: number) {
    this.orderPrice = orderPrice;
  }

  @action
  public setOrderAmount(orderAmount: number) {
    this.orderAmount = orderAmount;
  }

  @action.bound
  public setProfit(profit: number) {
    this.profit = profit;
  }

  @action.bound
  public setTargetPrice(targetPrice: number) {
    this.profit = this.orderPrice > 0
      ? ((targetPrice - this.orderPrice) / this.orderPrice) * 100
      : 0;
  }

  @action.bound
  public setAmount(amount: number) {
    this.amount = amount;
  }

  public calcProjectedProfit(orderSide: OrderSide) {
    return orderSide === "buy"
      ? this.absoluteAmount * (this.targetPrice - this.orderPrice)
      : this.absoluteAmount * (this.orderPrice - this.targetPrice);
  }
}
