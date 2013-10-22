// browser emulation libs for node.js not yet sufficient using here.
// poor mans tests.

var Cookie = require('../juicy-cookie');
var SimpleTime = require('simpletime');


Cookie.prototype.setDocCookieStr = function (str) { return str; };
Cookie.prototype.getDocCookieStr = function () {};

describe("Cookie.getNew", function () {

  it("should return with name default, `` (none)", function () {
    var cookie = Cookie.getNew();
    expect( cookie.name ).toBe( '' );    
  });

  it("should return with name given, `testname`", function () {
    var cookie = Cookie.getNew('testname');
    expect( cookie.name ).toBe( 'testname' );    
  });

  it("should return with value default, `` (none)", function () {
    var cookie = Cookie.getNew();
    expect( cookie.value ).toBe( '' );    
  });

  it("should return with value given, `testvalue`", function () {
    var cookie = Cookie.getNew('testname', 'testvalue');
    expect( cookie.value ).toBe( 'testvalue' );    
  });

  it("should return with expiration default, `` (none)", function () {
    var cookie = Cookie.getNew();
    expect( cookie.expires ).toBe( '' );    
  });

  it("should return with expiration given, `1365222221485`", function () {
    var cookie = Cookie.getNew('testname', 'testval', {
      //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
      expires : 1365222221485
    });
    expect( cookie.expires ).toBe( 1365222221485 );    
  });


  it("should return with path default, `/`", function () {
    var cookie = Cookie.getNew();
    expect( cookie.path ).toBe('/');
  });

  it("should return with path given, `/signin`", function () {
    var cookie = Cookie.getNew('testname', 'testval', {
      path : '/signin'
    });
    expect( cookie.path ).toBe('/signin');
  });


  it("should return with domain default, `.defaultdomain.com`", function () {
    var cookie = Cookie.getNew();
    expect( cookie.domain ).toBe( '.defaultdomain.com' );
  });

  it("should return with domain given, `.test.com`", function () {
    var cookie = Cookie.getNew('testname', 'testval', {
      domain : '.test.com'
    });
    expect( cookie.domain ).toBe('.test.com');
  });


  it("should return with secure default, `false`", function () {
    var cookie = Cookie.getNew();
    expect( cookie.secure ).toBe(false);
  });

  it("should return with secure given, `true`", function () {
    var cookie = Cookie.getNew('testname', 'testval', {
      secure : true
    });
    expect( cookie.secure ).toBe(true);
  });

});


describe("Cookie.rm", function () {

  it("should attempt to remove a named cookie", function () {
    var result, resultExpected;
    var cookie = Cookie.getNew('testcookie', 'value', {
      expires : { hh : 2 }
    });

    Cookie.rm('testcookie');
    cookie.rm();

    result = cookie.getAsCookieStr();
    resultExpected = 'testcookie=value;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.defaultdomain.com;path=/';

    expect( result ).toBe( resultExpected );    
  });

});



describe("Cookie.prototype.getAsCrumbStr", function () {

  it("should return an object as a string", function () {
    var result = Cookie.prototype.getAsCrumbStr({ prop1 : 'val1', prop2 : 'val2' }),
        resultExpected = '{"prop1":"val1","prop2":"val2"}';

    expect( result ).toBe( resultExpected );
  });

  it("should return a string as a string", function () {
    var result = Cookie.prototype.getAsCrumbStr('aval'),
        resultExpected = 'aval';

    expect( result ).toBe( resultExpected );
  });

  it("should return a string with trailing commas removed", function () {
    var result = Cookie.prototype.getAsCrumbStr('aval,,,,'),
        resultExpected = 'aval';

    expect( result ).toBe( resultExpected );
  });

  it("should return a numeric value if a numeric value is given", function () {
    var result = Cookie.prototype.getAsCrumbStr(1),
        resultExpected = 1;

    expect( result ).toBe( resultExpected );
  });

});


describe("Cookie.prototype.getAsDomainStr", function () {

  it("should return a domain, prefixed with `.`", function () {
     var domain = 'foxsports.com';
     var result = Cookie.prototype.getUrlAsDomainStr(domain),
         resultExpected = '.foxsports.com';

    expect( result ).toBe( resultExpected );
  });


  it("should return a top level domain from a subdomain url", function () {
     var domain = 'qa.foxsports.com';
     var result = Cookie.prototype.getUrlAsDomainStr(domain),
         resultExpected = '.foxsports.com';

    expect( result ).toBe( resultExpected );
  });

  it("should return a top leval domain from a subdomain url", function () {
     var domain = '127.0.0.1';
     var result = Cookie.prototype.getUrlAsDomainStr(domain),
         resultExpected = '127.0.0.1';

    expect( result ).toBe( resultExpected );
  });


});




