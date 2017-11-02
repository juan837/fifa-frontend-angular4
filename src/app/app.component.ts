import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService
  ]
})
export class AppComponent implements OnInit {
  title = 'app';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private _userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    // Inicializar formulario para implementarlos como ReactiveForm
    this.loginForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(5)]]
    });

    this.registerForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(5)]]
    });

    // Obtener informacion del usuario, si se guardo en el localStorage
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  onSubmitLogin(form: FormGroup) {
    // this._userService.signup();
    if (form.valid) {
      this.user.email = form.value.email;
      this.user.password = form.value.password;

      // Conseguimos informacion del usuario
      this._userService.signup(this.user).subscribe(
        resp => {
          let identity = resp.user;
          this.identity = identity;

          if (!this.identity._id) {
            alert('El usuario no esta correctamente identificado');
          } else {
            // crear elemento en localStorage
            localStorage.setItem('identity', JSON.stringify(identity));

            this._userService.signup(this.user, true).subscribe(
              response => {
                let token = response.token;
                this.token = token;

                if (this.token <= 0) {
                  alert('El token no se ha generado correctamente');
                } else {
                  //crear elemento en localStorage para el token
                  localStorage.setItem('token', token);
                  this.loginForm.reset();
                }
              },
              error => {
                let errorMessage = <any>error;

                if (errorMessage != null) {
                  const body = JSON.parse(error._body);
                  this.errorMessage = body.message;
                  console.log(error);
                }
              }
            );
          }
        },
        err => {
          var errorMessage = <any>err;

          if (errorMessage != null) {
            const body = JSON.parse(err._body);
            this.errorMessage = body.message;
            console.log(err);
          }
        }
      );
    }
  }

  onSubmitRegister(form: FormGroup) {

    if (form.valid) {
      this.user_register.name = form.value.name;
      this.user_register.email = form.value.email;
      this.user_register.password = form.value.password;

      this._userService.register(this.user_register).subscribe(
        resp => {
          let user = resp.user;
          this.user_register = user;

          if (!user._id) {
            this.alertRegister = 'Error al registrarse';
          } else {
            this.registerForm.reset();
            this.alertRegister = 'El registro se a creado exitosamente, Logueate con ' + user.name;
          }
        },
        err => {
          var errorMessage = <any>err;

          if (errorMessage != null) {
            const body = JSON.parse(err._body);
            this.alertRegister = body.message;
            console.log(err);
          }
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;

    this.user.email = '';
    this.user.password = '';

    this.loginForm.value.email = '';
    this.loginForm.value.password = '';
  }

}
