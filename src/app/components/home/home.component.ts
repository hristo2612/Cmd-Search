import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['Stack Search', 'Github Search', 'BG-License Branch'];
  filteredOptions: Observable<string[]>;
  filteredArrayOptions: any[] = [];

  constructor() {
    
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  optionSelected(e) {
    if (this.filteredArrayOptions && this.filteredArrayOptions.length && this.filteredArrayOptions[0]) {
      console.log(this.filteredArrayOptions[0]);
      document.querySelector('input').value = this.filteredArrayOptions[0];
    }
  }

  barOptionSelected(e) {
    console.log(document.querySelector('input').value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.filteredArrayOptions = this.options.filter(option => option.toLowerCase().includes(filterValue));
    return this.filteredArrayOptions;
  }

}
