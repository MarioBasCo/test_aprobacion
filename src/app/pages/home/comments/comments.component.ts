import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IComment, IMeal } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() obj!:IMeal;
  comentario: string = '';
  listComments: IComment[]=[];

  constructor(private modalCtrl: ModalController, private authService: AuthService, private dbService: ApiService) { }

  ngOnInit() {
    this.getComments();
  }

  getComments(){
    const path = `Posts/${this.obj.uid}/comments`;
    this.dbService.getCollection(path).subscribe((resp:any)=> {
      if(resp){
        this.listComments = resp;
      }
    });
  }

  async saveComment(){
    const path = `Posts/${this.obj.uid}/comments`;
    const uid = await this.authService.getUid() || '';
    
    const data: IComment = {
      uid,
      user: null,
      date: new Date(),
      detail: this.comentario
    };
    this.dbService.createDoc(data, path, uid);
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
