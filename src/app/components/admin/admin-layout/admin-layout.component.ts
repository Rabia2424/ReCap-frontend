import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule,
    RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit{

  currentLink:string|null;
  constructor(private router:Router){};
  ngOnInit(): void {
    // this.setCurrentLink("/admin/car/list");
    // this.router.navigate(["/admin/car/list"]);
    this.router.navigate(["/admin"]);
  }

  setCurrentLink(link:string){
    this.currentLink = link;
  }

  getCurrentLinkClass(link:string){
    if(this.currentLink === link){
      return "nav-link active";
    }else{
      return "";
    }
  }

}
