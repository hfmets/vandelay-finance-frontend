import { Component, OnInit } from '@angular/core';
import { Delor } from '../delor.model';
import { state, style, transition, animate, trigger } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-delor',
  templateUrl: './delor.component.html',
  styleUrls: ['./delor.component.css'],
  animations: [
      trigger('enlarge', [
         state('start', style({
            opacity: 0
         })),
         state('end', style({
            opacity:1
         })),
         transition('start => end', [
            animate('1s')
         ]),
         transition('end => start', [
            animate('1s')
         ])
      ])
   ]
})
export class DelorComponent implements OnInit {
    delorResponseOg:Delor = {}

  ticker:string =""
  startDate:string = ""
  endDate:string=""
  investmentAmount = ""
  isEnlarge: boolean = false;
constructor(
    private auth: AuthService
  ) {}
  ngOnInit(): void {
  }
  onDelorInvestFormSubmit(){
    if(this.isEnlarge == false){
        this.isEnlarge = true
      }
    this.auth.getResultsDelor(this.ticker,this.startDate,this.endDate,this.investmentAmount).subscribe(payload =>{
      this.delorResponseOg =  payload
      if(this.delorResponseOg.endInvestmentValue == "NaN"){
        this.delorResponseOg.endInvestmentValue = "Invalid Dates, Holiday or Weekend Selected"
      }
      


    })
  }

}
