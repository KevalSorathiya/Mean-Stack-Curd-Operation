import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import { StudService } from './stud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private stud:StudService,private router:Router){

  }
  canActivate():boolean{
    if(this.stud.loggedIn()){
      return true;
    }else{
      this.router.navigate(['/Login']);
      return false;
    }
  }  
}
