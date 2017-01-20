import { expect } from 'chai';
import { sign } from 'jsonwebtoken';
import { getTokenExpirationDate, isTokenExpired, calculateTokenTimeLeft } from './index';

describe('Token Verification Fetatures:', () => {
  describe('getTokenExpirationDate function', () => {
    it('should return if token does not have expiration date', () => {
      const token = sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
      const actual = getTokenExpirationDate(token);

      expect(actual).to.be.null;
    });

    it('should get token\'s expiration date', () => {
      const today = new Date().setUTCMilliseconds(0);
      const token = sign({ foo: 'bar', exp: Math.floor(today / 1000) }, 'shhhhh');
      const actual = getTokenExpirationDate(token).getTime();

      expect(actual).to.be.equals(today);
    });
  });

  describe('isTokenExpired function', () => {
    it('should return false. (No exp in token)', () => {
      const token = sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
      const actual = isTokenExpired(token);

      expect(actual).to.be.false;
    });

    it('should return true. Token has expired (exp < Now)', () => {
      const today = new Date();
      const exp = new Date(today.setUTCHours(today.getHours() - 1))
        .setUTCMilliseconds(0);
      const token = sign({ foo: 'bar', exp: Math.floor(exp / 1000) }, 'shhhhh');
      const actual = isTokenExpired(token);

      expect(actual).to.be.true;
    });

    it('should return true. Token is valid (exp > Now)', () => {
      const today = new Date();
      const exp = new Date(today.setUTCHours(today.getHours() + 1))
        .setUTCMilliseconds(0);
      const token = sign({ foo: 'bar', exp: Math.floor(exp / 1000) }, 'shhhhh');
      const actual = isTokenExpired(token);

      expect(actual).to.be.false;
    });
  });

  describe('isTokenExpired function', () => {
    it('should return -1. (No exp in token)', () => {
      const token = sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
      const actual = calculateTokenTimeLeft(token);

      expect(actual).to.be.equals(-1);
    });

    it('should return 3600 * 1000. (No exp in token)', () => {
      const today = new Date();
      const exp = new Date(today.setUTCHours(today.getHours() + 1))
        .setUTCMilliseconds(0);
      const token = sign({ foo: 'bar', exp: Math.floor(exp / 1000) }, 'shhhhh');
      const actual = calculateTokenTimeLeft(token);

      expect(actual).to.be.equals(60 * 60 * 1000);
    });

    it('should return -3600 * 1000. (No exp in token)', () => {
      const today = new Date();
      const exp = new Date(today.setUTCHours(today.getHours() - 1))
        .setUTCMilliseconds(0);
      const token = sign({ foo: 'bar', exp: Math.floor(exp / 1000) }, 'shhhhh');
      const actual = calculateTokenTimeLeft(token);

      expect(actual).to.be.equals(-60 * 60 * 1000);
    });
  });
});
