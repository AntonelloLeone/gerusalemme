import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { Component } from '@angular/core';
import { DrawTypeDto } from '../../../core/DrawType';
import { DrawTypesService } from '../../../core/services/drawTypes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-draw-type-add',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './draw-type-add.component.html',
  styleUrl: './draw-type-add.component.css'
})
export class DrawTypeAddComponent {
  drawType: DrawTypeDto = {
    id: 0,
    name: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(private drawTypesService: DrawTypesService, private location: Location) {}

  onSubmit() {
    if (this.drawType.name && this.drawType.name.trim()) {
      this.drawTypesService.post(this.drawType).subscribe(
        response => {
          console.log('DrawType created successfully:', response);
          this.location.back();
        },
        error => {
          console.error('Error creating DrawType:', error);
          // Gestisci l'errore come necessario
        }
      );
    } else {
      console.warn('Name cannot be empty or whitespace only');
    }
  }
}
