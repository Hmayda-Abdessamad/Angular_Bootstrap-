import { Injectable } from '@angular/core';
import {AppUser} from "../models/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users!:AppUser[]
  authenticatedUser:AppUser|undefined

  constructor( ) {
    if (!this.users) {
      this.users = [
        { id: UUID.UUID(), username: "admin1", password: "1234", role: ["ADMIN", "USER"] },
        { id: UUID.UUID(), username: "user1", password: "1234", role: ["USER"] },
        { id: UUID.UUID(), username: "user2", password: "1234", role: ["USER"] }
      ];
    }
  }

  public login(email:string,password:string):Observable<AppUser>{
    let appUser=this.users.find(u => u.username===email);
    if(!appUser) {
      return throwError(()=>new Error("user not found"))
    }
    if (appUser.password!=password) {
      return throwError(()=>new Error("mdp incorrect"))
    }
    return of(appUser);
  }

  public authenticatUser(appUser:AppUser):Observable<Boolean>{
      this.authenticatedUser=appUser;
      localStorage.setItem("authUser",JSON.stringify({username:appUser.username,roles:appUser.role,jwt:"JWT_TOKEN"}))
      return of(true)
  }

  public hasrole(role:string):boolean{
   return  this.authenticatedUser!.role.includes(role)
}
  public isAuthenticated(){
return this.authenticatedUser!=undefined
}
  public logout():Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser")
    return of(true)
}


}
