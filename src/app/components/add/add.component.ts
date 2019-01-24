import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../../providers/storage.service';
import { CommandRunnerService } from '../../providers/command-runner.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  titleControl = new FormControl();
  cmdControl = new FormControl();
  titles: string[] = ['Stack Search', 'Github Search', 'BG-License Branch'];
  titlesObservable: Observable<string[]>;
  titleArray: any[] = [];

  commands: string[] = ['ls', 'dir', 'cd ..'];
  cmdObservable: Observable<string[]>;
  cmdArray: any[] = [];

  constructor(private router: Router, private storage: StorageService, private cmdRunner: CommandRunnerService) { }

  ngOnInit() {
    this.titlesObservable = this.titleControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._titleFilter(value))
    );

    this.cmdObservable = this.cmdControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._cmdFilter(value))
    );
    this.storage.addCommand('ls', 'fuckinShiet', (error, data) => {
      console.log(error, 'data', data);
      this.storage.getAllCommands((error, data) => {
        if (error) throw error;
        console.log(data);
      });
    });
  }

  private _titleFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.titleArray = this.titles.filter(option => option.toLowerCase().includes(filterValue));
    return this.titleArray;
  }

  private _cmdFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.cmdArray = this.commands.filter(option => option.toLowerCase().includes(filterValue));
    return this.cmdArray;
  }

  onBackButton(): void {
    this.router.navigate(['/']);
  }

  onSubmit(e, options) {
    if (options[0]) {
      e.target[0].value = options[0];
    }
  }

  onSave() {
    let title = (<HTMLInputElement>document.querySelector('.input-title input')).value;
    let command = (<HTMLInputElement>document.querySelector('.input-command input')).value;
    this.cmdRunner.run(command);
    this.storage.addCommand(title, command, (err, data) => {
      console.log(data);
      console.log(err);
    });
  }

  onSelected() {
    console.log('selected');
  }

  onTitleSubmit(e) {
    if (this.titleArray && this.titleArray.length > 0) {
      console.log(this.titleArray[0]);
      document.querySelectorAll('input')[0].value = this.titleArray[0];
    }
  }

  onTitleSelected() {
    console.log(document.querySelectorAll('input')[0].value);
  }

  onCommandSubmit(e) {
    if (this.cmdArray && this.cmdArray.length > 0) {
      console.log(this.cmdArray[0]);
      document.querySelector('input')[1].value = this.cmdArray[0];
    }
  }

  onCommandSelected() {
    console.log(document.querySelector('input')[1].value);
  }

}
