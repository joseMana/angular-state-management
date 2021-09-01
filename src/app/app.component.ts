import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserStateService } from './core/state-services/user-state.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo-app-batch6';

  users$!: Observable<User[]>;
  recentlyAdded$!: Observable<number>;

  constructor(
    private userStateService: UserStateService
  ) {
    
  }
  ngOnInit(): void {
    this.users$ = this.userStateService.users$;
    this.recentlyAdded$ = this.userStateService.recentlyAdded$;
  }
}
