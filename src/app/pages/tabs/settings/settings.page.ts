import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { from } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/guards/save-changes.guard';
import { EQuestionDifficulty } from 'src/app/interfaces/questions';
import { ISettings, STORAGE_KEYS } from 'src/app/interfaces/storage';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, ComponentCanDeactivate {
  readonly DIFFICULTY_ENUM: typeof EQuestionDifficulty = EQuestionDifficulty;
  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    public authService: AuthService,
    @Inject(DOCUMENT) public document: Document
  ) {}

  async ngOnInit() {
    this.settingsForm = this.fb.group({
      difficulty: [EQuestionDifficulty.medium, Validators.required],
    });
    const settings = await this.storageService.get<ISettings>(
      STORAGE_KEYS.settings
    );
    if (settings) {
      this.settingsForm.setValue(settings);
    }
  }

  canDeactivate() {
    return this.save();
  }

  save() {
    return from(
      this.storageService.set(STORAGE_KEYS.settings, this.settingsForm.value)
    );
  }
}
