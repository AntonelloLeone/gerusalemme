import { Component, inject } from "@angular/core";
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from "@angular/common";
import { ThemeService } from "../../../core/services/theme.service";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
   
})
export class HeaderComponent {
    isNightMode: boolean = false;
    authService=  inject(AuthService);

    constructor(private themeService: ThemeService) {
        this.themeService.isNightMode$.subscribe((isNightMode) => {
            this.isNightMode = isNightMode;
          });
    }

  toggleNightMode() {
    this.themeService.toggleNightMode();
    console.log('Toggle night mode triggered');
  }

  logout(): void {
    console.log('logout');
    localStorage.setItem('token','');
    this.authService.currentUserSig.set(null);
  }
}