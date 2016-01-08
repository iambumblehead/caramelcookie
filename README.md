juicy-cookie
============
**(c)[Bumblehead][0], 2013,2016** [MIT-license](#license)

### overview

juicy-cookie allows you to get, set, and rm cookie data. 

You should know that there are a [few][2] cookie-specific [restrictions][3],

  * the name of a cookie is not case-sensitive
  * a cookie will associate with a specific domain-name 
    * juicy-cookie uses your top-level domain as a default
  * cookies in the document will yield a name and value only
  * a cookie's domain value must have begin with a '.' character

[0]: http://www.bumblehead.com                            "bumblehead"
[2]: https://developer.mozilla.org/en-US/docs/DOM/document.cookie
[3]: http://tools.ietf.org/html/rfc6265                      "rfc6265"
[4]: http://msdn.microsoft.com/en-us/library/ms970178.aspx      "msdn"
[7]: https://raw.githubusercontent.com/iambumblehead/es5classic/master/es5classic_120x120.png
 
---------------------------------------------------------

 * **JuicyCookie.prototype**

   `prototype` is used by juicy-cookie to construct cookie objects. prototype may be redefined to use different property defaults. for example, to specify a specific `domain` value (rather than the default window top level domain),

   ```javascript
   JuicyCookie.prototype.domain = 'mydomain.com';
   ```

 * **getNew( _name_, _value_, _opts_ )**

   constructs a new cookie object. does not persist the cookie in the browser environment. each cookie must have a `name` and a `value`. other properties are optional.

   this constructor uses all possible property values. note that `expires` may also be defined a timestamp or a date object:
 
   ```javascript
   JuicyCookie.getNew('token', 'ls2f398j', {
     path : '/',
     domain : '.foxsports.com',
     secure : true,
     expires : {
       y : 0,
       m : 0,
       d : 0,
       hh : 0,
       mm : 30,
       ss : 30
     }
   })
   ```

 * **persist( _name_, _value_, _opts_ )**

   constructs a new cookie object and persists it to the document.
 
   ```javascript
   JuicyCookie.persist('token', 'js98dj9', {
     expires : { mm : 30 }
   });
   ```

 * **getAllObj( )**

   returns an object whose property-names are the names of each cookie available from the document. definitions are the values of each cookie.

 * **rm( _name_ )**

   removes the cookie with the given name from the document
 
 * **getValue( _name_ )**

   returns the value of the named cookie from the document, or null
 

![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png)[![es5 classic][7]][7]

(The MIT License)

Copyright (c) 2013 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
