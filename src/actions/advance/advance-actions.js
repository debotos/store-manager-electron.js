import database from '../../secrets/firebase';
import {
  ADD_ADVANCE,
  REMOVE_ADVANCE,
  EDIT_ADVANCE,
  SET_ADVANCES
} from '../constants';

// ADD_ADVANCE
export const addAdvance = advance => ({
  type: ADD_ADVANCE,
  advance
});

export const startAddAdvance = (advanceData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = advanceData;
    const advance = { description, note, amount, createdAt };

    return database
      .ref(`users/${uid}/advances`)
      .push(advance)
      .then(ref => {
        dispatch(
          addAdvance({
            id: ref.key,
            ...advance
          })
        );
      });
  };
};

// REMOVE_ADVANCE
export const removeAdvance = ({ id } = {}) => ({
  type: REMOVE_ADVANCE,
  id
});

export const startRemoveAdvance = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/advances/${id}`)
      .remove()
      .then(() => {
        dispatch(removeAdvance({ id }));
      });
  };
};

// EDIT_ADVANCE
export const editAdvance = (id, updates) => ({
  type: EDIT_ADVANCE,
  id,
  updates
});

export const startEditAdvance = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/advances/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editAdvance(id, updates));
      });
  };
};

// SET_ADVANCES
export const setAdvances = advances => ({
  type: SET_ADVANCES,
  advances
});

export const startSetAdvances = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/advances`)
      .once('value')
      .then(snapshot => {
        const advances = [];

        snapshot.forEach(childSnapshot => {
          advances.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        console.log('Got Advance', advances);
        dispatch(setAdvances(advances));
      });
  };
};
