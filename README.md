juicy-cookie
============
**(c)[Bumblehead][0], 2013,2016** [MIT-license](#license)

juicy-cookie will get, set, and rm [cookie][2] data.

**juicycookie.get( _name_ )**

cookie names are case-insensitive _[rfc link][3]_

```javascript
juicycookie.get('cookiename') // 'cookieval'
```


**juicycookie.set( _name_, _value_, _opts_ )**

juicy-cookie associates cookies with the top-level domain by default. cookies must associate with a domain, beginning with a '.' character, ex '.foxsports.com'.

define 'opt.expires' with unicode properties or a Date object.

```javascript
juicycookie.set('cookiename', 'cookieval', {
  expires : {
    d  : 5,
    hh : 2 // expires: 5 days, 2 hours
  }
})
```

**juicycookie.rm( _name_ )**

```javascript
juicycookie.rm('cookiename')
```

**juicycookie.getall( )**

return all cookie definitions found on the document

```javscript
juicycookie.getall()
//{
//  cookiename1 : 'cookieval1'
//  cookiename2 : 'cookieval2'
//}
```
 
[0]: http://www.bumblehead.com                            "bumblehead"
[2]: https://developer.mozilla.org/en-US/docs/DOM/document.cookie
[3]: http://tools.ietf.org/html/rfc6265                      "rfc6265"
[4]: http://msdn.microsoft.com/en-us/library/ms970178.aspx      "msdn"
[7]: https://raw.githubusercontent.com/iambumblehead/es5classic/master/es5classic_120x120.png
  
![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png)[![es5 classic][7]][7]

(The MIT License)

Copyright (c) [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
