import { Component, OnInit } from '@angular/core';
import {LiveTrackerService} from '../../shared/services/live-tracker.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateTrackerComponent} from './create-tracker/create-tracker.component';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  trackers: any[];
  plusIcon = faPlus;
  public isCollapsed = true;

  constructor(
    private liveTrackerService: LiveTrackerService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // find all tracked sessions
    this.trackers = this.liveTrackerService.findAllTrackerDetails();
    console.log(this.trackers);
  }

  createTrackerDetails() {
    const modalRef = this.modalService.open(CreateTrackerComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.result.then(() => { this.trackers = this.liveTrackerService.findAllTrackerDetails(); });
    // this.liveTrackerService.createTrackerDetails({timestamp: new Date(), name: 'My Cool Tracker', lastUpdate: new Date()});
  }

  findTrackerDetails() {
    this.trackers = this.liveTrackerService.findAllTrackerDetails();
    console.log(this.trackers);
  }

}
