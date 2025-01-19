import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonInput, 
  IonLabel 
} from '@ionic/angular/standalone';
import { FinanceService } from '../services/finance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, 
    IonButtons, IonInput, IonLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page implements OnInit {
  myMoney: number = 0;
  dailySpend: number = 0;
  monthlySpend: number = 0;
  recentTransactions: any[] = [];


  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.myMoney = this.financeService.getMoney();
    this.dailySpend = this.financeService.getTotalSpent('daily');
    this.monthlySpend = this.financeService.getTotalSpent('monthly');
    this.recentTransactions = this.financeService.getAllTransactions().slice(-5);
  }

  saveIncome(){
    if (this.incomeInput > 0) {
      this.myMoney = this.incomeInput;
      localStorage.setItem('myMoney', this.myMoney.toString());
      this.incomeInput = 0;
    } else {
      alert('Please enter a valid income.');
    }
  }
}
