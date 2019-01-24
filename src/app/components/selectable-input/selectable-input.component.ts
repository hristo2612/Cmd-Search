import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-selectable-input',
  templateUrl: './selectable-input.component.html',
  styleUrls: ['./selectable-input.component.scss']
})
export class SelectableInputComponent implements OnInit {
  @Input() inputPlaceholder: string;
  @Input() options: string[] = ['Stack Search', 'Github Search', 'Open Sth'];
  @Input() onFormSubmit: void;
  @Input() onSelectedOption: void;
  @Output() onFiltered = new EventEmitter<any>();

  formControl = new FormControl();
  filteredOptions: Observable<string[]>;
  filteredArrayOptions: any[] = [];

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filterBy(value)
      })
    );
  }

  private _filterBy(value) {
    const filterValue = value.toLowerCase();
    // filter options based on filterValue
    
    this.filteredArrayOptions = this.options.filter((option) => {
      return option.toLowerCase().includes(filterValue)
    });

    this.onFiltered.emit(this.filteredArrayOptions);

    return this.filteredArrayOptions;
  }
}
