import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ThemeService {
  private isNightMode = new BehaviorSubject<boolean>(false);
  isNightMode$ = this.isNightMode.asObservable();

  toggleNightMode() {
    this.isNightMode.next(!this.isNightMode.value);
  }
}
