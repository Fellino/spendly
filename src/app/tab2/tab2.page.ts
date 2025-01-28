import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonLabel,
  IonItem,
  IonSelect,
  IonButton,
  IonInput
} from '@ionic/angular/standalone';
import { FinanceService } from '../services/finance.service';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonSelect, IonButton, IonInput, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2Page {
  transaction = {
    category:'',
    name: '',
    value:0,
    date: new Date().toISOString().split('T')[0],
  };
  
  constructor(private financeService: FinanceService, private navCtrl: NavController) {}

  addTransaction(){
    if (this.transaction.value <= 0 || this.transaction.category === '' || isNaN(this.transaction.value) || this.transaction.name.trim() === ''){
      alert('All fields are required and the value should be greater than 0.');
      return;
    }
    this.financeService.addTransaction(this.transaction);
    alert('Transaction added successfully!');
    this.resetForm();
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  private resetForm(){
    this.transaction = {
      category: '',
      name: '',
      value: 0,
      date: new Date().toISOString().split('T')[0],
    };
  }


}