import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    ApiService
  ]
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search(value: string) {
    this.router.navigate(['/search', value]);
  }
}
