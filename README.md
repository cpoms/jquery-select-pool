# jquery.selectPool.js #

**selectPool** links together select inputs with the same options, so that the same option can only be selected in one of the linked select inputs.

### Example

Consider the scenario where you want the user to order three fruits in order of their preference:

    <select name="first" class="select-pool">
      <option value="">Choose your favourite</option>
      <option value="apples">Apples</option>
      <option value="pears">Pears</option>
      <option value="tangerines">Tangerines</option>
    </select>

    <select name="second" class="select-pool">
      <option value="">Choose your second favourite</option>
      <option value="apples">Apples</option>
      <option value="pears">Pears</option>
      <option value="tangerins">Tangerines</option>
    </select>

    <select name="third" class="select-pool">
      <option value="">Choose your third favourite</option>
      <option value="apples">Apples</option>
      <option value="pears">Pears</option>
      <option value="tangerines">Tangerines</option>
    </select>

Using **selectPool**, when you select an option from the first select, it will be removed from all the other selects. Likewise when you change your selection, the previously selected option will be reinserted to the other selects.

You can have multiple select groups on the same page by suffixing the "select-pool" class name with a unique identifier, e.g. "select-pool-1" and "select-pool-2".

### Usage

The best way to apply this plugin is to use the following wildcard selector:

    $("[id^=select-pool]").selectPool();

This is incase you are using the class suffixes to break up select input groupings on the same page.

There is an optional setting *selectClass* that can be passed to change the class name that the plugin uses to identify groups of select inputs, e.g:

    $("[id^=linked-selects]").selectPool({ selectClass: 'linked-selects' });

The above code will work for select inputs with the 'linked-selects' class and derivatives there of ('linked-selects-1', etc).

### License

jquery.selectPool.js is licensed under [The MIT License (MIT)](http://opensource.org/licenses/MIT)
Copyright (c) 2014 Mike Campbell, Meritec Ltd

This license is also supplied with the release and source code.
As stated in the license, absolutely no warranty is provided.