import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  users: any[];
  name: string;
  sub: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name'];
      this.apiService.getUserByName(this.name).subscribe(
        (users) => {
          this.users = users;
        },
        error => console.error('ERROR:', error)
      );
    });
  }

  search(value: string) {
    this.router.navigate(['/search', value]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
