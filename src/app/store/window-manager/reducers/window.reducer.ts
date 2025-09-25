import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {WindowState} from '../models/window.model';
import {DEFAULT_WINDOWS} from '../models/default-values.const';


export const adapter: EntityAdapter<WindowState> = createEntityAdapter<WindowState>({
  selectId: (window: WindowState) => window.id
});

export interface State extends EntityState<WindowState> {
};

export const initialState: State = adapter.getInitialState({}, DEFAULT_WINDOWS)
