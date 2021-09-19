import { observable, computed, action } from "mobx";

export class Profit {
  id: number = Math.random();
  @observable price: number = 0;
  @observable profit: number = 0;
  @observable amount: number = 0;

  constructor(price: number, profit: number, amount: number) {
    this.price = price;
    this.profit = profit;
    this.amount = amount;
  }

  @computed get targetPrice(): number {
    return this.profit / 100 * this.price + this.price;
  }

  @action
  public setPrice(price: number) {
    this.price = price;
  }

  @action.bound
  public setProfit(profit: number) {
    this.profit = profit;
  }

  @action.bound
  public setTargetPrice(targetPrice: number) {
    this.profit = ((targetPrice - this.price) / this.price) * 100;
  }

  @action.bound
  public setAmount(amount: number) {
    this.amount = amount;
  }
}
