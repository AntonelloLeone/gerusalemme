import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DrawTypeDto } from '../../../core/DrawType';
import { DrawTypesService } from '../../../core/services/drawTypes.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-draw-type-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './draw-type-update.component.html',
  styleUrl: './draw-type-update.component.css'
})
export class DrawTypeUpdateComponent {
  drawType: DrawTypeDto = {
    id: 0,
    name: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  id: string | null = null;

  constructor(private drawTypesService: DrawTypesService, private location: Location,
    private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.drawTypesService.getDrawTypeById(this.id).subscribe(
          data => {
            this.drawType = data;
            console.log(this.drawType);
          },
          error => {
            console.error('Error fetching user data', error);
          }
        );
      }
    });
  }







  onSubmit() {
    if (this.drawType.name && this.drawType.name.trim()) {
      this.drawTypesService.post(this.drawType).subscribe(
        response => {
          console.log('DrawType updated  successfully:', response);
          this.location.back();
        },
        error => {
          console.error('Error updating  DrawType:', error);
          // Gestisci l'errore come necessario
        }
      );
    } else {
      console.warn('Name cannot be empty or whitespace only');
    }
  }

}
