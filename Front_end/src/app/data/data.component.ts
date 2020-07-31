import { Component, OnInit } from '@angular/core';
import { StudService } from '../stud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {

  imageUrl:string = "http://localhost:4000/img/";
  public student:any = [];
  constructor(private studservice:StudService,private route:Router) { }

  ngOnInit(): void {
      this.studservice.getLastData().subscribe((data )=>{
        this.student[0]= data;
      } );
  }
  onLogin(){
    this.route.navigateByUrl('/Login');
  }
}
