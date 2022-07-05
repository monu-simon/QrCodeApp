import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CorrectonLevel, CorrectonLevels } from 'src/app/models/correction';
import { QrData } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url: string = 'https://www.google.com';
  userId!: string;
  qRContent: QrData[] = [];
  userContent: QrData[] | any;
  darkColor: any;
  lightColor: any;
  margin!: number;
  correctionLevels!: CorrectonLevel[]
  errorLevel: any = 'H';
  downloadButtonLabel: string = 'Download';
  constructor(
    private angularFireStore: AngularFirestore,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(res => {
      if (res) {
        this.userId = res.uid;
        this.downloadButtonLabel = 'Save & Download';
        const qrcode = this.angularFireStore.collection('qrcode').doc(this.userId).valueChanges()
        qrcode.subscribe(res => {
          this.userContent = res;
        })
      }
    })
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
    if (this.userId) {
      this.setDataToDatabase(image);
    }
  }

  setDataToDatabase(imageId: string) {
    if (this.userContent && !this.userContent.content) {
      this.userContent.content = [];
      this.userContent.content.push({ data: this.url, imageData: imageId })
    } else if (!this.userContent) {
      this.userContent = []
      this.userContent.content = [];
      this.userContent.content.push({ data: this.url, imageData: imageId })
    } else {
      this.userContent.content.push({ data: this.url, imageData: imageId })

    }
    this.angularFireStore.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.angularFireStore.collection('qrcode').doc(this.userId).set({ content: this.userContent.content })
      ])
      return promise
    })
  }

}
