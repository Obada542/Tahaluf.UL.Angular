import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router, private toaster: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');
    if (token) {
      // console.log(state);
      if (state.url.indexOf('admin') >= 0) {
        let user: any = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);
          if (user.role == 'Admin') {
            return true;
          }
          else {
            return false;
          }
        }
      }

      else if(state.url.indexOf('accountant') >= 0)
      {
        let user: any = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);
          if (user.role == 'Accountant') {
            return true;
          }
          else {
            return false;
          }
        }
      }
      if (state.url.indexOf('client') >= 0) {
        let user: any = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);
          if (user.role == 'Student') {
            return true;
          }
        }
      }
      return true;
    }

    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
