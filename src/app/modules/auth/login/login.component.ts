import { Component, NgIterable, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/pro-duotone-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  loginForm!: FormGroup;
  googleIcon: IconDefinition = faGoogle;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        // email is required and must be a valid email
        email: [null, Validators.compose([
          Validators.email,
          Validators.required
        ])
        ],
        password: [null, Validators.compose([
          Validators.required,
        ])]
      });
  }

  onSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      this.authenticationService.login({ email: this.loginForm.value.email, password: this.loginForm.value.password })
        .then(() => {
          this.router.navigate(['/']);
        }, (error) => {
          this.loginForm.setErrors({ error: error });
          this.loading = false;
        });
    }
  }

  getFormErrors(): NgIterable<any> | undefined | null {
    let errors: string[] = [];
    if (this.loginForm.errors) {
      for (const value of Object.values(this.loginForm.errors)) {
        errors.push(value.message);
      }
    }
    return errors;
  }
}
