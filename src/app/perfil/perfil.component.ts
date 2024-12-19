import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PerfilService } from './perfil.service';
import { LoginService } from '../login/login.service';
import { DataPerfil } from './perfil.definitions';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HttpClientModule, NgIf, NgFor, RouterModule, CommonModule],
  providers: [PerfilService, LoginService],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  token : string = '';
  usuario : DataPerfil | undefined;

  constructor(
    private perfilService: PerfilService,
    private loginService : LoginService,
    private cd : ChangeDetectorRef) {
    this.token = this.loginService.getToken() ?? '';
  }


  ngOnInit(): void {
    this.getPerfil();
  }


  getPerfil() {
    this.perfilService.getPerfil(this.token).subscribe({
      next: (data : DataPerfil) => {
        this.usuario = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
