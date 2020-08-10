import { toggleCreateRoom } from '../createroom';
import { TOGGLE_CREATEROOM } from '../createroom';

describe('Test Action', () => {
    it('should create an action to show createroom box', () => {
        const expectedAction = {
            type: TOGGLE_CREATEROOM
        }
        expect(toggleCreateRoom()).toEqual(expectedAction)
    })
})