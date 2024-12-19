import { LoginService } from './../login/login.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RespuestasService } from './respuestas.service';
import { TopicoRespuestas } from './respuestas.definitions';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-respuestas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, HttpClientModule],
  providers: [RespuestasService],
  templateUrl: './respuestas.component.html',
  styleUrl: './respuestas.component.css'
})
export class RespuestasComponent implements OnInit  {

  token : string;
  topico : TopicoRespuestas | undefined;
  idTopico : number | undefined;

  constructor(
    private respuestasService : RespuestasService,
    private loginService : LoginService,
    private cd : ChangeDetectorRef,
    private route : ActivatedRoute) {
    this.token = this.loginService.getToken() ?? "";
    this.idTopico =  Number(this.route.snapshot.paramMap.get('idTopico'));
  }

  ngOnInit(): void {
    this.getRespuestas();
  }

  getRespuestas(): void {
    if (this.idTopico !== undefined) {
      this.respuestasService.getRespuestas(this.token, this.idTopico) .subscribe({
        next: (topico) => {
          this.topico = topico;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.error(error);
        }
      })
    } else {
      console.error('idTopico is undefined');
    }

  }

}
