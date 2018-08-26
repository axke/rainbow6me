import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSync, faSearch, faChartLine} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() player: any;
  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();
  refreshIcon = faSync;
  searchIcon = faSearch;
  chartIcon = faChartLine
  constructor() { }

  ngOnInit() {
  }

  refreshPlayer() {
    this.refresh.emit(true);
  }

}
