import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';


import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  providers: [Calendar],
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];

  public timeFrame: string;
  public budget: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public items: Items,
    public alertCtrl: AlertController,
    private calendar: Calendar
  ) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Purchase made!',
      subTitle: 'Bro, stop wasting money!',
      buttons: ['OK']
    });
    alert.present();
  }

  /**
   * Create an event.
   */
  public createEvent(): void {
    console.log('budget!: ', this.budget)
    const startDate = new Date(2017,9,14,0,0,0,0);
    const endDate = new Date(2017,9,16,0,0,0,0);
    this.calendar.createEvent('testing title', 'location', 'notes go here', startDate, endDate)
      .then((msg) => {
         console.log(msg);
         this.showAlert();
        },
        (err) => {
          console.log(err);
          this.showAlert();
      });
  }

}
