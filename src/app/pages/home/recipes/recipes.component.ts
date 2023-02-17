import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ILike, IMeal } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  @Input() item!: IMeal;
  like: boolean = false;
  iconLike: string = 'heart-outline';
  iconColor: string = 'medium';
  numComments: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private authService:AuthService, 
    private dbService: ApiService) { }

  ngOnInit() {
    this.loadLikeUser();
    this.getComments();
  }

  getComments(){
    const path = `Posts/${this.item.uid}/comments`;
    this.dbService.getCollection(path).subscribe((resp:any)=> {
      if(resp){
        this.numComments = resp.length;
      }
    });
  }

  async loadLikeUser(){
    const path = `Posts/${this.item.uid}/likes`;
    const uid = await this.authService.getUid() || '';
    this.dbService.getDoc(path, uid).subscribe((res:any) => {
      if(res) {
        this.like = res.like;
        this.iconLike = res.like ? 'heart' : 'heart-outline';
        this.iconColor = res.like ? 'danger' : 'medium';
      }
    });
  }

  async likeOrDislike(){
    const path = `Posts/${this.item.uid}/likes`;
    const uid = await this.authService.getUid() || '';
    
    const data: ILike = {
      uid,
      date: new Date(),
      like: !this.like
    };
    this.dbService.createDoc(data, path, uid);
    this.changeLike(data.like);
  }

  changeLike(estado: boolean){
    this.iconLike = estado ? 'heart' : 'heart-outline';
    this.iconColor = estado ? 'danger' : 'medium';
    
    const path = 'Posts/';
    let numLikes = this.item.likes ?? 0;

    const data = {
      likes: estado ? numLikes + 1 : numLikes - 1 
    }

    if(data.likes < 0) {
      data.likes = 0;
    }

    //@ts-ignore
    this.dbService.updateDoc(data,path, this.item.uid);
  }

  async openModal(item: IMeal) {
    const modal = await this.modalCtrl.create({
      component: CommentsComponent,
      componentProps: {
        obj:item
      }
    });
    
    modal.present();
  }
}
