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
    this.databaseService.getTableData(tableName).subscribe({
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
        [{ outlets: { secondColumn: ['add', this.tableName] } }],
        { relativeTo: this.route.parent }
      );
    }
  }

  viewRecord(record: any): void {
    console.log('View record', record);
  }

  editRecord(record: any): void {
    console.log('Edit record', record);
  }

  deleteRecord(record: any): void {
    console.log('Delete record', record);
  }
}
