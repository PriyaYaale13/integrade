import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

import { Observable, Subscribable } from 'rxjs';
import { Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  hasMenu?: boolean;
  menuItems?: MenuItem[];
  children?: MenuItem[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  action?: Function;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, RouterLink, MatIcon, MatMenu, MatMenuTrigger, RouterLinkActive,MatButton,MatIconButton]
})
export class SidebarComponent implements OnInit {

  @Input() title = 'Quick Links';
  @Input() menuItems: MenuItem[] = [];
  @Input() useCustomIcons = true;
  @Output() collapsed = new EventEmitter<boolean>(); // EventEmitter for collapsing

  isCollapsed = false;
  expandedItems: MenuItem[] = [];
  mobileMenuOpen = false;
  loading$: Observable<unknown> | Subscribable<unknown> | Promise<unknown> | undefined;

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.sidebarService.isCollapsed$.subscribe((state) => {
      this.isCollapsed = state;
    });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarService.toggle();
    this.collapsed.emit(this.isCollapsed);

    // Use class manipulation for animation and smooth transitions
    if (this.isCollapsed) {
      this.renderer.addClass(this.document.body, 'sidebar-collapsed');
    } else {
      this.renderer.removeClass(this.document.body, 'sidebar-collapsed');
    }
  }

  isMobileView(): boolean {
    return window.innerWidth <= 768;
  }

  handleClick(item: MenuItem): void {
    console.log("Sidebar item clicked:", item);

    // If the item has an action defined, execute it
    if (item.action) {
      item.action();
    }

    // Optionally navigate if the route is defined
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}