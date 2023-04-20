import {Component, OnInit} from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import {IndexService} from "../../Services/Front/index.service";
import {environment} from "../../../environments/environment";

const IMAGE_URL = environment.imageUrl;

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

    testimonials: any = []
    imageUrl = IMAGE_URL
    responsiveOptions: any

    constructor(private indexService: IndexService) {
        this.responsiveOptions = [
            {
                breakpoint: '1300px',
                numVisible: 3,
                numScroll: 2
            },
            {
                breakpoint: '1024px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '768px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

  ngOnInit(): void {
        this.getTestimonials()
  }

    getTestimonials(): any {
        this.indexService.getTestimonials().subscribe({
            next: data => {
                console.log(data)
                this.testimonials = data
            },
            error: err => {
            }
        })
    }

}
