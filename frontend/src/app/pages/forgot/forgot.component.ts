import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotService } from '../../services/forgot.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent implements OnInit {
  form!: FormGroup;
  cls = '';
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private forgotService: ForgotService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: '',
    });
  }

  submit(){
    this.forgotService.forgot(this.form.getRawValue()).subscribe({
      next: (res : any) => {
        this.cls = 'success';
        this.message = 'Email was sent!';
      },
      error: (res: any) => {
        this.cls = 'danger';
        this.message = 'Error occured!';
      }
    });
  }

}