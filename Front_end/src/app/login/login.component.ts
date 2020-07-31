import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudService } from '../stud.service';
import { Login } from '../share/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginmodel = new Login(); 
  isNull:boolean = false;
  constructor(private stud:StudService,private router:Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    if(this.loginmodel.password == null || this.loginmodel.username == null){
      this.isNull = true; 
    }else{
      this.stud.Login(this.loginmodel).subscribe(data  =>{console.log("success",data),localStorage.setItem('token',data.token),this.router.navigate(['/Student'])},error => console.log("error",error));
    }
  }
}
