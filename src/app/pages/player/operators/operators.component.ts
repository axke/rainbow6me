import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {
  @Input() operators: any;
  @Input() operatorsArray: any[];
  filter: string;

  constructor() {
  }

  ngOnInit() {
    console.log('ops', this.operators);
    Object.getOwnPropertyNames(this.operators).forEach((name) => {
      this.operators[name].kdRatio = ((this.operators[name].kills || 0) / (this.operators[name].deaths || 1));

    });
    this.operatorsArray = Object.values(this.operators);
    this.sortBy('timePlayed');
    console.log('oa', this.operatorsArray);
  }

  sortBy(prop: string) {
    this.operatorsArray = this.operatorsArray.sort((a, b) => {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  filterList(name: any) {
    this.filter = name;
  }

}
