# ampersand-filereader-input-view

A view module for returning metadata via callback using browser FileReader. Works well with [ampersand-form-view](ampersandjs/ampersand-form-view).

It does the following:

- Returns an object via `callback` prop/method with metadata for file selected.

## install

```
npm install ampersand-filereader-input-view
```

## example

The *only* required attributes are name and type. Everything else is optional (even the callback.)

```javascript
var InputView = require('ampersand-filereader-input-view');


var field = new FileReaderInputView({
    // form input's `name` attribute
    name: 'file',
    // You can replace the built-in template for the parent item
    // just give it an html string. Make sure it has a single "root" element that contains:
    //  - an element with a `data-hook="label"` attribute
    //  - an element with a `data-hook="fieldContainer"` this is where individual fields go
    //  - an element with a `data-hook="main-message-container"` attribute (this we'll show/hide)
    //  - an elememt with a `data-hook="main-message-text"` attribute (where message text goes for error)
    template: // some HTML string,
    // Template for individual view. It should be a string of HTML
    // Make sure it has a single "root" element that contains
    //  - an element with a `data-hook="label"` attribute
    //  - an element with a `data-hook="message-container"` attribute (this we'll show/hide)
    //  - an elememt with a `data-hook="message-text"` attribute (where message text goes for error)
    // function called when file selected
    //  - arguments returned by callback:
    //    * 1st: fileInputView - view object of the file form-field
    //    * 2nd: data - object containing metadata for file selected
    callback: function (fileInputView, data) {}
    // Label name
    label: 'File',
    // Optional placeholder attribute
    placeholder: 'file',
    // optional, this is the element that will be
    // replaced by this view. If you don't
    // give it one, it will create one.
    el: document.getElementByID('field'),
    // class to set on input when input is valid
    validClass: 'input-valid', // <- that's the default
    // type value to use for the input tag's type value
    type: 'file',
    // class to set on input when input is valid
    invalidClass: 'input-invalid', // <- that's the default
    // Message to use if error is that it's required
    // but no value was set.
    requiredMessage: 'This field is required.',
    // optional, you can pass in the parent view explicitly
    parent:  someViewInstance
});

// append it somewhere or use it in side an ampersand-form-view
document.querySelector('form').appendChild(field.el);

```

## browser support

[![testling badge](https://ci.testling.com/gdibble/ampersand-filereader-input-view.png)](https://ci.testling.com/gdibble/ampersand-filereader-input-view)

## credits

Created by [@gdibble](http://twitter.com/gabedibble).

## license

MIT

