// src/app/features/auth/components/auth-layout/auth-layout.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  currentYear = new Date().getFullYear();
}
