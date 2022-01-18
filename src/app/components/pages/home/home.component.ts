import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public name:any;
  constructor() { }

  ngOnInit(): void {
    this.name = window.localStorage.getItem("_name");
    this.listar();
  }

  listar() {
    
  }

}
