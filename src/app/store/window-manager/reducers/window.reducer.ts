import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {WindowState} from '../models/window.model';
import {createReducer, on} from '@ngrx/store';
import {closeWindow, openWindow} from '../actions/window.actions';
import {DEFAULT_WINDOWS} from '../models/default-values.const';


export const adapter: EntityAdapter<WindowState> = createEntityAdapter<WindowState>({
  selectId: (window: WindowState) => window.id
});

export interface State extends EntityState<WindowState> {
};

export const initialState: State = adapter.getInitialState(DEFAULT_WINDOWS)

export const windowReducer = createReducer(initialState,
  on(openWindow, (state, {id}) => state),
  on(closeWindow, (state, {id}) => state),
  // TODO créer toute les actions
);
