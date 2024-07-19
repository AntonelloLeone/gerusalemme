import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MostraTableComponent } from '../showTable/showtable.component';
import { SidebarComponent } from '../sidebar/siderbar.component';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent ,SidebarComponent, MostraTableComponent
      ,CommonModule],
    templateUrl: './main.component.html',
    styleUrl: './main.component.css'
})

export class MainComponent implements OnInit {
    title = 'Archeo';
    selectedTable: string | null = null;
    isNightMode: boolean = false;
  
    constructor(private themeService: ThemeService, private router: Router,
      private route: ActivatedRoute
     ) {}
  
    onTableSelected(tableName: string): void {
      console.log(tableName);
      this.selectedTable = tableName;
      this.router.navigate(
        [{ outlets: { secondColumn: ['table', tableName] } }],
        { relativeTo: this.route }
      );
    }
  
  
    
  
    ngOnInit(): void {
      
      this.themeService.isNightMode$.subscribe((isNightMode) => {
        this.isNightMode = isNightMode;
        if (isNightMode) {
          console.log('Adding night-mode class to body');
          document.body.classList.add('night-mode');
        } else {
          console.log('Removing night-mode class from body');
          document.body.classList.remove('night-mode');
        }
      });
    }
  
    toggleNightMode() {
      this.themeService.toggleNightMode();
    }
  }
