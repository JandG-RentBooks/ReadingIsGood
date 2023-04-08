import {Injectable} from '@angular/core';

const USER_KEY = 'helper-user'

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
    }

    clean(): void {
        localStorage.clear();
    }

    public setUser(user: any): void {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return {};
    }

    public isLoggedIn(): boolean {
        const user = localStorage.getItem(USER_KEY);
        if (user) {
            return true;
        }

        return false;
    }

}
