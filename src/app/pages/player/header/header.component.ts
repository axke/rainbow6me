import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSync, faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() player: any;
  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();
  faSync = faSync;
  faSearch = faSearch;
  constructor() { }

  ngOnInit() {
  }

  refreshPlayer() {
    this.refresh.emit(true);
  }

}
