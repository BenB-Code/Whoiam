import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CLOSED, CONTACT, EXPERIENCES, HOME, PROJECTS, WindowType } from '../../store';
import { AsyncPipe } from '@angular/common';
import { ContactsService } from '../../services/contact/contacts.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';

@Component({
  selector: 'app-app-bar',
  imports: [AsyncPipe],
  templateUrl: './app-bar.html',
  styleUrl: './app-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBar implements OnInit {
  protected readonly contactsService = inject(ContactsService);
  protected readonly navigationService: NavigationService = inject(NavigationService);
  protected readonly HOME = HOME;
  protected readonly CLOSED = CLOSED;
  protected readonly EXPERIENCES = EXPERIENCES;
  protected readonly PROJECTS = PROJECTS;
  protected readonly CONTACT = CONTACT;
  private readonly windowManagerService = inject(WindowManagerService);
  windowState$ = this.windowManagerService.selectAllWindows();

  ngOnInit(): void {
    this.contactsService.loadContacts();
  }

  onAppClick(id: WindowType): void {
    this.windowManagerService.openWindow(id);
  }
}
