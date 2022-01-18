import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ListaComponent } from './components/pages/lista/lista.component';
import { AgendarComponent } from './components/pages/agendar/agendar.component';


const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent  },
  { path: 'lista', component: ListaComponent },
  { path: 'agendar',   component: AgendarComponent},
  { path: 'agendar/:id',   component: AgendarComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
