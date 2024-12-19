import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, HttpClientModule, NgIf],
  providers: [LoginService, HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

    form : FormGroup = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      contraseña: new FormControl('', Validators.required)
    });
    router : Router = inject(Router);
    loginService : LoginService = inject(LoginService);
    cd : ChangeDetectorRef = inject(ChangeDetectorRef);
    error : boolean = false;
    cargando : boolean = false;
    advertencia : string = "";

    ngOnInit(): void {
      console.log(this.loginService.isAuthenticaded());
      if(this.loginService.isAuthenticaded()){
        this.router.navigate(['/perfil']);
      }
    }


    login(){
      this.cargando = true;

      if(this.form.get('correo')?.invalid ){
        this.advertencia = 'Ese no es un correo valido';
        this.cargando = false
        this.cd.detectChanges();
        this.resetAdvertencia(3000);
        return;
      }

      if(this.form.get('contraseña')?.invalid){
        this.advertencia = 'Debes ingresar una contraseña';
        this.cargando = false;
        this.cd.detectChanges();
        this.resetAdvertencia(3000);
        return;
      }

      if(this.form.valid){
       const correo = this.form.value.correo ?? '';
       const contraseña = this.form.value.contraseña ?? '';
       this.loginService.login(correo, contraseña).subscribe({
          next: () => {
            this.router.navigate(['/perfil'])
          },
          error: () => {
            this.error = true;
            this.cargando = false;
            this.cd.detectChanges();
            this.resetError(3000);
          }
       });
      }
    }


    public resetError(time: number){
      let timeout = setTimeout(() => {
        this.error = false;
        this.cd.detectChanges();
        clearTimeout(timeout);
      }, time);
    }

    public resetAdvertencia(time: number){
      let timeout = setTimeout(() => {
        this.advertencia = "";
        this.cd.detectChanges();
        clearTimeout(timeout);
      }, time);
    }

}
