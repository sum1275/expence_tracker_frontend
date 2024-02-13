import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  ngOnInit(): void {
 
  }
  toggleSidebar() {
    const body = document.getElementsByTagName('body')[0];
    const sidebarCollapse = document.getElementsByClassName('main-sidebar')[0];
    body.classList.toggle('sidebar-collapse');
    sidebarCollapse.classList.toggle('sidebar-collapse');
  }
}
