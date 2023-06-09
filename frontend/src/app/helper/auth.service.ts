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

  getUserId(): any {
    return this.storageService.getUser().user_id
  }
  getUserName(): any {
    return this.storageService.getUser().name
  }

  getEmail(): any {
    return this.storageService.getUser().email
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
