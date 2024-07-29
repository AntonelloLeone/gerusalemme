import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail-component.component.html',
  styleUrls: ['./user-detail-component.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any;
  id: string | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.userService.getUserById(this.id).subscribe(
          data => {
            this.user = data;
          },
          error => {
            console.error('Error fetching user data', error);
          }
        );
      }
    });
  }
}
