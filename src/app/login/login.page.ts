import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  email = '';
  password = '';
  user: User;
  logged;

  constructor(private loginService: LoginServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() { }

  onSubmit() {
    this.loginService.login(this.email, this.password).subscribe(apiData => (this.user = apiData) );
    this.logged = JSON.parse(localStorage.getItem('user') || '');
    if(this.logged.code === 200)
    {
      this.router.navigate(['requerimientosCreados']);
    }
    else
    {
      this.router.navigate(['/']);
    }
 }
}
