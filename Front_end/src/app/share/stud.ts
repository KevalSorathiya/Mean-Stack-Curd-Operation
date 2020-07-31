export interface Istud{
    forEach(arg0: (element: any) => void): void;
    id:any;
    name:string;
    email:string;
    password:number;
    enrollnment_no:string;
    r_password:number;
    file:any;
}
export class stud {
    id:any;
    name:string;
    email:string;
    password:string;
    enrollnment_no:string;
    r_password:string;
    file:any;

    constructor(id?:string,name?:string,email?:string,password?:string,enrollnment_no?:string,r_password?:string,file?:any){
     this.id = id || null;
     this.name = name || null;
     this.email = email || null;
     this.password = password || null;
     this.enrollnment_no = enrollnment_no || null;
     this.r_password = r_password || null;
     this.file = file || null;
    }

}
