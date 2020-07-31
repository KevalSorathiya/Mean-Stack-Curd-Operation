import { Component, OnInit } from '@angular/core';
import { StudService } from '../stud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbarOpen = true;
  stud;
  constructor(public _stud:StudService) { }

  ngOnInit(): void {
    this.stud = this._stud;
  }
  toggleNavbar(){
    this.navbarOpen = false;
  }

}
