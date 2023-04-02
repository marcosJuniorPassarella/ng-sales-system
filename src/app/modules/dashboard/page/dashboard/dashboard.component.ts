import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  userName!: string;

  constructor(
    private cookie: CookieService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserName();
  }
  
  getUserName(): void {
    this.userService.getUserInfo()
      .subscribe({
        next: (response) => {
          response && (this.userName = response.name)
        }
      })
  }

  logoutUser(): void {
    this.cookie.delete('USER_INFO');
    void this.router.navigate(['/home']);
  }

}
