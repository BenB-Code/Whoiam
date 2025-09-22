import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-content-window',
    imports: [],
    templateUrl: './content-window.html',
    styleUrl: './content-window.scss'
})
export class ContentWindow {
    @Output() closeEvent = new EventEmitter<void>();
    @Output() fullscreenEvent = new EventEmitter<boolean>();
    @Output() reduceEvent = new EventEmitter<void>();

    isFullscreen: boolean = false;

    close() {
        this.closeEvent.emit();
    }

    fullscreen() {
        this.isFullscreen = !this.isFullscreen;
        this.fullscreenEvent.emit(this.isFullscreen);
    }

    reduce() {
        this.reduceEvent.emit();
    }
}
