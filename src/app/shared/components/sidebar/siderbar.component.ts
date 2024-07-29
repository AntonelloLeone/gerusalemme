import { Component,  inject ,Output, EventEmitter, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
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
  GetDBServiceInst: DatabaseService = inject(DatabaseService);  //private??
  authService: AuthService = inject(AuthService); //private??

  ngOnInit() {
    this.GetDBServiceInst.getTableNames().subscribe(
      data => {
        this.filterTables(data);
      },
      error => console.error('Error fetching table names', error)
    );
  }
  
  filterTables(data: string[]) {
    const userInfo = this.authService.currentUserSig();
    console.log('primo'+userInfo);
    const userRole = userInfo?.role;
    console.log(userRole)
    console.log('test'+this.authService.currentUserSig());
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

  formatTableName(name: string): string {
    return name.replace(/_/g, ' ');
  }
  
}
