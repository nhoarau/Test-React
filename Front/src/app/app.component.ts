import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-malou-front';
  listProducts : any;
  isConnected: boolean;
  date: string = '';
  isVisible: boolean;

  constructor(private service: AppServiceService) {
    this.isConnected = false;
    this.isVisible = false;
  }

  async ngOnInit() {
    try {
      await this.checkConnection();
    } catch (error) {
      console.error(error);
    }
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.isVisible = false;
    this.date = new Date(`${event.value}`).toISOString();
  }

  getDataFromApi() {
    this.service.getData().subscribe((response: any) => {
      console.log("response" + response);
      window.location.href = response;
    }, (error: any) => {
      console.log("ERROR")
      console.log(error);
    })
  }

  async checkConnection() {
    this.service.checkConnection().subscribe((response: any) => {
      this.isConnected = response;
      if(this.isConnected)
      {
        this.date = new Date().toISOString();
        this.getProducts();
      }
    }, (error: any) => {
      console.log("ERROR")
      console.log(error);
    })
  }

  getProducts() {
    if(this.date != '')
    {
      this.listProducts = [];
      this.service.getProducts(this.date).subscribe((response) => {
        var obj = JSON.parse(JSON.stringify(response)).data.posts;
        this.listProducts = [];
        let arr = []
        for(var i in obj)
          arr.push(obj[i]);
        this.listProducts = arr[0];
      }, (error: any) => {
        console.log("ERROR")
        console.log(error);
      })
    } else {
      this.isVisible = true;
    }
  }


}
