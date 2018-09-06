import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-balls-display',
  templateUrl: './balls-display.component.html',
  styleUrls: ['./balls-display.component.css']
})
export class BallsDisplayComponent implements OnInit, OnChanges {

  @Input() balls: any[];
  ballsHandler: any[];
  @Output() saveList = new EventEmitter();
  @Output() cancelList = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.renderArrayBalls();
  }

  ngOnChanges() {
    console.log('teste')
    this.renderArrayBalls();
  }

  renderArrayBalls() {
    if (typeof this.balls === 'string') {
      this.balls = JSON.parse(this.balls);
    }
    const arrayAux = [];
    let status;
    for (let index = 1; index <= 100; index++) {
      if (this.balls) {
        status = (this.balls.indexOf(index) > -1) ? true : false;
      } else {
        status = false;
      }
      const element = {
        id: index,
        active: status
      };
      arrayAux.push(element);
    }
    this.ballsHandler = arrayAux;
  }

  toggleStatus(index) {
    this.ballsHandler[index].active = !this.ballsHandler[index].active;
  }

  confirmList() {
    const returnList = [];
    this.ballsHandler.forEach((element) => {
      if (element.active) {
        returnList.push(element.id);
      }
    });
    this.saveList.emit(returnList);
  }

  cancelEvent() {
    this.cancelList.emit(true);
  }



}

