import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';
import { Areas } from 'src/app/models/areas';
import { Datas } from 'src/app/models/datas';
import { Horas } from 'src/app/models/horas';
import { Profesores } from 'src/app/models/profesor';
import { AgendarService } from 'src/app/services/agendar.service';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {
  //select Areas   
  public areas: any;
  public mensaje:any;
  public selectArea: Areas={id:'',name:''};
  //select profesores
  public profesores: any;
  public selectProfesores: Profesores={id:'',name:'',summary:'',enable:false};
  //select Datas
  public datas: any;
  public selectData: Datas={id:'', data:''};
  //select Horas
  public horas: any;
  public selectHora: Horas={id:'', hora:''};
  public idAgenda:any;
  public hasErrors = false;
  public hasSuccess = false;
  public prof:any;
  public errors: any[] = [];
  public agendamento: Agendamento={id_professor:'',id_user:'',hour:'',date:'', name_profesor:'', name_area:''};
  constructor(private agendarService: AgendarService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idAgenda = this.route.snapshot.params['id'];
    this.cargarAreas();
  }
  //onChange Area
  onSelectArea(): void {
    this.cargarProfesores(this.selectArea.id);
  }
  //onChange Profesor
  onSelectProfesor(): void {
    console.log("Id ->",this.selectProfesores.id); 
    this.prof = this.selectProfesores.id; 
    this.cargarData(this.selectProfesores.id);
  }
  //onChange Data
  onSelectDatas(data: any): void {
    console.log("Id ->",data);  
    this.cargarHoras(this.prof, data);
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

  cargarData(id:any) {
 
    this.agendarService.getAllDatas(id).subscribe(
      datas => {
        this.datas = datas;
        console.log("datas",this.datas);
      },
      error => {
        this.hasErrors = true;
        if (error.status !== '') {
          this.errors.push('Erro ao carregar dados')
        }
      }

    );
  }

  cargarHoras(id:any,data:any) {
 
    this.agendarService.getAllHoras(id,data).subscribe(
      horas => {
        this.horas = horas;     
        console.log("horas",this.horas);
      },
      error => {
        this.hasErrors = true;
        if (error.status !== '') {
          this.errors.push('Erro ao carregar dados')
        }
      }
    );
  }

  salvarAgendamento() {
    
    if( this.selectHora.hora == '' || this.selectData.data=='' || this.selectProfesores.id =='' || this.selectArea.id =='' ) { 
      this.hasErrors = true;
      this.mensaje = 'Todos os campos são obrigatorios';
    }
    
    console.log('dddddddddddd',this.selectProfesores.name,this.selectArea.name);

    this.agendamento = {
      id_professor:this.prof,
      name_profesor:this.selectProfesores.name,
      id_user: window.localStorage.getItem("_id"),
      hour: this.selectHora.hora,
      date:this.selectData.data,
      name_area:this.selectArea.name
    };
    console.log(this.agendamento);
    this.agendarService.create(this.agendamento).subscribe(

      agendamento => {
        this.hasSuccess = true;
        this.agendamento = agendamento;     
        console.log("agendamento",this.agendamento);
      },
      error => {
        this.hasErrors = true;
        if (error.status !== '') {
          this.errors.push('Erro ao carregar dados')
        }
      }
    );

  }

  updateAgendamento() {
    
    if( this.selectHora.hora == '' || this.selectData.data=='' || this.selectProfesores.id =='' || this.selectArea.id =='' ) { 
      this.hasErrors = true;
      this.mensaje = 'Todos os campos são obrigatorios';
    }

    this.agendamento = {
      id:this.idAgenda,
      id_professor:this.prof,
      name_profesor:this.selectProfesores.name,
      id_user: window.localStorage.getItem("_id"),
      hour: this.selectHora.hora,
      date:this.selectData.data,
      name_area:this.selectArea.name
    };
    console.log(this.agendamento);
    this.agendarService.update(this.agendamento, this.idAgenda).subscribe(

      agendamento => {
        this.router.navigate(['/home/']);
        this.hasSuccess = true;
        this.agendamento = agendamento;
        console.log("agendamento",this.agendamento);
      },
      error => {
        this.hasErrors = true;
        console.log(error.status);
        if (error.status !== '') {
          this.errors.push('Erro ao carregar dados')
        }
      }
    );

  }

}
