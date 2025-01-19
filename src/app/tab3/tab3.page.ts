import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { FinanceService } from '../services/finance.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab3Page {
  transactions: any[] = [];
  constructor(private financeService: FinanceService) {}

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
}
