import { validateClaims } from './helpers';
import { permissionConstants } from './constants';

describe('permission helpers', () => {
  describe('validateClaims', () => {
    it('should be a function', () => {
      expect(typeof validateClaims).toBe('function');
    });

    it('lowercases claims', () => {
      const res = validateClaims({ Author: false });
      expect(res).toEqual({ author: false });
    });

    it('trims whitespace in claims', () => {
      // eslint-disable-next-line
      const res = validateClaims({   author  : false });
      expect(res).toEqual({ author: false });
    });

    it('returned claim value equals true when given true', () => {
      const res = validateClaims({ author: true });
      expect(res.author).toEqual(true);
    });

    it('returned claim value equals false when given false', () => {
      const res = validateClaims({ author: false });
      expect(res.author).toEqual(false);
    });

    it('removes claims with invalid keys and/or values', () => {
      const res = validateClaims({ foo: 'bar', author: 'fred', editor: true });
      expect(res).toEqual({ editor: true });
    });

    const testAllPermissionConstants = () => {
      Object.keys(permissionConstants).forEach((constant) => {
        it(`should return ${constant} in claim when given ${constant}`, () => {
          const res = validateClaims({ [constant]: true });
          expect(res).toEqual({ [constant]: true });
        });
      });
    };
    testAllPermissionConstants();

    it('should return an object', () => {
      expect(typeof validateClaims()).toBe('object');
    });
  });
});
