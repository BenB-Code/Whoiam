import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderText } from './placeholder-text';
import { provideZonelessChangeDetection } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('Component - PlaceholderText', () => {
  let component: PlaceholderText;
  let fixture: ComponentFixture<PlaceholderText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [PlaceholderText, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceholderText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
