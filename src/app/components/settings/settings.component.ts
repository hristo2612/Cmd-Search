import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBackButton(): void {
    this.router.navigate(['/']);
  }

  onSubmit(e, filteredOptions) {
    if (filteredOptions[0]) {
      e.target[0].value = filteredOptions[0];
    }
  }

  onSelected() {
    console.log('selected option');
  }
}
