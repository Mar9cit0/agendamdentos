import { Component, OnInit } from '@angular/core';
import { Areas } from 'src/app/models/areas';
import { Profesores } from 'src/app/models/profesor';
import { AgendarService } from 'src/app/services/agendar.service';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {
  /**
   * select Areas 
  */
  public areas: any;
  public selectArea: Areas={id:'',name:''};
  /**
   * select profesores
  */
  public profesores: any;
  public selectProfesores: Profesores={id:'',name:'',summary:'',enable:false};

  public hasErrors = false;
  public errors: any[] = [];
  constructor(private agendarService: AgendarService) { }

  ngOnInit(): void {
    this.cargarAreas();
  }
  onSelectArea(id: any): void {
    console.log("Id ->",id);
    this.cargarProfesores(id);
  }
  cargarAreas() {
 
    this.agendarService.getAllAreas().subscribe(
      areas => {
        this.areas = areas;
        console.log("Areas",this.areas);
      },
      error => {
        this.hasErrors = true;
        if (error.status !== '') {
          this.errors.push('Erro ao carregar dados')
        }
      }

    );
  }

   
  cargarProfesores(id:any) {
 
    this.agendarService.getAllProfesores(id).subscribe(
      profesores => {
        this.profesores = profesores;
        console.log("profesores",this.profesores);
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
