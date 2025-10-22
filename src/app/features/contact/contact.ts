import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ContentWindow } from '../../common/components/content-window/content-window';
import { ContactsService } from '../../services/contact/contacts.service';
import { Spinner } from '../../common/components/spinner/spinner';
import { WindowActions } from '../../common/directives';
import { NavigationService } from '../../services/navigation/navigation.service';
import { PlaceholderText } from '../../common/components/placeholder-text/placeholder-text';
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentConstantsAbstract } from '../../common/models/component-constants.abstract';

@Component({
  selector: 'app-contact',
  imports: [ContentWindow, AsyncPipe, Spinner, WindowActions, PlaceholderText, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact extends ComponentConstantsAbstract {
  contactWindow$ = this.windowManagerService.selectWindowById(this.CONTACT);
  protected readonly navigationService: NavigationService = inject(NavigationService);
  protected readonly contactsService = inject(ContactsService);
}
