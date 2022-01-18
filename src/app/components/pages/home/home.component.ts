import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public name:any;
  public hasErrors = false;
  public errors: any[] = [];
  public agendamentos : any;
  
  constructor(private homeService:HomeService, private router: Router) { }
  
  ngOnInit(): void {
    this.name = window.localStorage.getItem("_name");
    this.listar();
  }

  editar(id:any) {
    this.router.navigate(['/agendar/'+ id]);
  }

  eliminar(id:any){

    console.log("entre");
    this.homeService.delete(id).subscribe(
      agendamentos => {
        alert("registro eliminado");
        location.reload();
      },
      error => {
        this.hasErrors = true;
        if (error.status !== '') {
          this.errors.push('Erro ao carregar dados')
        }
      }
    );
  }

  listar() {
    var id = window.localStorage.getItem("_id");
    this.homeService.getAllAgendamento(id).subscribe(
      agendamentos => {
        this.agendamentos = agendamentos;     
        console.log("agendamentos",this.agendamentos);
      },
      error => {
        this.hasErrors = true;
        if (error.status !== '') {
          this.errors.push('Erro ao carregar dados')
        }
      }
    );
    
  }

}
