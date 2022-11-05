import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';
import {TranslateService} from '@ngx-translate/core'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName$!: Observable<string>;
  name!: any;

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const toggleButton = document.getElementsByClassName('toggle-button')[0];
    const navs = document.getElementsByClassName('navs')[0];

    toggleButton.addEventListener('click', () => {
      navs.classList.toggle('active')
    })
    this.userName$ = this.userService.getUserName();
  }

  logout() {
    this.userService.signOut();
    this.router.navigate(['home']);
    
  }

  selectLanguage(e:any) {
    console.log(e.target.value)
    let lan = e.target.value
    //this.translate.use(lan)
    this.stateService.setLanguage(lan);
   
  }

}
