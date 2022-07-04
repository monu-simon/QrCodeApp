import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const toggleButton = document.getElementsByClassName('toggle-button')[0];
    const navs = document.getElementsByClassName('navs')[0];

    toggleButton.addEventListener('click', () => {
      navs.classList.toggle('active')
    })
  }

}
