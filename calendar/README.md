# Calendar

* Responsive design [simple / mini / full] multi-mode display; 
* Supports dual calendar display; 
* Supports holidays, events and other expands;
* Supports date range settings;
* Based on Global Hao123 UE design;

## Update

* 2014/03/03

    - new UI for simple
    - ChangeAPI  `yearFrom` / `yearTo` ==> `minDate` / `maxDate`
    - `switchLoop` supports
    - `year/month/day` range setting supports

### DEPENDS

* [Time Landscape](http://gitlab.pro/common-ui/date)

### USAGE

#### example

```html
<div style="position: relative;">
    <input id="miniEmit" type="text" style=" height: 21px; line-height: 21px;">
    <div id="mini" class="ui-bubble ui-bubble-t mod-calendar mod-calendar--mini" style="position: absolute; top: 30px; left: 0;">
        <b class="ui-arrow ui-bubble_out"></b>
        <b class="ui-arrow ui-bubble_in"></b>
        <div class="mod-calendar_hd">
            <a href="#" class="mod-calendar_next">→</a>
            <a href="#" class="mod-calendar_prev">←</a>
            <select class="mod-calendar_year"></select>
            <select class="mod-calendar_month"></select>
        </div>
        <div class="mod-calendar_bd">
            <ul class="mod-calendar_grid mod-calendar_weeks cf"></ul>
            <ul class="mod-calendar_grid mod-calendar_days cf"></ul>
        </div>
        <div class="mod-calendar_ft"></div>
    </div>
</div>
```

```javascript
var mini = $("#mini").calendar({
    onClick: function(y, M, d) {
        $("#miniEmit").val(new Date(y, M, d).format("yyyy-MM-dd"));
        $("dt", this).css({"color": "#f00"});
        mini.$el.hide();
    }
    , onFilterDays: function(data) {
        if(data.d == 13) data.className = 'class=' + this.args.selectorPrefix + "-holiday";
        return data;
    }
});

$("#miniEmit").focus(function() {
    mini.$el.show();
});
```

#### default parameters

```javascript
/**
 * You may provide a new date object to rewrite now
 * @type {Date}
 */
now: new Date

/**
 * Default module selector prefix
 * @type {String}
 */
, selectorPrefix: "mod-calendar"

/**
 * Default text of weeks
 * @type {Array}
 */
, weeks: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 * Menu tpl
 * @type {String}
 */
, tplMenu: '<option value="#{val}" #{selected}>#{name}</option>'

/**
 * Week cell tpl
 * @type {String}
 */
, tplWeek: '<li>#{name}</li>'

/**
 * Day cell tpl
 * @type {String}
 */
, tplDay: '<li #{className}><a href="#{url}" class="#{noLink}"><dl><dt>#{d}</dt><dd>#{info}</dd></dl></a></li>'

/**
 * Footer html snippets
 * @type {String}
 */
, footer: ""

/**
 * Custom min date or the offset of begin date
 * @notice support: "2014/3/1" | 2 | "-1"
 * @notice Built-Lunar only supports 1901/1/1 ~ 2049/12/31
 * @type {String | Number}
 */
, minDate: "2004/3/1"

/**
 * Custom max date or the offset of end date
 * @notice support: "2014/3/1" | 2 | "/1"
 * @notice Built-Lunar only supports 1901/1/1 ~ 2049/12/31
 * @type {String | Number}
 */
, maxDate: "2024/3/1"

/**
 * Abbreviation week(3 letters, uppercase)
 * @type {Boolean}
 */
, isAbbrWeek: true

/**
 * the beginning week name of the week
 * @type {Number}
 */
, beginDay: 1

/**
 * Whether to allow loop switch
 * @type {Boolean}
 */
, switchLoop: false

/**
 * Custom switch date handle
 * @type {[Function]}
 */
, onSwitch: noop

/**
 * Custom click handle
 * @type {[Function]}
 */
, onClick: noop

/**
 * The filter of day render
 * @param  {[Object]} o {className, d, y, M, info, url}
 * @return {[Object]}
 */
, onFilterDays: function(o) {
    return o;
}
```

