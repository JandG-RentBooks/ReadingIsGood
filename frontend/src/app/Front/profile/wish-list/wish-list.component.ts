import { Component } from '@angular/core';
import {ProfileService} from "../../../Services/Front/profile.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {

    wishlist: any[] = []

    constructor(private profileService: ProfileService) {}

    ngOnInit(): void {
        this.getWishlist()
    }

    getWishlist(): void {
        this.profileService.getWishlist().subscribe({
            next: data => {
                this.wishlist = []
                data.forEach((item: any) => {
                    this.wishlist.push({id: item.id, title: item.title})
                })
            },
            error: error => {

            }
        })
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.wishlist, event.previousIndex, event.currentIndex);
        this.sortWishlist()
    }

    sortWishlist(): void {
        this.profileService.sortWishlist(this.wishlist).subscribe({
            next: data => {
                console.log(data)
            },
            error: error => {
                console.log(error)
            }
        })
    }

    remove(id: number): void {
        this.profileService.removeWishlist(id).subscribe({
            next: data => {
                console.log(data)
                this.getWishlist()
            },
            error: error => {
                console.log(error)
            }
        })
    }

}
