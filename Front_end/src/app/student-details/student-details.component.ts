import { Component, OnInit } from '@angular/core';
// import {StudentData} from '../share/student';
import { ActivatedRoute } from '@angular/router';
import { StudService} from '../stud.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student= [];
  id="";
  imageUrl:string = "http://localhost:4000/img/";
  constructor(private route:ActivatedRoute,private studservice:StudService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.id = params['id'];
    });
     this.studservice.getLinkData(this.id).subscribe(data => this.student= data); 
  }
}
