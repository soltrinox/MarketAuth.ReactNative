
import type { Action } from './types';

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export function openDrawer():Action {
  return {
    type: OPEN_DRAWER,
  };
}

export function closeDrawer():Action {
  return {
    type: CLOSE_DRAWER,
  };
}




export function selectCategory():Action {
    return {
        type: SELECT_CATEGORY,
    };
}


