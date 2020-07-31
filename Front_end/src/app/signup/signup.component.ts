import { Component, OnInit } from '@angular/core';
import {stud}from '../share/stud';
import {StudService} from '../stud.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  
  constructor(private studservice : StudService, private router:Router,private aRouter:ActivatedRoute) {
  }

  studmodel = new stud();
  id = "";
  objectId; 
  btnDisable:boolean;
  selectedFile:File = null;
  isEqual:boolean = false;
  isNull:boolean = false; 
  
  ngOnInit(): void {
    this.aRouter.params.subscribe(params =>{
      this.id = params['id'];
    });

    if(this.id){
      this.btnDisable = false;
      this.studservice.getImage(this.id).subscribe(data =>this.selectedFile = data);
      this.studservice.getLinkData(this.id).subscribe(data =>this.studmodel = data[0]);       
    }else{
      this.btnDisable = true;
    }
  }
  
  onFileSelected(event){
    this.selectedFile =event.target.files[0]; 
    this.studmodel.file = this.selectedFile;
  }
  
  onSubmit(){
    if(this.studmodel.name == null || this.studmodel.email == null || this.studmodel.password == null || this.studmodel.r_password == null || this.studmodel.enrollnment_no == null || this.studmodel.file == null){
        this.isNull = true;
    }else if(this.studmodel.password != this.studmodel.r_password){
      this.isEqual = true;
    }
    else{
      this.studservice.savestud(this.studmodel).subscribe((err,data)=>{
        if(err){
          console.log(err);
        }else{
          console.log(data);
          localStorage.setItem('token',data.token);
        }
      });
      this.router.navigate(['/Data']);
    }
  }

  onUpdate(){
    this.studservice.updateData(this.studmodel).subscribe(error => console.log("error", error));
    this.router.navigate(['/Student']);
  }
}
 