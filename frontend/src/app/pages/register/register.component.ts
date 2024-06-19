import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
  }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: ''
      })
  }

  submit(){
    this.authService.register(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }

}
