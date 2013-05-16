// Filename: JuciyCookie.js  
// Timestamp: 2013.05.16-16:24:23 (last modified)  
// Author(s): 
// Requires: SimpleTime.js

var SimpleTime = require('simpletime');

var JuicyCookie = module.exports = (function () {

  // replace commas with bars, to normalize cookie parsing of json

  var cookie = {
    name : '', // must be lowercase
    value : '',
    expires : '',
    domain : 'localhost',
    path : '/',
    secure : false,

    setDocCookieStr : function (cookieStr) {
      document.cookie = cookieStr;    
    },

    getDocCookieStr : function () {
      return document.cookie;
    },

    getAsCookieStr : function () {
      var that = this,
          finStr = that.name + "=" + escape(that.value);

      finStr += that.expires ? ";expires=" + (new Date(that.expires)).toGMTString() : '';
      finStr += that.domain ? ";domain=" + that.domain : '';
      finStr += that.path ? ";path=" + that.path : '';
      finStr += that.secure ? ";secure" : ';';

      return finStr;
    },
    
    // name must be lowercase
    setName : function (name) {
      if (typeof name === 'string') {
        this.name = name.toLowerCase();
      }
    },

    getAsCrumbStr : function (v) {
      var s = '', type = typeof v;

      if (type === 'object') {
        s = JSON.stringify(v);
      } else if (type === 'string') {
        s = v.replace(/,*$/, '');
      }

      return s;
    },

    // a value (or 'crumb') may not have a trailing comma
    setValue : function (v) {
      return this.value = this.getAsCrumbStr(v);
    },
    
    // accepts one of two possible parameters.
    // 1) a date object
    // 2) an object w/ properties `y`, `m`, `d`, `hh`, `mm`, `ss`
    // 3) a number. assumption made: number is a timestamp
    setExpires : function (o) {
      var dateObj = '',
          y, m, d, hh, mm, ss;
      
      if (SimpleTime.isDateObj(o)) {
        dateObj = o;
      } else if (typeof o === 'number') {
        dateObj = o;
      } else if (typeof o === 'object' && o) {
        dateObj = new Date();
        if (o.y) dateObj = SimpleTime.getYearFromDate(dateObj, o.y);
        if (o.m) dateObj = SimpleTime.getMonthFromDate(dateObj, o.m);
        if (o.d) dateObj = SimpleTime.getDayFromDate(dateObj, o.d);
        if (o.hh) dateObj = SimpleTime.getHourFromDate(dateObj, o.hh);
        if (o.mm) dateObj = SimpleTime.getMinFromDate(dateObj, o.mm);
        if (o.ss) dateObj = SimpleTime.getSecFromDate(dateObj, o.ss);
      }
      return this.expires = dateObj;
    },

    persist : function () {
      var that = this, 
          cookieStr = that.getAsCookieStr();

      return that.setDocCookieStr(cookieStr);
    },

    rm : function () {
      var that = this;

      that.expires = new Date(0);
      return that.persist();
    }
  };

  return {

    // allow prototype methods to be redefined!
    prototype : cookie,

    // name    : name of cookie
    // expired : timestamp or date object
    getNew : function (params) {
      var that = Object.create(cookie);
      if (params) {
        that.setName(params.name);
        that.setExpires(params.expires);
        that.setValue(params.value);

        that.path    = params.path || '';
        that.domain  = params.domain || 'localhost';
        that.path    = params.path || '/';
        that.secure  = params.secure || false;
      }

      return that;
    },

    // convenience method -constructs AND persists cookie
    persist : function (params) {
      var cookieObj = this.getNew(params);

      return cookieObj.persist();
    },

    // return all cookie values as object litersl
    // { name : value, name2 : value2, ... }
    getAllObj : function () {
      var that = Object.create(cookie), x, crumb,
          cookieArr = that.getDocCookieStr().split('; '),
          cookieObj = {};

      for (x = cookieArr.length; x--;) {
        crumb = cookieArr[x].split('=');
        cookieObj[crumb[0]] = unescape(crumb[1]);
      }
      return cookieObj;    
    },

    // get the full cookie, represented as object-literal
    getExisting : function (cookieName) {
      var that = Object.create(cookie), x, crumb,
          cookieArr = document.cookie.split('; ');

      that.name = cookieName || that.name;
      for (x = cookieArr.length; x--;) {
        crumb = cookieArr[x].split('=');
        if (crumb[0] === that.name) {
          that.value = unescape(crumb[1]);
          return that;
        }
      }
      return null;
    },

    rm : function (name) {
      this.getNew({ name : name }).rm();
    },

    getValue : function (name) {
      var cookie = this.getExisting(name), value = null;
      
      if (cookie) {
        value = cookie.value;
      }
      return value;
    }

  };

}());
