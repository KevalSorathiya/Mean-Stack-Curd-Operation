import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Istud } from './share/stud';
import {stud } from './share/stud';
import { Observable,BehaviorSubject}  from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class StudService {

  public Url:string = "";
 
  public BSubject = new BehaviorSubject(null);
  fd:FormData;
  constructor(private _http:HttpClient,private route:Router) { }
  
  

  savestud(stud:stud):any{   
    this.fd = new  FormData();
    this.fd.append('name',stud.name);
    this.fd.append('email',stud.email);
    this.fd.append('password',stud.password);
    this.fd.append('r_password',stud.r_password);
    this.fd.append('enrollnment_no',stud.enrollnment_no);
    this.fd.append('file',stud.file,stud.file.name);
     return this._http.post<any>(this.Url+"addstud",this.fd);
  }

  getData():Observable<Istud>{  
    let x = this._http.get<Istud>(this.Url+"getData");    
    this.BSubject.next(x);
    return this.BSubject;
  }

  deleteData(id:any){                                 
    return this._http.delete<any>(`${this.Url+"deleteData"}/${id}`);
  }

  getImage(id:any){                                 
    let x= this._http.get<any>(`${this.Url+"img"}/${id}`);
    this.BSubject.next(x);
    return this.BSubject;
  }
  
  deletePhoto(stud){ 
    return this._http.put<any>(this.Url+"deletePhoto",stud);
  }


  updateData(s:any){  
    this.fd = new  FormData();
    this.fd.append('name',s.name);
    this.fd.append('email',s.email);
    this.fd.append('password',s.password);
    this.fd.append('r_password',s.r_password);
    this.fd.append('enrollnment_no',s.enrollnment_no);
    this.fd.append('file',s.file,s.file.name);
    let x = this._http.put<any>(`${this.Url+"updateData"}/${s._id}`,this.fd); 
    this.BSubject.next(x);
    return this.BSubject;
  }
  
  Login(s:any):Observable<any>{
    return this._http.post<any>(this.Url+"login",s);
  }

  getLastData():Observable<stud>{                   
    return this._http.get<stud>(this.Url+"getLastData");
  }

  getLinkData(id):Observable<any>{  
    return this._http.get<any>(`${this.Url+"getLinkData"}/${id}`);
  }

  loggedIn(){                                        
    return !!localStorage.getItem('token');
  }

  getToken(){                                                                           
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/Login']);
  }
}
