import { observable, computed, action } from "mobx";

export class Profit {
  @observable price: number = 0;
  @observable profit: number = 0;
  @observable amount: number = 0;

  @computed get targetPrice(): number {
    return this.profit * this.price;
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
    this.profit =  ((targetPrice - this.price) / this.price) * 100;
  }
}
