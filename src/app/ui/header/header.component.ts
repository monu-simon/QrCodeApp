import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName$!: Observable<string>;

  constructor(
    private userService: UserService
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
  }

}
