import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: any;
  constructor() { 
    this.comments = [
      {children: [1,2]},
      {children: [2]},
      {children: [1,2,3,4]},
      {children: [1]},
    ];    
  }

  ngOnInit() {
  }

}
