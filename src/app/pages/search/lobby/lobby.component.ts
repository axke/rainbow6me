import {Component, OnInit} from '@angular/core';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  async onFileChanged(event) {
    const file = event.target.files[0];

    Tesseract.recognize(file, {lang: 'eng'})
      .then(function (result) {
        console.log(result);
      });


  }

}
