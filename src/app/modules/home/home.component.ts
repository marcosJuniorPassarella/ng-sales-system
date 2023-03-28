import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user/user.service';
import { UserRequest } from '../../interfaces/User/UserRequest';
import { AuthRequest } from '../../interfaces/User/AuthRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  onSubmitLoginForm() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
        .subscribe({
          next: (response) => {
            console.log('AUTENTICADO', response)
            this.messageService.add({
              severity: 'success', summary: 'Sucesso', detail: 'Bem vindo de volta!', life: 2000
            });
            this.loginForm.reset();
          },
          error: (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error', summary: 'Erro', detail: 'Erro ao fazer login!', life: 2000
            })
          }
        })
    }
  }

  onSubmitSignupForm(): void {
    console.warn(this.signUpForm.value)
    if (this.signUpForm.value && this.signUpForm.valid) {
      this.userService.signUpUser(this.signUpForm.value as UserRequest)
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso!', life: 2000
            })
            this.signUpForm.reset();
            this.loginCard = true;
          },
          error: (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error', summary: 'Erro', detail: 'Erro ao criar usuário!', life: 2000
            })
          }
        })
    }
  }
}
