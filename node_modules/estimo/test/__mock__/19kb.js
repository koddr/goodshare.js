void function () {
  var smoke = {}
  
  // Options:
  smoke.ok               = "Ok"          // Text for "Ok" button.
  smoke.ok_reference     = undefined     // Instead of text, clone the supplied element and apply the "Ok" button features to that clone.
  smoke.cancel           = "Cancel"      // Text for "Cancel" button.
  smoke.cancel_reference = undefined     // Instead of text, clone the supplied element and apply the "Cancel" button features to that clone.
  smoke.point_event      = 'click'       // Point event ("click", "touchstart", etc.)
  smoke.parent           = document.body // Where the smoke div attaches. Note that if this is undefined (because document.body hasn't been added yet), the build function attempts to define it as document.body when the build function is run --that is, when the smoke DOM object is created.
  smoke.zindex           = 10000         // Z-index of the smoke DOM object. This should be a high number.
  smoke.reverse_buttons  = false         // If false, the "Ok" button appears before (left of) the "Cancel" button. If true, the "Cancel" button appears before the "Ok" button.
  smoke.autofocus        = true          // If true, the input is automatically focused when the smoke DOM object is created.
  smoke.autoexit         = true          // If true, clicking outside the smoke dialog (but inside the dialog_wrapper) detaches the smoke DOM object, cleans up event listeners, and runs the callback with a parameter of (false, evt).
  smoke.autoclose        = true          // If true, clicking any regular button that would normally close a dialog (.e.g.: "ok", "cancel") actually closes the dialog (detaches it / cleans up listeners). Otherwise, "dialog.close()" must be run manually.
  smoke.custom_css       = {}            // Custom classes for each object in the structure. E.G.: smoke.custom_css = {"button.ok": "my_ok_button_style"} or smoke.custom_css = {"buttons.ok": ["my_ok_button_style1", "my_ok_button_style2"]}
  smoke.css_prefix       = "smoke"       // The CSS prefix for the classes used in the .build function.
  smoke.value            = undefined     // The initial value to set the prompt input text to.
  smoke.callback         = undefined     // Function to run after user input is sent.
  smoke.observe_mutation = true          // If true, attachess a mutation observer that will destroy the keyboard listeners when the element is removed from the DOM.
  smoke.window_opened    = undefined     // Function that runs at the end of smoke.build. Is in the form of "function (dom_window_object, text, processed_params)".
  smoke.window_closed    = undefined     // Function that runs after the object is removed from the DOM. Is in the form of "function (dom_window_object, text, processed_params)". Requires observe_mutation to be true for full functionality.
  smoke.use_wrapper      = true          // For older browsers, we have a wrapper in between the base and the modal.
  
  smoke.title                 = {}        // Title element with the below options. Required in order to have a close button.
  smoke.title.text            = undefined // Title text. If you don't want title text, don't define this.
  smoke.title.close           = undefined // Text for a "close" button. If you don't want a close button in the title, don't define this.
  smoke.title.close_reference = undefined // Instead of text, clone the supplied element and apply the "Cancel" button features to that clone.
  
  smoke.extension = [] // Extension functions.
  
  // Example:
  // var modal = smoke.alert("This is an alert.", callback, options)
  //
  // Property                           | CSS
  // -----------------------------------|-------------------------------
  // var modal (return value)           | smoke-base
  //  modal.dialog_wrapper              |  smoke-dialog_wrapper
  //   modal.dialog                     |   smoke-dialog
  //   modal.dialog.title_element       |    smoke-dialog-title
  //   modal.dialog.title_element.text  |     smoke-dialog-title-text
  //   modal.dialog.title_element.close |     smoke-dialog-title-close
  //   modal.dialog.text                |    smoke-dialog-text
  //   modal.dialog.prompt              |    smoke-dialog-prompt
  //   modal.dialog.prompt.input        |     smoke-dialog-prompt-input
  //   modal.dialog.buttons             |    smoke-dialog-buttons
  //   modal.dialog.buttons.ok          |     smoke-dialog-buttons-ok
  //   modal.dialog.buttons.cancel      |     smoke-dialog-buttons-cancel
  //
  // Extras:
  // modal.dialog.ok     () // <-- programatically run "ok" on the object.
  // modal.dialog.cancel () // <-- programatically run "cancel" on the object.
  
  smoke.build = function (text, params) {
   if ((typeof smoke.parent == "undefined") || (smoke.parent == null)) smoke.parent = document.body
   var ok                  = (typeof params.ok               != "undefined") ? params.ok               : smoke.ok
   var ok_reference        = (typeof params.ok_reference     != "undefined") ? params.ok_reference     : smoke.ok_reference
   var cancel              = (typeof params.cancel           != "undefined") ? params.cancel           : smoke.cancel
   var cancel_reference    = (typeof params.cancel_reference != "undefined") ? params.cancel_reference : smoke.cancel_reference
   var point_event         = (typeof params.point_event      != "undefined") ? params.point_event      : smoke.point_event
   var parent              = (typeof params.parent           != "undefined") ? params.parent           : smoke.parent
   var zindex              = (typeof params.zindex           != "undefined") ? params.zindex           : smoke.zindex
   var reverse_buttons     = (typeof params.reverse_buttons  != "undefined") ? params.reverse_buttons  : smoke.reverse_buttons
   var autoexit            = (typeof params.autoexit         != "undefined") ? params.autoexit         : smoke.autoexit
   var autofocus           = (typeof params.autofocus        != "undefined") ? params.autofocus        : smoke.autofocus
   var autoclose           = (typeof params.autoclose        != "undefined") ? params.autoclose        : smoke.autoclose
   var custom_css          = (typeof params.custom_css       != "undefined") ? params.custom_css       : smoke.custom_css
   var css_prefix          = (typeof params.css_prefix       != "undefined") ? params.css_prefix       : smoke.css_prefix
   var input_default_value = (typeof params.value            != "undefined") ? params.value            : smoke.value
   var callback            = (typeof params.callback         != "undefined") ? params.callback         : smoke.callback
   var observe_mutation    = (typeof params.observe_mutation != "undefined") ? params.observe_mutation : smoke.observe_mutation
   var title               = (typeof params.title            != "undefined") ? merge_objects(smoke.title, params.title) : smoke.title
   var window_opened       = (typeof params.window_opened    != "undefined") ? params.window_opened    : smoke.window_opened
   var window_closed       = (typeof params.window_closed    != "undefined") ? params.window_closed    : smoke.window_closed
   var use_wrapper         = (typeof params.use_wrapper      != "undefined") ? params.use_wrapper      : smoke.use_wrapper
   var window_closed_ran   = false
   params.point_event      = point_event
   params.callback         = callback
   params.autoclose        = autoclose
   
   var modal = document.createElement('div'); modal.className = css_prefix + '-base'; modal.style.zIndex = zindex
   modal.savedScrollTop = parent.scrollTop
   parent.appendChild(modal)
   
   if (use_wrapper) {
    var dialog_wrapper = modal.dialog_wrapper = document.createElement('div'); dialog_wrapper.className = css_prefix + '-dialog_wrapper'
    modal.appendChild(dialog_wrapper)
   } else {
    var dialog_wrapper = modal
   }
   
   // Add an event listener for when the user clicks outside of the dialog, but inside the dialog wrapper.
   // If activated, the parent smoke div removes itself and calls the callback.
   if (autoexit) {
    setTimeout(function () {dialog_wrapper.addEventListener(point_event, function (evt) {
     if (evt.currentTarget != evt.target) return
     evt.stopPropagation()
     evt.preventDefault()
     modal.dialog.close(false)
     if ((!window_closed_ran) && smoke.window_closed) {smoke.window_closed(modal, text, params); window_closed_ran = true}
    })}, 0)
   }
   
   // Create the dialog element.
   var dialog = modal.dialog = document.createElement('div'); dialog.className = css_prefix + '-dialog'
   dialog_wrapper.appendChild(dialog)
   
   // Create the buttons div.
   var buttons = dialog.buttons = document.createElement('div'); buttons.className = css_prefix + '-dialog-buttons'
   
   // Add a title element to the modal.
   if (typeof title.text != "undefined" || typeof title.close != "undefined" || typeof title.close_reference != "undefined") {
    // Create the actual title element.
    var title_element = dialog.title_element = document.createElement('div'); title_element.className = css_prefix + '-dialog-title'
    
    // Add text to the title element, if the "text" property is defined.
    if (typeof title.text != "undefined") {
     var title_text = title_element.text = document.createElement('div'); title_text.className = css_prefix + '-dialog-title-text'
     title_element.appendChild(title_text)
     title_text.innerHTML = title.text
    }
    
    // Add a close button to the title element, if the "close" property is defined.
    if (typeof title.close != "undefined" || typeof title.close_reference != "undefined") {
     if (typeof title.close_reference != "undefined") {
      var title_close = title.close_reference.cloneNode(true)
     } else {
      var close_text = title.close
      var title_close = document.createElement('button')
      title_close.innerHTML = close_text
     }
     title_close.classList.add(css_prefix + '-dialog-title-close')
     title_element.title_close = title_close
     title_element.appendChild(title_close)
    }
    dialog.appendChild(title_element)
   }
   
   // Add text to the modal.
   var text_div = dialog.text = document.createElement('div'); text_div.className = css_prefix + '-dialog-text'
   text_div.innerHTML = text
   dialog.appendChild(text_div)
   
   // Add a prompt to the modal.
   if (params.type == 'prompt') {
    var prompt = modal.dialog.prompt = document.createElement('div'); prompt.className = css_prefix + '-prompt'
    prompt.input = document.createElement('input'); prompt.input.type = 'text';  prompt.input.className = css_prefix + '-prompt-input'
    if (typeof input_default_value != "undefined") prompt.input.value = input_default_value
    prompt.appendChild(prompt.input)
    dialog.appendChild(prompt)
   }
   
   // Create an "Ok" button.
   if (typeof ok_reference != "undefined") {
    buttons.ok = ok_reference.cloneNode(true)
   } else {
    buttons.ok = document.createElement('button'); buttons.ok.classList.add(css_prefix + '-dialog-buttons-ok'); buttons.ok.innerHTML = ok
   }
   
   // Create a "Cancel" button if the modal type is "prompt" or "confirm".
   if ((params.type == 'prompt') || (params.type == 'confirm')) {
    if (typeof cancel_reference != "undefined") {
     buttons.cancel = cancel_reference.cloneNode(true)
    } else {
     buttons.cancel = document.createElement('button'); buttons.cancel.classList.add(css_prefix + '-dialog-buttons-cancel'); buttons.cancel.innerHTML = cancel
    }
   }
   
   // Add "ok" and "cancel" buttons to the modal.
   switch (params.type) {
    case "alert": buttons.appendChild(buttons.ok); break
    case "prompt": case "confirm":
     if (params.reverse_buttons) {
      buttons.appendChild(buttons.cancel); buttons.appendChild(buttons.ok)
     } else {
      buttons.appendChild(buttons.ok); buttons.appendChild(buttons.cancel)
     }
    break
   }
   
   dialog.appendChild(buttons)
   
   // Append any extra CSS styles on any part of the structure.
   for (var current_structure_name in custom_css) {
    var property_array = current_structure_name.split (".")
    var current_element = modal
    property_array.forEach(function (current_property) {current_element = current_element[current_property]})
    var current_class_list = custom_css[current_structure_name]
    if (typeof current_class_list == "string") current_class_list = [current_class_list]
    current_class_list.forEach(function (current_classname) {current_element.classList.add(current_classname)})
   }
   
   if (typeof params.callback != "function") params.callback = function () {}
   modal.dialog.params = params
   smoke['finishbuilding_' + params.type](modal, params)
   
   if (dialog.title_element && dialog.title_element.title_close) {
    dialog.title_element.title_close.addEventListener(dialog.params.point_event, dialog.cancel ? dialog.cancel: dialog.ok)
    dialog.title_element.title_close.smoke_pure_modal = modal
   }
   
   if ((typeof modal.dialog.prompt != "undefined") && (autofocus != false)) modal.dialog.prompt.input.focus()
   
   modal.style.top = modal.savedScrollTop + "px"; parent.scrollTop = modal.savedScrollTop
   
   // Add a mutation observer that observes for the object's removal. If it is removed, destroy the listeners, reset the scroll top, and run smoke.window_closed.
   if (observe_mutation) {
    var MutationObserver = window.MutationObserver || window.WebkitMutationObserver
    if (typeof MutationObserver != "undefined") {
     var observer = dialog.removal_observer = new MutationObserver (function (mutation_list) {
      for (var i = 0, curlen_i = mutation_list.length; i < curlen_i; i++) {
       var mutation_item = mutation_list[i]
       if (mutation_item.type != 'childList') return
       for (var j = 0, curlen_j = mutation_item.removedNodes.length; j < curlen_j; j++) {
        if (mutation_item.removedNodes[j] != modal) continue
        dialog.destroy(observer)
        if ((!window_closed_ran) && smoke.window_closed) {smoke.window_closed(modal, text, params); window_closed_ran = true}
        return
       }
      }
     })
     observer.observe(parent, {attributes: false, childList: true, subtree: false})
    }
   }
   
   dialog.destroy = function (observer) {
    if (modal.parentNode) modal.parentNode.removeChild(modal)
    if (!observer) observer = dialog.removal_observer
    if (observer) observer.disconnect()
    dialog.listener_list.forEach(function (listener) {
     document.removeEventListener(listener.event, listener.callback)
     dialog.listener_list = []
    })
   }
   
   var close_ran = false
   dialog.close = function (truthy) {
    dialog.destroy(observer)
    if (!close_ran) {close_ran = true; dialog.params.callback(truthy)}
   }
   
   if (smoke.window_opened) smoke.window_opened(modal, text, params)
   
   for (var value in params) {
    if (smoke.extension[value]) smoke.extension[value](params[value], modal, text, callback, params)
   }
   return modal
  }
  
  smoke.extend = function (value, func) {smoke.extension[value] = func}
  
  smoke.finishbuilding_alert   = function (modal) {
   var dialog = modal.dialog
   dialog.callback_ok = function () {dialog.params.callback()}
   var ok_function_wrapper = dialog.ok = function (evt) {ok_function(evt, modal, {allow_esc: true})}
   smoke.add_global_listener(dialog, 'keyup', ok_function_wrapper)
   dialog.buttons.ok.addEventListener(dialog.params.point_event, ok_function_wrapper)
   dialog.buttons.ok.smoke_pure_modal = modal
  }
  
  smoke.finishbuilding_confirm = function (modal) {
   var dialog = modal.dialog
   dialog.callback_ok     = function () {dialog.params.callback(true)}
   dialog.callback_cancel = function () {dialog.params.callback(false)}
   var ok_function_wrapper     = dialog.ok     = function (evt) {ok_function    (evt, modal)}
   var cancel_function_wrapper = dialog.cancel = function (evt) {cancel_function(evt, modal)}
   smoke.add_global_listener(dialog, 'keyup', ok_function_wrapper)
   smoke.add_global_listener(dialog, 'keyup', cancel_function_wrapper)
   dialog.buttons.ok.addEventListener     (dialog.params.point_event, ok_function_wrapper)
   dialog.buttons.cancel.addEventListener (dialog.params.point_event, cancel_function_wrapper)
   dialog.buttons.ok.smoke_pure_modal     = modal
   dialog.buttons.cancel.smoke_pure_modal = modal
  }
  smoke.finishbuilding_prompt  = function (modal) {
   var dialog = modal.dialog
   dialog.callback_ok     = function () {dialog.params.callback(dialog.prompt.input.value)}
   dialog.callback_cancel = function () {dialog.params.callback(false)}
   var ok_function_wrapper     = dialog.ok     = function (evt) {ok_function    (evt, modal)}
   var cancel_function_wrapper = dialog.cancel = function (evt) {cancel_function(evt, modal)}
   smoke.add_global_listener(dialog, 'keyup', ok_function_wrapper)
   smoke.add_global_listener(dialog, 'keyup', cancel_function_wrapper)
   dialog.buttons.ok.addEventListener     (dialog.params.point_event, ok_function_wrapper)
   dialog.buttons.cancel.addEventListener (dialog.params.point_event, cancel_function_wrapper)
   dialog.buttons.ok.smoke_pure_modal     = modal
   dialog.buttons.cancel.smoke_pure_modal = modal
  }
  
  smoke.add_global_listener = function (dialog, event, callback) {
   document.addEventListener(event, callback)
   if (typeof dialog.listener_list == "undefined") dialog.listener_list = []
   dialog.listener_list.push({"event": event, "callback": callback})
  }
  
  function ok_function (evt, modal, options) {
   options = options || {}
   if (evt && (((evt.type == "keyup") && (typeof evt.keyCode != "undefined")) && (evt.keyCode != 13 || (options.allow_esc && evt.keyCode != 27)))) return
   if (modal.dialog.params.autoclose) modal.dialog.destroy(modal.dialog.removal_observer)
   modal.dialog.callback_ok()
  }
  function cancel_function (evt, modal) {
   if (evt && (((evt.type == "keyup") && (typeof evt.keyCode != "undefined")) && ((evt.keyCode == 0) || (evt.keyCode != 27)))) return
   if (modal.dialog.params.autoclose) modal.dialog.destroy(modal.dialog.removal_observer)
   modal.dialog.callback_cancel()
  }
  
  smoke.action_list = [{name: 'alert'}, {name: 'confirm'}, {name: 'prompt'}]
  
  smoke.action_list.forEach(function (current_action_entry) {
   var current_action = current_action_entry.name
   smoke[current_action] = function (text, callback, params) {return smoke.build(text, merge_objects({callback: callback, type: current_action}, params))}
  })
  
  function merge_objects (secondary, primary) {
   // The primary object's duplicate keys are superior. The secondary object's duplicate keys are inferior.
   if (typeof secondary == "undefined") var primary = primary.primary, secondary = primary.secondary
   var new_object = {}
   for (var property in secondary) {new_object[property] = secondary[property]}
   for (var property in primary)   {new_object[property] = primary  [property]}
   return new_object
  }
  
 if (typeof module != 'undefined') {
   module.exports = smoke
  } else if (typeof define === 'function' && define.amd) {
   define('smoke', [], function() {return smoke})
  } else {
   this.smoke = smoke
  }
 } ()