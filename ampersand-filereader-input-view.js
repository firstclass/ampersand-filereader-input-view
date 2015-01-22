/*global FileReader*/
/*$AMPERSAND_VERSION*/

/*!
 * ampersand-filereader-input-view
 *   A view module for returning metadata via callback using browser FileReader.
 *
 * https://github.com/gdibble/ampersand-filereader-input-view
 * Copyright 2015 Gabriel Dibble; Licensed MIT
 */

var AmpersandInputView = require('ampersand-input-view');

var FileReaderInputView = AmpersandInputView.extend({
  initialize: function (opts) {
    this.callback = opts.callback || function () {};

    AmpersandInputView.prototype.initialize.call(this);
  },
  reset: function () {
    this.query('input').value = '';
  },
  disable: function () {
    var disabledClass = 'input-disabled';
    function hasClass(element, className) {
      var regex = new RegExp('(\\s|^)' + className + '(\\s|$)');
      return !!element.className.match(regex);
    }

    if (!hasClass(this.el, disabledClass)) {
      this.el.clasName += disabledClass;
      this.query('input').disabled = true;
    }
  },
  enable: function () {
    var regex = new RegExp('(\\s|^)' + 'input-disabled' + '(\\s|$)');

    this.el.className = this.el.className.replace(regex, '');
    this.query('input').disabled = false;
  },
  render: function () {
    var self = this;

    AmpersandInputView.prototype.render.call(this);

    this.query('input').addEventListener('change', function (changeEvent) {
      var reader = new FileReader();
      var file   = changeEvent.target.files[0]; //file input in single mode, read only 1st item in files array

      if (!!file.type.match('image')) {
        //image: read and return metadata
        reader.onloadend = function () {
          var shadowDomImgElm = document.createElement('img');

          //set temporary Shadow DOM image element src to get width/height
          shadowDomImgElm.src = reader.result;

         self.callback(self, {
            width:  shadowDomImgElm.width,
            height: shadowDomImgElm.height,
            type:   file.type,
            src:    reader.result
          });
        };
        reader.readAsDataURL(file); //read image file
      } else {
        //video: return content-type
        self.callback(self, {
          type: file.type
        });
      }
    });

    return this;
  }
});

module.exports = FileReaderInputView;
