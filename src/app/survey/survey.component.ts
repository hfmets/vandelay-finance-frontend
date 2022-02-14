import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Survey from "survey-angular";
import "survey-angular/modern.css";

Survey.StylesManager.applyTheme("modern");

var surveyJSON = {"title":"Investment Tool",
"description":"This tool will gather info from the user to give them an investment suggestion",
"pages":[
  {"name":"page1",
  "elements":[
    {"type":"radiogroup",
    "name":"initial_investment",
    "title":"How much money are you willing and able to invest upfront?",
    "isRequired":true,
    "choices":[
      {"value":"100","text":"$100 or less"},
      {"value":"100+","text":"More than $100 but less than $5000"},
      {"value":"5000","text":"More than $5,000 but less than $100,000"},
      {"value":"100k","text":"$100,000 or more"}
    ]}]},
    {"name":"page2",
    "elements":[
      {"type":"radiogroup",
      "name":"monthly_contribution",
      "title":"Are you planning to contribute to the investment monthly?",
      "isRequired":true,
      "choices":[
        {"value":"yes","text":"Yes"},
        {"value":"no","text":"No"},
        {"value":"maybe","text":"Possibly, if I have extra money to invest"}
      ]}]},
      {"name":"page3",
      "elements":[
        {"type":"boolean",
        "name":"accessibility",
        "title":"Do you need to be able to easily access your money once it is invested?",
        "isRequired":true}
      ]},
      {"name":"page4",
      "elements":[
        {"type":"boolean",
        "name":"will_not_touch",
        "title":"Can you keep your investment untouched for a specified period, possibly for years?",
        "isRequired":true}
      ]},
      {"name":"page5",
      "elements":[
        {"type":"checkbox",
        "name":"current_portfolio",
        "title":"Are you already investing any money? If so, check all in which you have money invested.",
        "isRequired":true,
        "choices":[
          {"value":"stock","text":"Stocks"},
          {"value":"etf","text":"Exchange-Traded Funds (ETFs)"},
          {"value":"property","text":"Real Estate"},
          {"value":"reit","text":"Real Estate Investment Trusts (REITs)"},
          {"value":"commodity","text":"Commodities (Gold, Crude Oil, etc.)"},
          {"value":"mutual","text":"Mutual Funds"},
          {"value":"cd","text":"Certificates of Deposit (CDs)"},
          {"value":"bond","text":"Bonds"},
          {"value":"business","text":"Business (owner, franchisee, investor, etc.)"},
          {"value":"mm","text":"Money Market Funds"},
          {"value":"index","text":"Index Funds"},
          {"value":"crypto","text":"Cryptocurrencies (Bitcoin, Ethereum, Litecoin, etc.)"},
          {"value":"retire","text":"Retirment Plans (401k, 403b, Individual Retirment Account [IRA], Thrift Savings Plan [TSP], etc.)"},
          {"value":"forex","text":"Foreign Currencies (Japanese Yen, Swiss Franc, Singapore Dollar, etc.)"},
          {"value":"collect","text":"Collectibles (Stamps, Art, Limited Edition Toys, etc.)"}
        ],
        "hasOther":true,
        "hasNone":true,
        "otherText":"Other",
        "hasSelectAll":true}
      ]},
      {"name":"page6",
      "elements":[
        {"type":"radiogroup",
        "name":"investment_goal",
        "title":"Do you have a goal in mind with your investment?",
        "isRequired":true,
        "choices":[
          {"value":"long","text":"Yes, I am looking for a long-term investment for retirement (or something similar)"},
          {"value":"short","text":"Yes, I am looking for a short-term investment to save money (e.g., down payment, vacation, emergency savings, etc.)"},
          {"value":"none","text":"No, I do not have a goal for my investment."}
        ]}]},
        {"name":"page7",
        "elements":[
          {"type":"radiogroup",
          "name":"potential_return",
          "title":"How much of a return are you looking for from your investment? (Keep in mind that returns are not guaranteed, but there are some investment choices that are capable of returning more than others.)",
          "isRequired":true,
          "choices":[
            {"value":"high","text":"Significant -- I would like to use my investment for income."},
            {"value":"medium","text":"Moderate -- a decent return would be nice."},
            {"value":"low","text":"Slight -- I am basically looking for somewhere to put my money that is better than a savings account."}
          ]}]},
          {"name":"page8",
          "elements":[
            {"type":"radiogroup",
            "name":"risky_with_money",
            "title":"When gambling, how high is your wager? (If you do not gamble based on religious/moral reasons, think of another scenario that involves risks [e.g., driving style] to determine which answer closely reflects your risk tolerance.)",
            "isRequired":true,
            "choices":[
              {"value":"high","text":"I am all about high stakes. I get a thrill out of losing it all and possibly winning even more."},
              {"value":"low","text":"I play it safe and stick to low/moderate wagers. I am not comfortable with possibly losing a lot of money."},
              {"value":"none","text":"You will not find me gambling. I do not like the idea of losing any money at all."},
            ]}]},
            {"name":"page9",
            "elements":[
              {"type":"checkbox",
              "name":"personal_interests",
              "title":"Are you interested in any of these topics, and do you find yourself learning/reading about them regularly (via news or research)? Select all that apply.",
              "isRequired":true,
              "choices":[
                {"value":"business","text":"Business"},
                {"value":"finance","text":"Finance"},
                {"value":"econ","text":"Economics"},
                {"value":"tech","text":"Technology"},
                {"value":"pop","text":"Popular Culture/Celebrities"},
                {"value":"entertainment","text":"Arts & Media (to include film, television, music)"},
                {"value":"fashion","text":"Fashion"},
                {"value":"food","text":"Food"},
                {"value":"world","text":"World/Global"},
                {"value":"environment","text":"Environment"},
                {"value":"science","text":"Science"},
                {"value":"transport","text":"Transportation (to include automotive, air travel, etc.)"},
                {"value":"health","text":"Health (to include medicine, fitness, etc.)"},
                {"value":"sports","text":"Sports"}],
                "hasOther":true,
                "hasNone":true,
                "otherText":"Other",
                "hasSelectAll":true}
              ]},
              {"name":"page10",
              "elements":[
                {"type":"radiogroup",
                "name":"projects",
                "title":"Do you like to take on personal projects that may require a significant amount of time invested?",
                "isRequired":true,
                "choices":[
                  {"value":"high","text":"Yes, I enjoy personal projects and working to complete something"},
                  {"value":"medium","text":"I have to be in the mood for a project, but if I do take something on, I give it my all."},
                  {"value":"low","text":"I like starting projects but have a difficult time finishing them."},
                  {"value":"no","text":"I do not really take on many personal projects."}
                ]}]},
                {"name":"page11",
                "elements":[
                  {"type":"radiogroup",
                  "name":"volatility_tolerance",
                  "title":"How well do you handle change?",
                  "isRequired":true,
                  "choices":[
                    {"value":"high","text":"I am a very adaptable person and/or prefer change."},
                    {"value":"medium","text":"I do not mind change as long as it is not too drastic."},
                    {"value":"low","text":"I like things to remain relatively the same; I appreciate consistency."}
                  ]}]}],
                  "showTitle":false,
                  "showPageTitles":false,
                  "showCompletedPage": false,
                  "showProgressBar":"bottom",
                  "progressBarType":"questions",
                  "storeOthersAsComment":false,
                  "showPreviewBeforeComplete":"showAllQuestions"
                }

