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
  setMyMoney(value: number){
    this.myMoney = value;
    this.saveData();
  }

  getMyMoney(): number{
    return this.myMoney;
  }

  //add transaction
  addTransaction(transaction: {category: string; name: string; value: number; date: string}){
    console.log('Adding transaction:', transaction);
    if (transaction.category === 'salary'){
      console.log('Category is salary, adding value:', transaction.value);
      this.myMoney += transaction.value;
    } else {
      console.log('Category is not salary, subtracting value:', transaction.value);
      this.myMoney -= transaction.value;
    }
    this.transactions.push(transaction);
    this.saveData();
    console.log('Updated myMoney:', this.myMoney);
  }

  //get all transaction
  getAllTransactions(){
    return this.transactions;
  }

  //get spent value
  getTotalSpent(duration: 'daily' | 'monthly'): number{
    const now = new Date();
    let total = 0;

    if (duration === 'daily'){
      const today = now.toISOString().split('T')[0];
      total = this.transactions
        .filter(transaction => transaction.date === today && transaction.category !== 'salary')
        .reduce((sum, transaction) => sum + transaction.value, 0);
    } else if (duration === 'monthly'){
      const month = now.getMonth();
      const year = now.getFullYear();
      total = this.transactions
        .filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return transactionDate.getMonth() === month && transactionDate.getFullYear() === year && transaction.category !== 'salary';
        })
        .reduce((sum, transaction) => sum + transaction.value, 0);
    }
    return total;
  }

  //delete transaction
  deleteTransaction(index: number){
    if (index >= 0 && index < this.transactions.length){
      const transaction = this.transactions[index];
      if (transaction.category === 'salary'){
        this.myMoney -= transaction.value;
      } else {
        this.myMoney += transaction.value;
      }
      this.transactions.splice(index, 1);
      this.saveData();
    }
  }
}