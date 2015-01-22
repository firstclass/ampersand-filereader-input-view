/*global console, window*/
// can be run with `npm run demo`
var FileReaderInput = require('./ampersand-filereader-input-view');
var FormView        = require('ampersand-form-view');
var State           = require('ampersand-state');

var model = State.extend({
  props: {
    width:  'number',
    height: 'number',
    type:   'string',
    src:    'string'
  }
});

var file = new FileReaderInput({
  type:     'file',
  label:    'file',
  name:     'file',
  value:    this.model.file || '',
  callback: function (fileInputView, data) {
    function exists(object, key) {
      return typeof object[key] !== 'undefined';
    }

    if (exists(data, 'width')) {
      fileInputView.parent.model.width = data.width;
    }
    if (exists(data, 'height')) {
      fileInputView.parent.model.height = data.height;
    }
    if (exists(data, 'src')) {
      fileInputView.parent.model.src = data.src;
    }
    //type always returned
    fileInputView.parent.model.type = data.type;
    //non-image: clear other props
    if (!data.type.match('image')) {
      fileInputView.parent.model.width =
       fileInputView.parent.model.height =
        fileInputView.parent.model.src = undefined;
    }

    //result
    console.log('file metadata', fileInputView.parent.model.all);
  }
});

var form = document.createElement('form');
form.innerHTML = '<div data-hook="field-container"></div><input type="submit">';

var formView = new FormView({
  el:             form,
  model:          model,
  fields:         [ file ],
  submitCallback: function (vals) {
    console.log(vals);
  }
});

window.formView = formView;

document.body.appendChild(formView.el);
