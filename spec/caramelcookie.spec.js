// browser emulation libs for node.js not yet sufficient using here.
// poor mans tests.

import test from 'ava';
import Cookie from '../caramelcookie.js';

Cookie.prototype.setDocCookieStr = function (str) { return str; };
Cookie.prototype.getDocCookieStr = function () {};

test('should return with name default, `` (none)', t => {
    var cookie = Cookie.getNew();
    t.is( cookie.name, '' );
});

test('should return with name given, `testname`', t => {
    var cookie = Cookie.getNew('testname');
    t.is( cookie.name, 'testname' );    
});

test('should return with value default, `` (none)', t => {
    var cookie = Cookie.getNew();
    t.is( cookie.value, '' );    
});

test('should return with value given, `testvalue`', t => {
    var cookie = Cookie.getNew('testname', 'testvalue');
    t.is( cookie.value, 'testvalue' );    
});

test('should return with expiration default, `` (none)', t => {
    var cookie = Cookie.getNew();
    t.is( cookie.expires, '' );    
});

test('should return with expiration given, `1365222221485`', t => {
    var cookie = Cookie.getNew('testname', 'testval', {
        //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
        //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
        expires : 1365222221485        
    });
    t.is( cookie.expires, 1365222221485 );    
});


test('should return with path default, `/`', t => {
    var cookie = Cookie.getNew();
    t.is( cookie.path, '/' );
});

test('should return with path given, `/signin`', t => {
    var cookie = Cookie.getNew('testname', 'testval', {
        path : '/signin'
    });
    t.is( cookie.path,'/signin');
});


test('should return with domain default, `.defaultdomain.com`', t => {
    var cookie = Cookie.getNew();
    t.is( cookie.domain, '.defaultdomain.com' );
});

test('should return with domain given, `.test.com`', t => {
    var cookie = Cookie.getNew('testname', 'testval', {
        domain : '.test.com'
    });
    t.is( cookie.domain,'.test.com');
});


test('should return with secure default, `false`', t => {
    var cookie = Cookie.getNew();
    t.is( cookie.secure,false);
});

test('should return with secure given, `true`', t => {
    var cookie = Cookie.getNew('testname', 'testval', {
        secure : true
    });
    t.is( cookie.secure,true);
});

test('rm should attempt to remove a named cookie', t => {
    var result, resultExpected;
    var cookie = Cookie.getNew('testcookie', 'value', {
        expires : { hh : 2 }
    });

    Cookie.rm('testcookie');
    cookie.rm();

    result = cookie.getAsCookieStr();
    resultExpected = 'testcookie=value;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.defaultdomain.com;path=/';

    t.is( result, resultExpected );    
});

test('getAsCrumbStr should return an object as a string', t => {
    var result = Cookie.prototype.getAsCrumbStr({ prop1 : 'val1', prop2 : 'val2' }),
        resultExpected = '{"prop1":"val1","prop2":"val2"}';
    
    t.is( result, resultExpected );
});

test('getAsCrumbStr should return a string as a string', t => {
    var result = Cookie.prototype.getAsCrumbStr('aval'),
        resultExpected = 'aval';
    
    t.is( result, resultExpected );
});

test('getAsCrumbStr should return a string with trailing commas removed', t => {
    var result = Cookie.prototype.getAsCrumbStr('aval,,,,'),
        resultExpected = 'aval';
    
    t.is( result, resultExpected );
});

test('getAsCrumbStr should return a numeric value if a numeric value is given', t => {
    var result = Cookie.prototype.getAsCrumbStr(1),
        resultExpected = 1;
    
    t.is( result, resultExpected );
});

test('getAsDomainStr should return a domain, prefixed with `.`', t => {
    var domain = 'foxsports.com';
    var result = Cookie.prototype.getUrlAsDomainStr(domain),
        resultExpected = '.foxsports.com';

    t.is( result, resultExpected );
});


test('getAsDomainStr should return a top level domain from a subdomain url', t => {
    var domain = 'qa.foxsports.com';
    var result = Cookie.prototype.getUrlAsDomainStr(domain),
        resultExpected = '.foxsports.com';

    t.is( result, resultExpected );
});

test('getAsDomainStr should return a top leval domain from a subdomain url', t => {
    var domain = '127.0.0.1';
    var result = Cookie.prototype.getUrlAsDomainStr(domain),
        resultExpected = '127.0.0.1';

    t.is( result, resultExpected );
});