const investmentChoices = [
  {"type": "stock",
  "risk": "low",
  "return": "medium",
  "monthly": "no",
  "start": "100",
  "access": true,
  "length":"any",
  "project": "no",
  "change": "high",},
  {"type": "cd",
  "risk": "none",
  "return": "low",
  "monthly": "no",
  "start": "100+",
  "access": false,
  "length": "any",
  "project": "no",
  "change": "low",},
  {"type": "real estate",
  "risk": "high",
  "return": "moderate",
  "monthly": "yes",
  "start": "100k",
  "access": false,
  "length": "long",
  "project": "high",
  "change": "medium",}
]

const investmentDescriptions = [];

function sendDataToServer(this: any, survey:any) {
    //send Ajax request to your web server.
    //let answers = JSON.stringify(survey.data);
    let same = 0;
    let recommended = "";

      for (let i = 0; i < investmentChoices.length; i ++) {
        let currentSame = 0;
          if (investmentChoices[i]["risk"] == survey.data.risky_with_money){
              currentSame ++;
          }
          if (investmentChoices[i]["return"] == survey.data.potential_return){ 
              currentSame ++;
          }
          if (investmentChoices[i]["monthly"] == survey.data.monthly_contribution){ 
              currentSame ++;
          }
          if (investmentChoices[i]["start"] == survey.data.initial_investment){
              currentSame ++;
          }
          if (investmentChoices[i]["access"] == survey.data.accessibility){
            currentSame ++;
          }
          if (investmentChoices[i]["length"] == survey.data.investment_goal || investmentChoices[i]["length"] == "any"){
            currentSame ++;
          }
          if (investmentChoices[i]["project"] == survey.data.projects){
            currentSame ++;
          }
          if (investmentChoices[i]["change"] == survey.data.volatility_tolerance){
            currentSame ++;
          }
          if (currentSame > same) {
              same = currentSame;
              recommended = investmentChoices[i]["type"];
          }
        }

      alert(`The recommended investment choice for you is ${recommended}.`)
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: "app-survey",
    template: `<div class="survey-container contentcontainer codecontainer"
    style="background-color: white; background-image: url('https://i.ibb.co/F5Ftb21/Illustration-of-a-small-plant-developing-into-a-money-tree.jpg'); background-repeat: no-repeat; 
    background-position: right bottom; width: 50vw; background-size: 400px; margin-left: 400px; margin-top: 100px; border-style: solid; border-radius: 10px; border-width: 2px; border-color: black">
    <div id="surveyElement"></div>
  </div>`
})

export class SurveyComponent implements OnInit {
    @Output() submitSurvey = new EventEmitter<any>();
    @Input()
    result: any;

    constructor (private router: Router){}
    
    ngOnInit() {
        
      var survey = new Survey.Model(surveyJSON);
      survey.onComplete.add(sendDataToServer);
      Survey.SurveyNG.render("surveyElement", { model: survey });
    }
}
