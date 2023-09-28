import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  userFormgroup!:FormGroup;
  errorMsg!:any
  constructor(private fb:FormBuilder,private authService:AuthenticationService,private router:Router) {

  }
  ngOnInit(): void {
    this.userFormgroup=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")
    })
  }

  handleLogin() {
    let username=this.userFormgroup.value.username;
    let password=this.userFormgroup.value.password

    this.authService.login(username,password).subscribe({
      next:(data)=>{
        this.authService.authenticatUser(data).subscribe({
          next:(data)=>{
            this.router.navigateByUrl("/admin")
          }
        })
      },
      error:(err)=>{

        this.errorMsg=err;
      }
    })
  }
}
