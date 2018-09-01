import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LiveTrackerService} from '../../../shared/services/live-tracker.service';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'app-create-tracker',
  templateUrl: './create-tracker.component.html',
  styleUrls: ['./create-tracker.component.scss']
})
export class CreateTrackerComponent implements OnInit {
  @ViewChild('user') private elementRef: ElementRef;
  @Input() name;
  details: any = {
    name: '',
    players: []
  };
  players: any[] = [];
  notFound: boolean;

  constructor(public createTrackerModal: NgbActiveModal,
              private liveTrackerService: LiveTrackerService,
              private apiService: ApiService) {
  }

  ngOnInit() {
  }

  search(name: string) {
    this.apiService.getUserByName(name).subscribe(
      (users) => {
        if (users.length === 1) {
          this.details.players.push(users[0]);
          this.players.push(users[0]);
          this.notFound = false;
        } else {
          this.notFound = true;
        }
        this.elementRef.nativeElement.value = '';
      },
      error => {
        console.error('ERROR:', error);
        this.notFound = true;
      }
    );
  }

  createTrackerDetails() {
    this.liveTrackerService.createTrackerDetails(this.details);
    this.createTrackerModal.close();
  }

}
