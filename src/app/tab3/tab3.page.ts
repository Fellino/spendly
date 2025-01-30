import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonSelect, IonItem, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { FinanceService } from '../services/finance.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { cash, fastFood, carSport, home, pricetags, helpCircle, refresh } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, CommonModule, IonIcon, IonLabel, IonSelect, IonItem],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab3Page {
  transactions: any[] = [];
  selectedCategory: string | null = null;

  constructor(private financeService: FinanceService) {
    addIcons({ cash, fastFood, carSport, home, pricetags, helpCircle, refresh });
  }

  ionViewWillEnter() {
    this.loadTransactions();
  }

  // transaction updating function with sorting (newest first)
  private loadTransactions() {
    this.transactions = this.financeService.getAllTransactions().sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }


  get filteredtransactions() {
    if (!this.selectedCategory) {
      return this.transactions;
    }
    return this.transactions.filter((transaction) => transaction.category === this.selectedCategory);
  }

  resetFilter(){
    this.selectedCategory = null;
  }
  deleteTransaction(transaction: any) {
    const index = this.transactions.findIndex((t) => t === transaction);
    if (index >= 0){
      this.financeService.deleteTransaction(index);
      this.loadTransactions();
    }
  }

  getIconName(category: string): string {
    const iconMap: { [key: string]: string } = {
      Salary: 'cash',
      Food: 'fast-food',
      Transport: 'car-sport',
      House: 'home',
      Other: 'pricetags',
    };
    return iconMap[category] || 'help-circle';
  }
}
