import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-selectable-input',
  templateUrl: './selectable-input.component.html',
  styleUrls: ['./selectable-input.component.scss']
})
export class SelectableInputComponent implements OnInit, OnChanges {
  @Input() inputPlaceholder: string;
  @Input() options: string[] = ['Stack Search', 'Github Search', 'Open Sth'];
  @Input() onFormSubmit: any;
  @Input() onSelectedOption: any;
  @Output() onFiltered = new EventEmitter<any>();

  formControl = new FormControl();
  optionsArray: any[] = [];
  filteredOptions: Observable<string[]>;
  filteredArrayOptions: any[] = [];

  constructor() { }

  ngOnInit() {
    this.optionsArray = this.options;
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filterBy(value)
      })
    );

    this.filteredOptions.subscribe((value) => {
      this.optionsArray = value;
    });
  }

  ngOnChanges(changes) {
    if (changes.options) {
      this.optionsArray = this.options;
    }
  }

  private _filterBy(value) {
    const filterValue = value.toLowerCase();
    // filter options based on filterValue
    
    this.filteredArrayOptions = this.options.filter((option: any) => {
      console.log(option.title);
      return option.title.toLowerCase().includes(filterValue)
    });

    this.onFiltered.emit(this.filteredArrayOptions);

    return this.filteredArrayOptions;
  }
}
