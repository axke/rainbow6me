import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  @Input() generalStats: any;
  constructor() { }

  ngOnInit() {
  }

}
