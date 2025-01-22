import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonIcon,
} from '@ionic/angular/standalone';
import { FinanceService } from '../services/finance.service';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { fastFood, carSport, home, pricetags } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardContent, IonGrid, IonRow, IonContent, IonIcon,
     CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page implements OnInit {
  myMoney: number = 0;
  dailySpend: number = 0;
  monthlySpend: number = 0;
  foodSpend: number = 0;
  houseSpend: number = 0;
  transportSpend: number = 0;
  otherSpend: number = 0;
  recentTransactions: any[] = [];

  constructor(private financeService: FinanceService, private navCtrl: NavController) {
    addIcons({ fastFood, home, carSport, pricetags });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ionViewWillEnter(): void {
    this.loadData();
  }

  navigateToHistory(){
    this.navCtrl.navigateRoot('/tabs/tab3');
  }

  private loadData(): void {
    this.myMoney = this.financeService.getMyMoney();
    this.dailySpend = this.financeService.getTotalSpent('daily');
    this.monthlySpend = this.financeService.getTotalSpent('monthly');
    this.foodSpend = this.financeService.getTotalSpentByCategory('food');
    this.houseSpend = this.financeService.getTotalSpentByCategory('house');
    this.transportSpend = this.financeService.getTotalSpentByCategory('transport');
    this.otherSpend = this.financeService.getTotalSpentByCategory('other');
    this.recentTransactions = this.financeService.getAllTransactions().slice(-5);
  }
}