import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare var Swiper: any;
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit {
  constructor(private authsrv:AuthService) { }

  ngOnInit(): void {
    console.log(this.authsrv.isLoggedIn())
    
    const swiper = new Swiper('.main-swiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
}
