import { Component,  inject ,Output, EventEmitter, OnInit} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DatabaseService } from '../../../core/services/database.service';
import { AuthService } from '../../../core/services/auth.service';
import { ADMIN_TABLES } from '../../../core/adminTable';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  tableNames: string[] = [];
  @Output() tableSelected = new EventEmitter<string>();
  GetDBServiceInst: DatabaseService = inject(DatabaseService);
  authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.GetDBServiceInst.getTableNames().subscribe(
      data => {
        this.filterTables(data);
      },
      error => console.error('Error fetching table names', error)
    );

    // controlliamo se cambia utente
    // this.authService.currentUserSig.observe(() => {
    //   this.GetDBServiceInst.getTableNames().subscribe(
    //     data => {
    //       this.filterTables(data);
    //     },
    //     error => console.error('Error fetching table names', error)
    //   );
    // });
  }
  
  filterTables(data: string[]) {
    const userInfo = this.authService.currentUserSig();
    const userRole = userInfo?.role;
    console.log(this.authService.currentUserSig());
    // Filtro le tabelle in base al ruolo dell'utente
    this.tableNames = data.filter(tableName => 
      userRole === 'admin' || !ADMIN_TABLES.includes(tableName)
    );
  }
  

   showTable(tableName: string): void {
    // this.router.navigate(['/table', tableName]);
    this.tableSelected.emit(tableName);
    console.log(this.authService.currentUserSig());
    
  }

  
}
