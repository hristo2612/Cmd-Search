import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
const storage = require('electron-json-storage');

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getAllCommands() {
    return Observable.create(
      (observer) => {
        storage.getAll((err, data) => {
          if (err) {
            observer.next({err: err});
          }
          observer.next({data: data});
        });
      });
  }

  updateCommand(title, cmd) {
    return Observable.create((observer) => { storage.get(title, (error, cmdObject) => {
        if (error) {
          throw error;
        } else if (cmdObject) {
          storage.set(title || cmdObject.title, { command: cmd || cmdObject.command }, (err, data) => {
            if (err) {
              observer.next({err: err});
            }
            observer.next({data: data});
          });
        }
      });  
    });
  }

  addCommand(title, cmd): Observable<any> {
    return Observable.create((observer) => {
      if (title && cmd) {
        storage.set(title, { command: cmd }, (err, data) => {
          if (err) {
            observer.next({err: err});
          }
          observer.next({data: data});
        });
      }
    });
  }

}
