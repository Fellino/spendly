import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { FinanceService } from '../services/finance.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { cash, fastFood, carSport, home, pricetags, helpCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, CommonModule, IonIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab3Page {
  transactions: any[] = [];
  constructor(private financeService: FinanceService) {
    addIcons({ cash, fastFood, carSport, home, pricetags, helpCircle });
  }

  ionViewWillEnter(){
    this.loadTransactions();
  }

  private loadTransactions(){
    this.transactions = this.financeService.getAllTransactions();
  }

  deleteTransaction(index: number){
    this.financeService.deleteTransaction(index);
    alert('Transaction deleted!');
    this.loadTransactions();
  }

  getIconName(category: string): string {
    const iconMap: { [key: string]: string } = {
      salary: 'cash',
      food: 'fast-food',
      transport: 'car-sport',
      house: 'home',
      other: 'pricetags',
    };
    return iconMap[category] || 'help-circle';
  }
}
