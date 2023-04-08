import { Injectable } from '@angular/core';
import { StorageService } from "../Services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private storageService: StorageService) {

  }

  isAuthenticated(){
    return this.storageService.isLoggedIn()
  }

  getUserName(): any {
    return this.storageService.getUser().name
  }

  isUser(): any {
    return this.storageService.getUser().roles.includes('user')
  }

  isAdmin(): any {
    return this.storageService.getUser().roles.includes('admin')
  }

  isEmployee(): any {
    return this.storageService.getUser().roles.includes('employee')
  }
}
