import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  message: string = '';
  
  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (res: any) => {
        this.message = `Welcome to the home page, ${res.first_name}!`;
        //AuthService.authEmitter.emit(true);
      },
      error: () => {
        this.message = 'You are not authenticated!';
        //AuthService.authEmitter.emit(false);
      }
    });  
  }
}
