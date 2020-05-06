'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Filename: juicycookie.js  
// Timestamp: 2015.12.20-00:51:49 (last modified)
// Author(s): Bumblehead (www.bumblehead.com)

var cookie = {
    name: '',
    value: '',
    expires: '',
    path: '/',
    secure: false,
    domain: '.defaultdomain.com',

    setDocCookieStr: function setDocCookieStr(cookieStr) {
        document.cookie = cookieStr;
    },

    getDocCookieStr: function getDocCookieStr() {
        return document.cookie;
    },

    // ip address cannot be wildcarded
    //
    // defines top level domain as default to allowing cookie-access at subdomains. 
    //
    // ex: `.foxsports.com`.    
    getUrlAsDomainStr: function getUrlAsDomainStr(url) {
        var dmn = '',
            toplevel;

        if (url) {
            dmn = url;
            if (url !== 'localhost') {
                if (toplevel = url.match(/\d*\.\d*\.\d*\.\d*$/)) {

                    dmn = toplevel[0];
                } else if (toplevel = url.match(/\w*\.\w*$/)) {
                    dmn = '.' + toplevel[0];
                }
            }
        }
        return dmn;
    },

    getAsCookieStr: function getAsCookieStr() {
        var that = this,
            finStr = that.name + "=" + escape(that.value);

        finStr += that.expires ? ";expires=" + new Date(that.expires).toGMTString() : '';
        finStr += that.domain ? ";domain=" + that.domain : '';
        finStr += that.path ? ";path=" + that.path : '';
        finStr += that.secure ? ";secure" : '';

        return finStr;
    },

    setDomain: function setDomain(dmn) {
        var that = this;
        if (typeof dmn === 'string') {
            that.domain = dmn;
        } else if ((typeof location === 'undefined' ? 'undefined' : _typeof(location)) === 'object') {
            that.domain = that.getUrlAsDomainStr(location.hostname);
        }
    },

    setName: function setName(name) {
        if (typeof name === 'string') {
            this.name = name;
        }
    },

    getAsCrumbStr: function getAsCrumbStr(v) {
        var s = '',
            type = typeof v === 'undefined' ? 'undefined' : _typeof(v);

        if (type === 'object') {
            s = JSON.stringify(v);
        } else if (type === 'string') {
            s = v.replace(/,*$/, '');
        } else if (type === 'number') {
            s = v;
        }

        return s;
    },

    // a value (or 'crumb') may not have a trailing comma
    setValue: function setValue(v) {
        return this.value = this.getAsCrumbStr(v);
    },

    // accepts one of two possible parameters.
    // 1) a date object
    // 2) an object w/ properties `y`, `m`, `d`, `hh`, `mm`, `ss`
    // 3) a number. assumption made: number is a timestamp
    setExpires: function setExpires(opts) {
        var dateObj = '',
            ms = 0;

        if (opts instanceof Date) {
            dateObj = opts;
        } else if (typeof opts === 'number') {
            dateObj = opts;
        } else if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) === 'object' && opts) {
            // 1000 * 60 * 60 * 24 * 256
            if (typeof opts.y === 'number') ms += opts.y * 22118400000;
            // 1000 * 60 * 60 * 24 * 30
            if (typeof opts.m === 'number') ms += opts.m * 2592000000;
            // 1000 * 60 * 60 * 24
            if (typeof opts.d === 'number') ms += opts.d * 86400000;
            // 1000 * 60 * 60
            if (typeof opts.hh === 'number') ms += opts.hh * 3600000;
            // 1000 * 60
            if (typeof opts.mm === 'number') ms += opts.mm * 60000;
            // 1000
            if (typeof opts.ss === 'number') ms += opts.ss * 1000;
            if (typeof opts.ms === 'number') ms += opts.ms;
            dateObj = new Date(Date.now() + ms);
        }
        return this.expires = dateObj;
    },

    set: function set() {
        var that = this,
            cookieStr = that.getAsCookieStr();

        return that.setDocCookieStr(cookieStr);
    },

    rm: function rm() {
        var that = this;

        that.expires = new Date(0);
        return that.set();
    }

};

exports.default = {

    // allow prototype methods to be redefined!
    prototype: cookie,

    getNew: function getNew(name, value, params) {
        var that = Object.create(cookie);

        params = params || {};

        that.setName(name);
        that.setValue(value);
        that.setExpires(params.expires);
        that.setDomain(params.domain);

        that.path = params.path || '/';
        that.secure = params.secure || false;

        return that;
    },

    // convenience method -constructs AND sets cookie
    set: function set(name, value, params) {
        var cookieObj = this.getNew(name, value, params);

        return cookieObj.set();
    },

    // return all cookie values as object litersl
    // { name : value, name2 : value2, ... }
    getall: function getall() {
        var that = Object.create(cookie),
            cookieArr = that.getDocCookieStr().split('; '),
            cookieObj = {};

        cookieArr.map(function (cookie) {
            var crumb = cookie.split('=');
            cookieObj[crumb[0]] = unescape(crumb[1]);
        });

        return cookieObj;
    },

    // get the full cookie, represented as object-literal
    getExisting: function getExisting(cookieName) {
        var that = Object.create(cookie),
            x,
            crumb,
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

    // remove accross all domains
    // `.blah.chris.foxsports.com`
    // `.chris.foxsports.com`
    // `.foxsports.com`
    rm: function rm(name) {
        var that = this,
            hostname,
            sph,
            x;

        that.getNew(name, '', {
            domain: ''
        }).rm();

        if ((typeof location === 'undefined' ? 'undefined' : _typeof(location)) === 'object') {
            hostname = location.hostname;
            sph = hostname.split('.');
            for (x = sph.length; x-- > 1; sph = sph.slice(1)) {
                that.getNew(name, '', {
                    domain: '.' + sph.join('.')
                }).rm();
            }
        }
    },

    get: function get(name) {
        var cookie = this.getExisting(name),
            value = null;

        if (cookie) {
            value = cookie.value;
        }
        return value;
    }
};