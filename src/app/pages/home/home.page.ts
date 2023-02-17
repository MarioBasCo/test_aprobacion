import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMeal } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  data: IMeal[]=[];
  username:string='';

  constructor(private authService:AuthService, 
    private dbService: ApiService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.dbService.getCollectionPosts().subscribe((resp:any) => {
      this.data = resp;
    });
    this.getUsername();
  }

  async getUsername(){
    const uid = await this.authService.getUid() || '';
    const path = `Users/${uid}`;
    this.dbService.getCollection(path).subscribe((resp:any) => {
      if(resp){
        this.username = resp.at(0)?.username;
      }
    });
  }

  async cerrarSesion(){
    await this.authService.logout();
    this.router.navigateByUrl('/signin', { replaceUrl: true });
  }

}
