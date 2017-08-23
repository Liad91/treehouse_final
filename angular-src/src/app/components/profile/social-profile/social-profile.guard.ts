import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class CanActivateSocialProfile implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!window.opener || window.opener.document.domain !== document.domain || Object.keys(route.queryParams).length < 1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}