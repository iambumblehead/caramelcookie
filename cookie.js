// Filename: Cookie.js  
// Timestamp: 2013.05.15-18:47:57 (last modified)  
// Author(s): 
// Requires: PkLib.js, PkTime.js



var Cookie = module.exports = (function () {

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


    // 'crumb' may become the alue of a cookie.
    // should not have a traling comma
    getValueAsCrumb : function (v) {
      var s = '', type = typeof v;
      if (type === 'object') {
        s = JSON.stringify(v);
      } else if (type === 'string') {
        s = v.replace(/,*$/, '');
      }

      return s;
    },


    getAsCookieStr : function () {
      var that = this,
          finStr = that.name + "=" + escape(that.getValueAsCrumb(that.value));

      finStr += that.expires ? ";expires=" + (new Date(that.expires)).toGMTString() : '';
      finStr += that.domain ? ";domain=" + that.domain : '';
      finStr += that.path ? ";path=" + that.path : '';
      finStr += that.secure ? ";secure" : ';';

      return finStr;
    },

    setExpireDays : function (days) {
      if (typeof days === 'number') {
        this.expires = PkTime.getDayFromTodayDate(days);        
      }
    },

    setExpireMinutes : function (mins) {
      if (typeof mins === 'number') {
        this.expires = PkTime.getMinFromTodayDate(mins);
      }
    },
    set : function (val) {
      this.value = val;
      document.cookie = this.getAsCookieStr();
    },
    rm : function () {
      this.expires = new Date(0);
      document.cookie = this.getAsCookieStr();
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
        that.name    = params.name || '';
        that.path    = params.path || '';
        that.value   = params.value || '';
        that.expires = params.expires || '';
        that.domain  = params.domain || 'localhost';
        that.path    = params.path || '/';
        that.secure  = params.secure || false;
      }
      return that;
    },

    // return all cookie values as object litersl
    // { name : value, name2 : value2, ... }
    getAllObj : function () {
      var that = Object.create(cookie), x, crumb,
          cookieArr = that.getDocCookieStr().split('; '),
          //cookieArr = document.cookie.split('; '),
          cookieObj = {};

      for (x = cookieArr.length; x--;) {
        crumb = cookieArr[x].split('=');
        cookieObj[crumb[0]] = unescape(crumb[1]);
      }
      return cookieObj;    
    },


  getCrumbAsValue : function (crumb) {
  /*
    var vals = (typeof crumb === 'string') ? crumb.split(',') : [], 
        obj = {}, x, pair;

    if (vals.length) {
      for (x = vals.length; x--;) {
        pair = vals[x].split('=');
        if (pair.length > 1) {
          obj[pair[0]] = pair[1].replace(/\|/g, ',');
        }
      }
    } else {
      obj = crumb;
    }

    return obj;
   */
    return crumb;
  },


    // get the full cookie, represented as object-literal
    getExisting : function (cookieName) {
      var that = Object.create(cookie), x, crumb,
          cookieArr = document.cookie.split('; ');
      that.name = cookieName || that.name;
      for (x = cookieArr.length; x--;) {
        crumb = cookieArr[x].split('=');
        if (crumb[0] === that.name) {
          that.value = that.getCrumbAsValue(unescape(crumb[1]));
          return that;
        }
      }
      return null;
    },


    // these should not accept params. add value to one named
    // cookie associated with this object only
    rm : function (name) {
       // use our path and domain
       document.cookie = name +
            ' =;expires=Thu, 01-Jan-1970 00:00:01 GMT; path = /';
       document.cookie = name +
            ' =;expires=Thu, 01-Jan-1970 00:00:01 GMT; path = /;domain=.foxsports.com';
    },

    set : function (name, data, expMinutes) {
      var cookie = this.getExisting(name || this.name) || this.getNew({ name : name });
      if (cookie) {
        if (typeof expMinutes === 'number') {
          cookie.setExpireMinutes(expMinutes);
        }
        cookie.set(data);
      }
    },

    getData : function (name) {
      var cookie = this.getExisting(name || this.name);
      return (cookie) ? cookie.value : null;
    },

    setExpiration : function (name, expMinutes) {
      var cookie = this.getData(name);
      if (cookie) {
        this.set(name, cookie, expMinutes);
      }
    }
  };

}());
