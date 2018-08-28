import {Component, OnInit} from '@angular/core';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  notFound = false;
  goIcon = faChevronRight;
  showSearch: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((val: NavigationEnd) => {
      // see also
      if (val && val.url && (val.url.indexOf('/player') > -1 || val.url.indexOf('/live') > -1)) {
        this.showSearch = true;
      } else {
        this.showSearch = false;
      }
    });
  }

  search(name) {

  }
}
