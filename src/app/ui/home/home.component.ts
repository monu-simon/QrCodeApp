import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CorrectonLevel, CorrectonLevels } from 'src/app/models/correction';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url: string = 'https://www.google.com';
  userId!: string;
  darkColor: any;
  lightColor: any;
  margin!: number;
  correctionLevels!: CorrectonLevel[]
  errorLevel: any = 'H';
  constructor(
    private angularFireStore: AngularFirestore,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(res => {
      if (res) {
        this.userId = res.uid;
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
    //const qrcode = this.angularFireStore.collection('qrcode').valueChanges({ idField: 'id' })
    this.angularFireStore.firestore.runTransaction(() => {
      const promise = Promise.all([
        //this.angularFireStore.collection('qrcode').add({ asdf: 'asdf' }), --> This generates an automatic id. If we specify doc . set then we can set the id instead of automatically setting it.
        this.angularFireStore.collection('qrcode').doc(this.userId).set({ imageData: imageId, data: this.url })
      ])
      return promise
    })
    //console.log(qrcode.subscribe(res => console.log(res)))
  }

}
