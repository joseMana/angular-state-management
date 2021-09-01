import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/core/http-services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { delay, map, retry, tap, timeout } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserStateService } from 'src/app/core/state-services/user-state.service';
import { LoaderStateService } from 'src/app/core/state-services/loader-state.service';

@Component({
  selector: 'app-services-demo',
  templateUrl: './services-demo.component.html',
  styleUrls: ['./services-demo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesDemoComponent implements OnInit {

  user: User = {} as User;
  users: User[] = [];
  users$: BehaviorSubject<User[]> = new BehaviorSubject([] as User[]);
  isLoading$!: Observable<boolean>;
  
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private userStateService: UserStateService,
    private loaderStateService: LoaderStateService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.loaderStateService.isLoading$;
    this.initUsers();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      // this.users.push(form.value);
      if (!this.user.id) {
        // add user
        this.userService.add(this.user)
          .subscribe(user => {
            alert(`User ${user?.name} successfuly created!`);
            this.initUsers();
            form.reset();
            this.userStateService.incrementRecentlyAdded();
          });
      } else {
        // update user
        this.userService.update(this.user)
          .subscribe(user => {
            alert(`User ${user?.name} successfuly updated!`);
            this.initUsers();
            form.reset();
          });
      }
      
    }
  }

  onEdit(id: number): void {
    this.userService.getById(id)
      .subscribe(user => {
        this.user = user;
      });
  }

  onDelete(id: number): void {
    this.userService.delete(id)
      .subscribe(user => {
        alert('User successfully deleted');
        this.initUsers();
      });
  }

  private initUsers(): void {    
    this.userService.getAll()
      .pipe(
        // timeout(1),
        // retry(3)
        // tap(users => console.log(users)),
        // map(users => users.filter(a => a.id > 2)),
        // tap(users => console.log(users)),
      )
      .subscribe(users => {
        this.users = users;
        this.users$.next(users);
        this.userStateService.users = users;
        // this.cdr.detectChanges();
      });
      // .subscribe(response => {
      //   if (response.status === 200) {
      //     this.users = response.body as User[];
      //   }
      // });
  }
}
