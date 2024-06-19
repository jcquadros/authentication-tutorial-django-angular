import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  authenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    AuthService.authEmitter.subscribe((authenticated) => {
      this.authenticated = authenticated;
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        AuthService.authEmitter.emit(false);
        this.router.navigate(['/']);
      },
    });
  }
}
