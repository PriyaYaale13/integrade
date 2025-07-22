// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-navigation',
//   imports: [],
//   templateUrl: './navigation.component.html',
//   styleUrl: './navigation.component.scss'
// })
// export class NavigationComponent {

// }

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  userName = 'Test User';
  
  constructor(private authService: AuthService) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = `${user.firstName} ${user.lastName}`;
    }
  }
  
  logout() {
    this.authService.logout().subscribe(() => {
      console.log('Logged out');
    });
  }
}


