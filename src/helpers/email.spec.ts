import { email as Email } from './email';

describe('Given a function Email', () => {
    describe('When it is called', () => {
        it('It should compare', () => {
            expect(Email('test')).toBe(false);
        });
    });
    describe('When it is called', () => {
        it('It should compare', () => {
            expect(Email('test@test.com')).toBe(true);
        });
    });
});