test('getAsCookieStr should return a valid cookie string, with given `name`, `value`', t => {
    var result = Cookie.getNew('testcookie', 'testcookieValue').getAsCookieStr();

    var resultExpected = 'testcookie=testcookieValue;domain=.defaultdomain.com;path=/';
    t.is( result, resultExpected );
});

test('getAsCookieStr should return a valid cookie string, with given `name`, `value`, `expires`', t => {
    var result = Cookie.getNew('testcookie', 'testcookieValue', {
        //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
        expires : 1365222221485
    }).getAsCookieStr();

    var resultExpected = 'testcookie=testcookieValue;expires=Sat, 06 Apr 2013 04:23:41 GMT;domain=.defaultdomain.com;path=/';
    t.is( result, resultExpected );
});

test('getAsCookieStr should return a valid cookie string, with given `name`, `value`, `domain`', t => {
    var result = Cookie.getNew('testcookie', 'testcookieValue', {
        domain : 'testDomain.com'
    }).getAsCookieStr();

    var resultExpected = 'testcookie=testcookieValue;domain=testDomain.com;path=/';
    t.is( result, resultExpected );
});

test('getAsCookieStr should return a valid cookie string, with given `name`, `value`, `path`', t => {
    var result = Cookie.getNew('testcookie', 'testcookieValue', {
        path : '/signin'
    }).getAsCookieStr();

    var resultExpected = 'testcookie=testcookieValue;domain=.defaultdomain.com;path=/signin';
    t.is( result, resultExpected );
});

test('getAsCookieStr should return a valid cookie string, with given `name`, `value`, `expires`, `domain`, `path`', t => {
    var result = Cookie.getNew('testcookie', 'testcookieValue', {
        //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
        expires : 1365222221485,
        domain : 'testDomain.com',
        path : '/signin'
    }).getAsCookieStr();
    var resultExpected = 'testcookie=testcookieValue;expires=Sat, 06 Apr 2013 04:23:41 GMT;domain=testDomain.com;path=/signin';
    t.is( result, resultExpected );
});

test('setExpire should accept parameter, new Date()', t => {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date();
    var cookie = Cookie.getNew({
        name : 'testcookie',
        value : 'testcookieValue'
    });

    cookie.setExpires(date);
    t.is( cookie.expires, date );
});

test('setExpire should accept parameter, 1365222221485', t => {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = 1365222221485;
    var cookie = Cookie.getNew({
        name : 'testcookie',
        value : 'testcookieValue'
    });

    cookie.setExpires(date);
    t.is( cookie.expires, date );
});

test('setExpire should accept parameter, { hh : 1 }', t => {
    var date = new Date();
    var cookie = Cookie.getNew({
        name : 'testcookie',
        value : 'testcookieValue'
    });

    var resultExpected = new Date(Date.now() + 3600000);
    cookie.setExpires({ hh : 1 });

    t.is( cookie.expires.getTime(), resultExpected.getTime() );
});

test('setExpire should accept parameter, { mm : 1 }', t => {
    var date = new Date();
    var cookie = Cookie.getNew({
        name : 'testcookie',
        value : 'testcookieValue'
    });

    var resultExpected = new Date(Date.now() + 60000);
    cookie.setExpires({ mm : 1 });

    t.is( 
        ((cookie.expires.getTime() + 100) > resultExpected.getTime()) &&
            ((cookie.expires.getTime() - 100) < resultExpected.getTime()),
        true );
});

test('setExpire should accept parameter, { ss : 1 }', t => {
    var date = new Date();
    var cookie = Cookie.getNew({
        name : 'testcookie',
        value : 'testcookieValue'
    });

    var resultExpected = new Date(Date.now() + 1000);
    cookie.setExpires({ ss : 1 });

    t.is( 
        ((cookie.expires.getTime() + 100) > resultExpected.getTime()) &&
            ((cookie.expires.getTime() - 100) < resultExpected.getTime()),
        true );
});

test('setExpire should accept parameter, { hh : 1, mm : 1, ss : 1 }', t => {
    var date = new Date();
    var cookie = Cookie.getNew({
        name : 'testcookie',
        value : 'testcookieValue'
    });

    var resultExpected = new Date(Date.now() + 3661000);
    cookie.setExpires({ hh : 1, mm : 1, ss : 1 });

    t.is( 
        ((cookie.expires.getTime() + 100) > resultExpected.getTime()) &&
            ((cookie.expires.getTime() - 100) < resultExpected.getTime()),
    true );
});

