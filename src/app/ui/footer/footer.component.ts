import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  //273036
  ngOnInit(): void {
  }

  onClick(linkedin: boolean) {
    if(linkedin) {
      document.location.href='https://www.linkedin.com/in/monusimonm';
    } else {
      document.location.href='https://github.com/monu-simon';
    }
  }

}
