import { Injectable } from '@angular/core';
import { Position } from '../../store';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class DragNDropService {
  private _boundaries: DOMRect | undefined;

  set boundaries(e: DOMRect | undefined) {
    this._boundaries = e;
  }

  processNewPosition(childPositions: CdkDragEnd): Position {
    const element = childPositions.source.getRootElement();
    const elementRect = element.getBoundingClientRect();

    const x = elementRect.x + (this._boundaries?.x || 0);
    const y = elementRect.y - (this._boundaries?.y || 0);

    const xPositive = x >= 0 ? x : 0;
    const yPositive = y >= 0 ? y : 0;

    return { x: `${xPositive}px`, y: `${yPositive}px`, transform: 'none' };
  }
}
