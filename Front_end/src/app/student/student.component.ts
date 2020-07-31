import { Component, OnInit } from '@angular/core';
import {StudService} from '../stud.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
  student;
  stud = [];
  term = "";
  imageUrl = null;
  
  constructor(private studservice:StudService,private route:Router) {  
  }

  ngOnInit(): void {
    this.imageUrl = "http://localhost:4000/img/";
   
    this.studservice.getData().subscribe( data => data.forEach(element => {
      this.stud = element;
    })
    ,err => {
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          this.route.navigate(['/Login']);
        }
      }
    }); 
  }
  
  Share(s){
    alert("Student name is: "+s.name);
  }

  deleteData(id:any,stud){
    this.studservice.deletePhoto(stud).subscribe(data =>console.log("success", data), error => console.log("error", error));
    this.studservice.deleteData(id).subscribe(data => console.log("success", data), error => console.log("error", error));   
    this.ngOnInit();
  }

  updateData(id:any){
    this.route.navigate(['/Signup',id]);
  }
}

