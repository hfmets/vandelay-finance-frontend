import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  constructor(private auth: AuthService) {}
    news:any = []


  ngOnInit(): void {
    this.auth.getNews().subscribe(payload =>{
      this.news =  payload
      this.news = this.news.data
      console.log(this.news)
      


    })
  }

}
