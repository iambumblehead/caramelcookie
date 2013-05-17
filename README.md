juicy-cookie
============
**(c)[Bumblehead][0], 2013** [MIT-license](#license)  

### Overview:

juicy-cookie allows you to get, set, and rm cookie data. 

There are a [few][2] cookie-specific [details][3] that you may want to know.

   - the name of a cookie must be lower-cased
   - each cookie is associated with a specific domain-name -juicy-cookie uses your top-level domain as its default
   - a cookie from the document will not yield meta-data, name and value only

[0]: http://www.bumblehead.com                            "bumblehead"
[2]: https://developer.mozilla.org/en-US/docs/DOM/document.cookie
[3]: http://tools.ietf.org/html/rfc6265                      "rfc6265"

---------------------------------------------------------
#### <a id="install"></a>Install:

juicy-cookie may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install juicy-cookie
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/juicy-cookie.git
 ```

---------------------------------------------------------
#### <a id="test"></a>Test:

 to run tests, use `npm test` from a shell.

 ```bash
 $ npm test
 ```
 
---------------------------------------------------------

#### <a id="methods">Methods:

 - **prototype**  
 `prototype` is not a method but a property defined on the `JuicyCookie` namespace. the prototype is used by juicy-cookie to construct its own cookie object. prototype may be accessed to redefine its default properties. for example, you may want to specify a specific `domain` value cookies would associate with,

 ```javascript
 JuicyCookie.prototype.domain = 'mydomain.com';
 ```


 - **getNew( _obj_ )**     
 constructs a new cookie object. does not persist the cookie in the browser environment. each cookie must have a `name` and a `value`. other properties are optional.

 this constructor uses all possible property values:
 
 ```javascript
 JuicyCookie.getNew({
   name : 'token'
   value : 'sldkjf0s9df',
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
 note that expires may also be defined with the value of a timestamp or a date object.


 - **persist( _obj_ )**     
 constructs a new cookie object and persists it to the document.
 
 ```javascript
 JuicyCookie.getNew({
   name : 'token'
   value : 'sldkjf0s9df',
   expires : { mm : 30 }
 }
 ```

 - **getAllObj( _obj_ )**      
 returns an object whose property-names are the names of each cookie available from the document. definitions are the values of each cookie.

 - **rm( _name_ )**      
 removes the cookie with the given name from the document
 
 - **getValue( _name_ )**   
 returns the value of the named cookie from the document, or null
 
 
---------------------------------------------------------

#### <a id="license">License:

(The MIT License)

Copyright (c) 2013 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
