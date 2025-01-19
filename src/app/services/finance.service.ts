import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private storageKey = 'spendly-data'
  private transactions: any[] = [];
  private myMoney: number = 0;

  constructor() { this.loadData(); }

  private loadData(){
    const savedData = localStorage.getItem(this.storageKey);
    if (savedData){
      const parsedData = JSON.parse(savedData);
      this.transactions = parsedData.transactions || [];
      this.myMoney = parsedData.myMoney || 0;
    }
  }

  private saveData(){
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        transactions: this.transactions,
        myMoney: this.myMoney,
    })
  );
  }

  //update myMoney
}