describe("Cookie.prototype.getAsCookieStr", function () {

  it("should return a valid cookie string, with given `name`, `value`", function () {
    var result = Cookie.getNew('testcookie', 'testcookieValue').getAsCookieStr();

    var resultExpected = 'testcookie=testcookieValue;domain=.defaultdomain.com;path=/';
    expect( result ).toBe( resultExpected );

  });

  it("should return a valid cookie string, with given `name`, `value`, `expires`", function () {
    var result = Cookie.getNew('testcookie', 'testcookieValue', {
      //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
      expires : 1365222221485
    }).getAsCookieStr();

    var resultExpected = 'testcookie=testcookieValue;expires=Sat, 06 Apr 2013 04:23:41 GMT;domain=.defaultdomain.com;path=/';
    expect( result ).toBe( resultExpected );
  });

  it("should return a valid cookie string, with given `name`, `value`, `domain`", function () {
    var result = Cookie.getNew('testcookie', 'testcookieValue', {
      domain : 'testDomain.com'
    }).getAsCookieStr();

    var resultExpected = 'testcookie=testcookieValue;domain=testDomain.com;path=/';
    expect( result ).toBe( resultExpected );
  });

  it("should return a valid cookie string, with given `name`, `value`, `path`", function () {
    var result = Cookie.getNew('testcookie', 'testcookieValue', {
      path : '/signin'
    }).getAsCookieStr();

    var resultExpected = 'testcookie=testcookieValue;domain=.defaultdomain.com;path=/signin';
    expect( result ).toBe( resultExpected );
  });

  it("should return a valid cookie string, with given `name`, `value`, `expires`, `domain`, `path`", function () {
    var result = Cookie.getNew('testcookie', 'testcookieValue', {
      //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
      expires : 1365222221485,
      domain : 'testDomain.com',
      path : '/signin'
    }).getAsCookieStr();
    var resultExpected = 'testcookie=testcookieValue;expires=Sat, 06 Apr 2013 04:23:41 GMT;domain=testDomain.com;path=/signin';
    expect( result ).toBe( resultExpected );
  });

});


describe("Cookie.prototype.setExpire", function () {

  it("should accept parameter, new Date()", function () {  
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date();
    var cookie = Cookie.getNew({
      name : 'testcookie',
      value : 'testcookieValue'
    });

    cookie.setExpires(date);
    expect( cookie.expires ).toBe( date );
  });

  it("should accept parameter, 1365222221485", function () {  
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = 1365222221485;
    var cookie = Cookie.getNew({
      name : 'testcookie',
      value : 'testcookieValue'
    });

    cookie.setExpires(date);
    expect( cookie.expires ).toBe( date );
  });

  it("should accept parameter, { hh : 1 }", function () {  
    var date = new Date();
    var cookie = Cookie.getNew({
      name : 'testcookie',
      value : 'testcookieValue'
    });

    var resultExpected = new Date(Date.now() + 3600000);
    cookie.setExpires({ hh : 1 });

    expect( cookie.expires.getTime() ).toBe( resultExpected.getTime() );
  });


  it("should accept parameter, { mm : 1 }", function () {  
    var date = new Date();
    var cookie = Cookie.getNew({
      name : 'testcookie',
      value : 'testcookieValue'
    });

    var resultExpected = new Date(Date.now() + 60000);
    cookie.setExpires({ mm : 1 });

    expect( 
      ((cookie.expires.getTime() + 100) > resultExpected.getTime()) &&
      ((cookie.expires.getTime() - 100) < resultExpected.getTime())          
    ).toBe( true );
  });

  it("should accept parameter, { ss : 1 }", function () {  
    var date = new Date();
    var cookie = Cookie.getNew({
      name : 'testcookie',
      value : 'testcookieValue'
    });

    var resultExpected = new Date(Date.now() + 1000);
    cookie.setExpires({ ss : 1 });

    expect( 
      ((cookie.expires.getTime() + 100) > resultExpected.getTime()) &&
      ((cookie.expires.getTime() - 100) < resultExpected.getTime())          
    ).toBe( true );
  });

  it("should accept parameter, { hh : 1, mm : 1, ss : 1 }", function () {  
    var date = new Date();
    var cookie = Cookie.getNew({
      name : 'testcookie',
      value : 'testcookieValue'
    });

    var resultExpected = new Date(Date.now() + 3661000);
    cookie.setExpires({ hh : 1, mm : 1, ss : 1 });

    expect( 
      ((cookie.expires.getTime() + 100) > resultExpected.getTime()) &&
      ((cookie.expires.getTime() - 100) < resultExpected.getTime())          
    ).toBe( true );
  });

});

