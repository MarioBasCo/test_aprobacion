import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectCube } from 'swiper';

SwiperCore.use([EffectCube, Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  

  constructor() { }

  ngOnInit() {

  }
}
