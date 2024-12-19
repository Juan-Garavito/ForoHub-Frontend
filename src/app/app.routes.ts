import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { authenticationGuard } from './authentication.guard';
import { RespuestasComponent } from './respuestas/respuestas.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [authenticationGuard]
  },
  {
    path: 'respuestas/topico/:idTopico',
    component: RespuestasComponent,
    canActivate: [authenticationGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
