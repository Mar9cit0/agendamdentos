import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Sair(){
    window.localStorage.setItem("_name", '');
    window.localStorage.setItem("_id",'');
    this.router.navigate(["login"]);
  }

}
