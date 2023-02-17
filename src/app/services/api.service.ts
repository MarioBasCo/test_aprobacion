import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: AngularFirestore) { }

  getCollection(path: string) {
    const collection = this.firestore.collection(path);
    return collection.valueChanges({idField: 'uid'});
  }

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<tipo>(path:string, id:string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  updateDoc(data:any, path:string, id:string){
    return this.firestore.collection(path).doc(id).update(data);
  }

  getCollectionPosts() {
    const name = 'Posts';
    return this.getCollection(name);
  }
}
