import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { QrData } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId!: string;
  userContent: QrData[] | any;
  w!: string;
  imageData: any;
  imageUrl!: any;
  constructor(
    private angularFireStore: AngularFirestore,
    private dom: DomSanitizer,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    
    this.userService.user$.subscribe(res => {
      if (res) {
        this.userId = res.uid;
        const qrcode = this.angularFireStore.collection('qrcode').doc(this.userId).valueChanges()
        qrcode.subscribe(res => {
          this.userContent = res;
          this.userContent.content.forEach((content:QrData) => {
            content.imageData = this.dom.bypassSecurityTrustResourceUrl(content.imageData);
          })
        })
      }
    })

  }

}
