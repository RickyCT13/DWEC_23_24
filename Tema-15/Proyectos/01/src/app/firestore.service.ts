import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// npm install firebase @angular/fire --save

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {}

  public create(collection: string, data: any) {
    return this.angularFirestore.collection(collection).add(data);
  }

  public getAll(collection: string) {
    return this.angularFirestore.collection(collection).snapshotChanges();
  }

  public read(collection: string, documentId: string) {
    return this.angularFirestore
      .collection(collection)
      .doc(documentId)
      .snapshotChanges();
  }

  public delete(collection: string, documentId: string) {
    return this.angularFirestore.collection(collection).doc(documentId).delete();
  }

  public update(collection: string, documentId: string, data: any) {
    return this.angularFirestore
      .collection(collection)
      .doc(documentId)
      .set(data);
  }

  /*
    Manejo de imágenes
  */
  
  /*
    Método para subir imágenes al Storage de nuestro proyecto.
  */
  public uploadImageB64(dirName: string, fileName: string, imgBase64: string) {
    let storageRef = this.angularFireStorage.ref(dirName).child(fileName);
    return storageRef.putString(imgBase64, 'data_url');
  }

  /*
    Método para actualizar un archivo dada su URL
  */
  public deleteFile(url: string) {
    return this.angularFireStorage.storage.refFromURL(url).delete();
  }
}
