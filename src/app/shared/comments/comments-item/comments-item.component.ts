import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-comments-item',
  templateUrl: './comments-item.component.html',
  styleUrls: ['./comments-item.component.css']
})
export class CommentsItemComponent implements OnInit {

  @Input() comment: any;
  showRespostas: boolean;
  showBtnRespostas: boolean;
  constructor() {
    this.showRespostas = false;
    this.showRespostas = false;
  }

  ngOnInit() {
    if (this.comment.children.length > 0) {
      this.showRespostas = true;
    }
  }

}
