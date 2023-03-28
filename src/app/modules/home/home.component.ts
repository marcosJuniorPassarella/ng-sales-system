import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user/user.service';
import { UserRequest } from '../../interfaces/User/UserRequest';

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
    console.warn(this.loginForm.value);
  }

  onSubmitSignupForm(): void {
    console.warn(this.signUpForm.value)
    if (this.signUpForm.value && this.signUpForm.valid) {
      this.userService.signUpUser(this.signUpForm.value as UserRequest)
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso!'
            })
            this.signUpForm.reset();
            this.loginCard = true;
          },
          error: (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error', summary: 'Erro', detail: 'Erro ao criar usuário!'
            })
          }
        })
    }
  }
}
