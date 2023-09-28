import { Component } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent {

  constructor(public authservice:AuthenticationService,private router:Router) {
  }


  handleLogOut() {
    this.authservice.logout().subscribe({
      next:(data)=>{
        this.router.navigateByUrl("");

      },
      error:(err)=>{


      }
    })
  }
}
