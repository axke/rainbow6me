import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  @Input() operator: any;
  attackers = ['ash', 'twitch', 'dokkaebi', 'hibana',
    'glaz', 'iq', 'blitz', 'ting', 'zofia',
    'blackbeard', 'sledge', 'thatcher',
    'montagne', 'fuze', 'lion',
    'buck', 'capitao', 'thermite',
    'jackal', 'finka', 'maverick'];
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
        this.operator.strippedName = this.operator.name.toLowerCase();
    }
    this.operator.type = this.attackers.includes(this.operator.strippedName) ? 'Attack' : 'Defense';
  }

}
