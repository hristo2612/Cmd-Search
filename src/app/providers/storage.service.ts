import { Injectable } from '@angular/core';
const storage = require('electron-json-storage');

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getAllCommands(callback) {
    storage.getAll(callback);
  }

  updateCommand(title, cmd, callback) {
    storage.get(title, (error, cmdObject) => {
      if (error) {
        throw error;
      } else if (cmdObject) {
        storage.set(title || cmdObject.title, { command: cmd || cmdObject.command }, callback);
      }
    });
    
  }

  addCommand(title, cmd, callback) {
    if (title && cmd) {
      storage.set(title, { command: cmd }, callback);
    }
  }

}
