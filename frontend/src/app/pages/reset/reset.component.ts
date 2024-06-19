import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotService } from '../../services/forgot.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private forgotService: ForgotService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: '',
      password_confirm: ''
    });
  }

  submit(){
    const formData = this.form.getRawValue();
    const data = {
      ...formData,
      token: this.route.snapshot.params['token']
    }
    this.forgotService.reset(data).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }

}