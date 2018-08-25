import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  @Input() operator: any;
  constructor() { }

  ngOnInit() {
    switch (this.operator.name.toLowerCase().trim()) {
      case 'capitão':
        this.operator.strippedName = 'capitao';
        break;
      case 'jäger':
        this.operator.strippedName = 'jager';
        break;
      case 'recruit1':
        this.operator.strippedName = 'recruitsas';
        // this.operator.name = 'FBI Recruit'
        break;
      case 'recruit2':
        this.operator.strippedName = 'recruitsas';
        // this.operator.name = 'FBI Recruit'
        break;
      case 'recruit3':
        this.operator.strippedName = 'recruitsas';
        // this.operator.name = 'FBI Recruit'
        break;
      case 'recruit4':
        this.operator.strippedName = 'recruitsas';
        // this.operator.name = 'FBI Recruit'
        break;
      case 'recruit5':
        this.operator.strippedName = 'recruitsas';
        // this.operator.name = 'FBI Recruit'
        break;
      default:
        console.log(this.operator.name.toLowerCase());
        this.operator.strippedName = this.operator.name.toLowerCase();
    }
  }

}
