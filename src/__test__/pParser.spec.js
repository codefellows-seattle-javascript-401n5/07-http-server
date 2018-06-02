'use strict';

let parser = require('../../src/lib/parser.js');

describe('URL Parser', () => {

  xit('requires a request object', () => {
    let req = undefined;
    return parser(req)
      .then( response => false )
      .catch( err => expect(err).toBeDefined() );
  });

  xit('requires a req object with a url', () => {
    let req = {};
    return parser(req)
      .then( response => false )
      .catch( err => expect(err).toBeDefined() );
  });

  xit('given a url returns an object', () => {
    let req = { url: 'http://localhost' };
    return parser(req)
      .then( request => expect(typeof request.url).toEqual('object') )
      .catch( err => false );
  });

  xit('given a complicated url, does all the things', () => {
    let req = { method:'GET', url: 'http://localhost?a=b&c=d' };
    return parser(req)
      .then( request => {
        expect(request.url.query.a).toEqual('b');
        expect(request.url.query.c).toEqual('d');
      })
      .catch( console.error );
  });

});