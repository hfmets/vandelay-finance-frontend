import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-eztraderdashboard',
  templateUrl: './eztraderdashboard.component.html',
  styleUrls: ['./eztraderdashboard.component.css']
})
export class EztraderdashboardComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private responsive: BreakpointObserver
  ) {}
  cols = 2;
  rowHeight = '320px';
  tickerArray = ["TSLA","MSFT","AAPL","NIO","NFLX","AMZN","GOOG","AMC","GME"]
  ezTraderDashContent:any = [];
  payloadResponse:any= {ticker: "",
buy: true,
sell: false,
weak: true,
strong: false}
  mode: ProgressSpinnerMode = 'determinate';
  color:ThemePalette = "primary"
  value = 90
  action = ""
  strength = ""


  ngOnInit(): void {
    this.responsive
      .observe([
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.WebLandscape,
        Breakpoints.WebPortrait,
      ])
      .subscribe((result) => {
        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.TabletPortrait]) {
          this.cols = 1;
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.cols = 1;
        } else if (breakpoints[Breakpoints.TabletLandscape]) {
          this.cols = 2;
        } else if (breakpoints[Breakpoints.WebPortrait]) {
          this.cols = 2;
        } else if (breakpoints[Breakpoints.WebLandscape]) {
          this.cols = 2;
        } else {
          this.cols = 2;
        }
      });
    


    for(var i=0; i <4;i++){
      
      this.auth.getEZTrader(this.tickerArray[i]).subscribe((payload) =>{
        this.payloadResponse = payload
        console.log("Payload Response ",this.payloadResponse)
        if(this.payloadResponse.buy == false){
          this.action = "sell"
        }else{
          this.action = "buy"
        }
        if(this.payloadResponse.strong == true){
          this.strength = "strong"
        }else{
          this.strength ="weak"
        }
        if(this.payloadResponse.buy == true && this.payloadResponse.strong == true){
        this.color = "primary"
        this.value = Math.floor(Math.random() * (100 - 75) + 75)
      }else if(this.payloadResponse.buy == true && this.payloadResponse.strong == false){
        this.color = "primary"
        this.value = Math.floor(Math.random() * (75 - 52) + 52)
      }else if(this.payloadResponse.buy == false && this.payloadResponse.strong == true){
        this.color = "warn"
        this.value = Math.floor(Math.random() * (100 - 75) + 75)
      }else if(this.payloadResponse.buy == false && this.payloadResponse.strong == false){
        this.color = "warn"
        this.value = Math.floor(Math.random() * (75 - 52) + 52)
      }else{

      }
      this.ezTraderDashContent.push({"ticker":this.tickerArray[i],"action":this.action.toUpperCase(),"strength":this.strength.toUpperCase(),"color":this.color,
        "value":this.value,"index":i})

       
        

      })
      


       
        
    }
    
  console.log("c",this.ezTraderDashContent)
   // console.log(this.tickerArray[1])
  }
}

