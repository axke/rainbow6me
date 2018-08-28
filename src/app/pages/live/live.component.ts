import {Component, OnChanges, OnInit} from '@angular/core';
import {LiveTrackerService} from '../../shared/services/live-tracker.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateTrackerComponent} from './create-tracker/create-tracker.component';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit, OnChanges {
  trackers: any[];
  plusIcon = faPlus;
  public isCollapsed = true;

  constructor(private liveTrackerService: LiveTrackerService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    // find all tracked sessions
    this.trackers = this.liveTrackerService.findAllTrackerDetails();
    if (this.trackers) {
      this.sortBy('name');
    }
    console.log(this.trackers);
  }

  ngOnChanges() {
  }

  sortBy(prop: string, reverse: number = -1) {
    this.trackers = this.trackers.sort((a, b) => {
      if (a[prop] > b[prop]) {
        return -1 * reverse;
      } else if (a[prop] < b[prop]) {
        return 1 * reverse;
      } else {
        return 0;
      }
    });
  }

  createTrackerDetails() {
    const modalRef = this.modalService.open(CreateTrackerComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.result.then(() => {
      this.trackers = this.liveTrackerService.findAllTrackerDetails();
      this.sortBy('name');
    });
    // this.liveTrackerService.createTrackerDetails({timestamp: new Date(), name: 'My Cool Tracker', lastUpdate: new Date()});
  }

  findTrackerDetails() {
    this.trackers = this.liveTrackerService.findAllTrackerDetails();
    this.sortBy('name');
  }

  deleteTracker(id: string) {
    console.log('delete', id);
    this.liveTrackerService.deleteTrackerDetails(this.liveTrackerService.findTrackerDetails(id));
    this.liveTrackerService.deleteTracker(this.liveTrackerService.findTracker(id));
    this.trackers = this.liveTrackerService.findAllTrackerDetails();
    this.sortBy('name');
  }

}
