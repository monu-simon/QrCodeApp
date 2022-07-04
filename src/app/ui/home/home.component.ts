import { Component, OnInit } from '@angular/core';
import { CorrectonLevel, CorrectonLevels } from 'src/app/models/correction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url: string = 'https://www.google.com';

  correctionLevels!: CorrectonLevel[]
  errorLevel: any = 'H';
  constructor() { }

  ngOnInit(): void {
    this.correctionLevels = [
      {
        title: 'LOW',
        key: CorrectonLevels.LOW
      },
      {
        title: 'MEDIUM',
        key: CorrectonLevels.MEDIUM
      },
      {
        title: 'Quartile',
        key: CorrectonLevels.QUARTILE
      },
      {
        title: 'HIGH',
        key: CorrectonLevels.HIGH
      }
    ]
  }

  download() {
    const canvas = document.getElementsByTagName('canvas')[0];
    const image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "my-qrcode.png";
    link.href = image;
    link.click();
  }

}
