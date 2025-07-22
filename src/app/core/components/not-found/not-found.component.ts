// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-not-found',
//   imports: [],
//   templateUrl: './not-found.component.html',
//   styleUrl: './not-found.component.scss'
// })
// export class NotFoundComponent {

// }

//testing phase

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <button routerLink="/dashboard">Back to Dashboard</button>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
      text-align: center;
    }
    
    .not-found-content {
      max-width: 500px;
      padding: 2rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    h1 {
      font-size: 6rem;
      margin: 0;
      color: #3f51b5;
    }
    
    h2 {
      margin-top: 0;
    }
    
    p {
      margin-bottom: 2rem;
      color: #616161;
    }
    
    button {
      padding: 0.75rem 1.5rem;
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    
    button:hover {
      background-color: #303f9f;
    }
  `]
})
export class NotFoundComponent {}
