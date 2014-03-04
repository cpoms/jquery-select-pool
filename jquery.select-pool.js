/*!=========================================================================
 *  jQuery Select Pool
 *  v0.1.0
 *
 *  A smple plugin to allow you to hook numerous select inputs
 *  together in sweet harmony.
 *
 *  https://github.com/meritec/jquery-select-pool/
 *
 *  Copyright (c) 2014 Mike Campbell, Meritec Ltd
 * 
 *  Permission is hereby granted, free of charge, to any person
 *  obtaining a copy of this software and associated documentation
 *  files (the "Software"), to deal in the Software without
 *  restriction, including without limitation the rights to use,
 *  copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the
 *  Software is furnished to do so, subject to the following
 *  conditions:
 *  
 *  The above copyright notice and this permission notice shall be
 *  included in all copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 *  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 *  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 *  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 *  OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================== */


(function ($) {
  $.fn.selectPool = function(options) {
    var settings = $.extend({
      selectClass: "select-pool"
    }, options);

    var attachedHandlerIDs = new Array();
    var optionsPool = {};
    var availableOptions = {};
    var $this = this.filter("select");

    // Attach listeners to associated selects
    return $this.each(function() {
      var selectGroupID = getSelectGroupID($(this).attr('class'), settings.selectClass);
      if ($.inArray(selectGroupID, attachedHandlerIDs) == -1) {
        var $groupedSelects = $this.filter("." + settings.selectClass + (selectGroupID == "" ? "" : "-" + selectGroupID))
        optionsPool["id" + selectGroupID] = getSelectOptions($(this));

        // Remove preselected items from selects
        $groupedSelects.each(function () {
          if ($(this).val() != "")
            removeOptionFromSelects($groupedSelects, $(this));
        });

        // intialize data attributes
        $groupedSelects.each(function() {
          $(this).data('select-pool-selected', $(this).val());
        });

        // When any of this group's selects changes...
        $groupedSelects.on('change', function() {
          var $changedSelect = $(this);
          var op = optionsPool["id" + selectGroupID];
          var previouslySelected = $changedSelect.data('select-pool-selected');
          var valueIndex = op.indexOf(previouslySelected);
          var textIndex = valueIndex + 1;

          if ($changedSelect.val() != "")
            removeOptionFromSelects($groupedSelects, $changedSelect);
          if (op[valueIndex] != "")
            addOptionToSelects($groupedSelects, $changedSelect, op[valueIndex], op[textIndex]);
          // Update the data attribute
          $changedSelect.data('select-pool-selected', $changedSelect.val());
        });
        // Don't process this select group again.
        attachedHandlerIDs.push(selectGroupID);
      }
    });

    function getSelectGroupID(classString, searchValue) {
      if (classString != 'undefined') {
        var classes = classString.split(" ");
        for (var i = 0; i < classes.length; i++) {
          var selectPoolIndex = classes[i].indexOf(searchValue);
          if (selectPoolIndex != -1)
            return classes[i].substr(searchValue.length+1, classes[i].length);
        }
        return "You suck."
      }
    }

    function removeOption($select, optionValue) {
      $select.find("option[value='" + optionValue + "']").remove();
    }

    function removeOptionFromSelects($selects, $changedSelect) {
      $selects.each(function() {
        if (!($(this).get(0) === $changedSelect.get(0)))
          removeOption($(this), $changedSelect.val());
      });
    }

    function addOptionToSelects($selects, $changedSelect, val, text) {
      $selects.each(function() {
        if (!($(this).get(0) === $changedSelect.get(0)))
          $(this).append("<option value='" + val + "'>" + text + "</option>");
      });
    }

    function getSelectOptions($select) {
      return $select.find("option").map(function() { return [$(this).val(), $(this).text()] }).get();
    }

    function getSelectOptionVals($select) {
      return $select.find("option").map(function() { return $(this).val() }).get();
    }
  };
}(jQuery));