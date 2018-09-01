import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  @Input() queueName: string;
  @Input() queue: any;
  constructor() { }

  ngOnInit() {
  }

}
