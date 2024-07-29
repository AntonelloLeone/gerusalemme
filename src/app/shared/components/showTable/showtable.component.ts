import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../../core/services/database.service';

@Component({
  selector: 'app-mostra-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './showtable.component.html',
  styleUrls: ['./showtable.component.css']
})
export class MostraTableComponent implements OnInit {
  tableName: string | null = null;
  tableData: any[] = [];
  tableHeaders: string[] = [];

  constructor(private databaseService: DatabaseService, private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('MostraTableComponent initialized');
    this.route.paramMap.subscribe(params => {
      this.tableName = params.get('tableName');
      console.log(this.tableName);
      if (this.tableName) {
        this.fetchTableData(this.tableName);
      }
      
    });
    
  }

  private async fetchTableData(tableName: string): Promise<void> {
    const modifiedTableName = tableName.replace(/_/g, '');

    this.databaseService.getTableData(modifiedTableName).subscribe({
      next: data => {
        this.tableData = data;
        if (this.tableData.length > 0) {
          this.tableHeaders = Object.keys(this.tableData[0]);
        }
      },
      error: error => {
        console.error(`Error fetching data for table ${tableName}`, error);
      }
    });
  }

  addRecord(): void {
    console.log('View record');
    if (this.tableName) {
      this.router.navigate(
        [{ outlets: { secondColumn: ['details', this.tableName+'_add',1] } }],
        { relativeTo: this.route.parent }
      );
    }
  }

  viewRecord(idValue: any): void {
    
    console.log('View record', idValue);
    console.log(this.tableName);
    this.router.navigate([{ outlets: { secondColumn: ['details', this.tableName, idValue] } }]
      ,
        { relativeTo: this.route.parent }
    );
    // this.router.navigate(
    //   [{ outlets: { secondColumn: [`details/${this.tableName}/${idValue}`] } }]
    // );
  }

  editRecord(idValue: any): void {
    console.log('Edit record', idValue);
    this.router.navigate([{ outlets: { secondColumn: ['details', this.tableName+'_update', idValue] } }]
      ,
        { relativeTo: this.route.parent }
    );
  }

  deleteRecord(idValue: any): void {
    console.log('Delete record', idValue);
    
    // Finestra di conferma nativa del browser
    if (window.confirm('Sei sicuro di voler eliminare questo record?')) {
      if (this.tableName) {
        this.databaseService.genericDelete(idValue, this.tableName).subscribe({
          next: () => {
            console.log('Record deleted successfully');
            // Rinfresca i dati
            if (this.tableName) {
              this.fetchTableData(this.tableName);
            }
          },
          error: (error) => {
            console.error('Error deleting record:', error);
          }
        });
      }
    }
  }
  
}
