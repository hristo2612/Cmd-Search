import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../../providers/storage.service';
import { CommandRunnerService } from '../../providers/command-runner.service';
const storage = require('electron-json-storage');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: any = [];
  filteredOptions: Observable<string[]>;
  filteredArrayOptions: any[] = [];
  isFilterActive: boolean = false;

  constructor(private router: Router, private storage: StorageService, private cmdRunner: CommandRunnerService) {
    
  }

  ngOnInit() {
    setTimeout(() => {
      this.storage.getAllCommands((error, data) => {
        if (error) throw error;
        console.log(data);
        for (let option in data) {
          if (data.hasOwnProperty(option)){
            this.options.push({title: option, command: data[option].command});
          }
        }
        // this.filteredOptions = this.myControl.valueChanges
        // .pipe(
        //   startWith(''),
        //   map(value => this._filter(value))
        // );
      });
    }, 997);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.isFilterActive = filterValue.trim().length > 0 ? true : false;
    this.filteredArrayOptions = this.options.filter(option => option.title.toLowerCase().includes(filterValue));
    return this.filteredArrayOptions;
  }

  onFiltered(options) {
    
  }

  optionSelected(e) {
    console.log(this.filteredArrayOptions);
    if (this.filteredArrayOptions && this.filteredArrayOptions.length && this.filteredArrayOptions[0]) {
      console.log(this.filteredArrayOptions[0]);
      document.querySelector('input').value = this.filteredArrayOptions[0];
    }
  }

  barOptionSelected(e) {
    console.log(this.filteredArrayOptions);
    this.cmdRunner.run(this.filteredArrayOptions[0].command);
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
