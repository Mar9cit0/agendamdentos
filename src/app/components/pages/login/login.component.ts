import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:any;
  public hasErrors=false;
  public hasSuccess:any;
  public successMessage:any;
  public Usuario: User = {
    id:"",
    name: "",
    email: "",
    password: "",
    enable:false,
    
  }
  form: FormGroup;


  public errors:any[] = []

  constructor(  private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  logarUsuarios() {
    
    console.log("auth",this.Usuario);
    this.authService.Autenticar(this.Usuario).subscribe(users => {
      this.hasSuccess = true;
      this.successMessage = users.name
      
      window.localStorage.setItem("_name", users.name);
      window.localStorage.setItem("_id", users.id);
      this.router.navigate(["home"]);
      console.log(this.Usuario);
    }, error => {
      console.log("ERRRRRRRORRRRRR",error)
      this.hasErrors = true;

      if (error.status === 404) {
        this.errors.push("Usuário no encontrado!")
      }

    })
  }

  /**
   * Cadastro de Usuarios
   */
  cadastroUsuarios() {

    console.log("Login",this.Usuario);
    this.authService.create(this.Usuario).subscribe(users => {
      this.hasSuccess = true;
      this.successMessage = users.name
      this.Usuario = { 
          name: '',
          password: '',
          email: '',
          enable: false,
          
      };
    }, error => {
      console.log(error)
      this.hasErrors = true;

      if (error.status === 401) {
        this.errors.push("Error ao cadastrar")
      }

    })
  }

}
