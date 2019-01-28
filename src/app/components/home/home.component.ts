import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../../providers/storage.service';
import { CommandRunnerService } from '../../providers/command-runner.service';
import cmd from 'node-cmd';
const storage = require('electron-json-storage');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  filteredArrayOptions: any[] = [];
  isFilterActive: boolean = false;

  constructor(private router: Router, private storage: StorageService, private cmdRunner: CommandRunnerService) {
    
  }

  ngOnInit() {
    this.storage.getAllCommands().subscribe((value) => {
      console.log(value.data);
      let data = value.data;

      for (let option in data) {
        if (data.hasOwnProperty(option)){
          console.log(option);
          this.options = [...this.options, {title: option, command: data[option].command}];
          //this.options.push({title: option, command: data[option].command});
        }
      }
    });
  }

  onFiltered(options) {
    console.log('options', options);
  }

  optionSelected(e) {
    console.log('Selected', this.filteredArrayOptions);
    if (this.filteredArrayOptions && this.filteredArrayOptions.length && this.filteredArrayOptions[0]) {
      console.log(this.filteredArrayOptions[0]);
      document.querySelector('input').value = this.filteredArrayOptions[0].title;
      cmd.get(
        `${this.filteredArrayOptions[0].command}`,
        function(err, data, stderr) {
          if (!err) {
            console.log(
              "Data:\n\n",
              data
            );
          } else {
            console.log("error", err);
          }
        }
      );
    }
  }

  barOptionSelected(e) {
    console.log('Selected 2', this.filteredArrayOptions);
    console.log(document.querySelector('input').value);
  }

  onAddItem() {
    this.router.navigate(['/add']);
  }

  onSettingsOpen() {
    this.router.navigate(['/settings']);
  }

  clearField() {
    this.myControl.setValue('');
    document.querySelector('input').focus();
  }

}
