import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  Type,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailComponent } from '../user-detail-component/user-detail-component.component';
import { DrawTypesComponent } from '../draw-types/draw-types.component';
import { DrawTypeAddComponent } from '../draw-type-add/draw-type-add.component';
import { DrawTypeUpdateComponent } from '../draw-type-update/draw-type-update.component';

@Component({
  selector: 'app-dynamic-component-loader',
  templateUrl: './dynamic-component-loader.component.html',
  styleUrls: ['./dynamic-component-loader.component.css'],
})
export class DynamicComponentLoaderComponent implements AfterViewInit {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.route.params.subscribe((params) => {
      const componentName = params['componentName'];
      const id = params['id'];
      this.loadComponent(componentName, id);
    });
  }

  loadComponent(componentName: string, id: string): void {
    let component: Type<any>;

    // Mappa i nomi dei componenti ai componenti reali
    switch (componentName) {
      case 'users':
        component = UserDetailComponent;
        break;
      case 'draw_types':
        component = DrawTypesComponent;
        break;
      case 'draw_types_add':
        component = DrawTypeAddComponent;
        break;
      case 'draw_types_update':
        component = DrawTypeUpdateComponent;
        break;
      default:
        console.error(`Unknown component: ${componentName}`);
        return;
    }

    if (component && this.container) {
      this.container.clear();
      const componentRef = this.container.createComponent(component);
      (componentRef.instance as any).id = id; // Passa l'ID al componente
    } else {
      console.error('Container is not initialized.');
    }
  }
}
