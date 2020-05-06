caramelcookie
============

caramelcookie will get, set, and rm [cookie][2] data.     cookie names are case-insensitive _[rfc link.][3]_ caramelcookie associates cookies with the top-level domain by default. cookies must associate with a domain, beginning with a '.' character, ex '.foxsports.com'.


```javascript
caramelcookie.get('cookiename') // 'cookieval'
caramelcookie.set('cookiename', 'cookieval', {
  expires : {
    d  : 5,
    hh : 2 // expires: 5 days, 2 hours
  }
});
caramelcookie.rm('cookiename');
caramelcookie.getall();
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
  
![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png)

(The MIT License)

Copyright (c) [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
