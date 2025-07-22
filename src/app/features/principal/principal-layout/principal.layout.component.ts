import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-principal-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    template: `
    <div class="principal-layout">
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
    styles: [`
    .principal-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .content {
      flex: 1;
      padding: 1rem;
    }
  `]
})
export class PrincipalLayoutComponent {
    constructor() {
        console.log('PrincipalLayoutComponent initialized');
    }
} 