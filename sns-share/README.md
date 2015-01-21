# jQuery sns-share plugin

A simple sns share service wrapper.

## Compatibility

- IE 6-10, Firefox, Opera, Chrome, Safari
- ltr / rtl
- Windows / Mac

## Depends

- jQuery 1.7+ (with new Event APIs)

## TODO

- more test
- more demo
- css

## Demo

## Getting Started

First of all, you must know what is the default data structure:

```javascript
{
    /**
     * UI config
     * @type {Object}
     * @notice top / left default setting centered(can be {Number} or {Function})
     */
    ui: {
        width: winWidth
        , height: winHeight
        , top: function() {
            return $(WIN).height() - winWidth / 2
        }
        , left: function() {
            return $(WIN).width() - winHeight / 2
        }
        , skin: "skin"
        , eventType: "click"
        , tplWrap: '<ul class="sns-share sns-share--#{skin}">#{inner}</ul>'
        , tplLi: '<li class="sns-share_li sns-share_li-#{service}"><a href="#" data-sns-share="#{service}" title="#{service}" hidefocus="true" onclick="return false"></a></li>'
        , winHandle: landing window handle //redirect an existing window's href to share url to avoid browsers' block-new-window strategy
    }

    /**
     * API services
     * @type {Object}
     */
    , services: {
        facebook: {
            api: "https://www.facebook.com/sharer/sharer.php?s=100&p[title]=#{title}&p[summary]=#{summary}&p[images][0]=#{image}&p[url]=#{url}"
            , active: true
        }
        
        , twitter: {
            api: "https://twitter.com/intent/tweet?text=#{input}&url=#{url}"
        }

        , googleplus: {
            api: "https://plus.google.com/share?url=#{url}&t=#{title}&hl=#{lang}"
        }

        , zingme: {
            api: "http://link.apps.zing.vn/share?url=#{url}&title=#{title}&description=#{description}&screenshot=#{image}"
        }
    }

    /**
     * Default service
     * @type {Object}
     */
    , service: "facebook"

    /**
     * Share info
     * @type {Object}
     */
    , info: {
        url: WIN.location.href
        , title: DOC.title
        , summary: $("[name=title]").attr("content") || ""
        , image: "/static/web/common/img/fb-logo.png"
        , description: $("[name=description]").attr("content") || ""
        , input: ""
        , lang: NAV.browserLanguage || NAV.language || NAV.userLanguage || ""
    }
}
```

### SETUP 1

Common config in cms, like:

```javascript
snsShare: {
    // ui: {},
    // services: {},
    info: {
        title: ""
        , summary: ""
    }
}
```

Please pay attention to maintaining consistent data structure.

### SETUP 2

require plugin:

```html
<link rel="stylesheet" href="sns-share.css">
<script src="sns-share.js"></script>
```

or use the require mode.

### SETUP 3

html snippet:

```html
<div id="snsShare"></div>
```

simple bind a element:

```javascript
$("#snsShare").snsShare();
```

## Examples

There are two ways to use it.

### Mode 1

Create with jQuery DOM:

```javascript
// Only create facebook + twitter
$("#snsShare").snsShare(OverwritDataStructure, ["facebook", "twitter"]);

// Default build all services
$("#snsShare").snsShare(OverwritDataStructure);

// A way to dynamic overwrite data
$("#snsShare").snsShare(null, null, function(data) {
    data.info.image = this.src;
    return data;
});
```

### Mode 2

Also you can direct share it

```javascript
$.snsShare(OverwritDataStructure);
```


### Add a new service


Very easy, you only need to:

```javascript
$("#snsShare").snsShare({
    services: {
        "AnNewService": {
            api: "https://www.new.com/sharer/sharer.php?title=#{title}&images=image&url=#{url}"
        }
    }
});

// Or add in CMS
snsShare: {
    services: {
        "AnNewService": {
            api: "https://www.new.com/sharer/sharer.php?title=#{title}&images=#{image}&url=#{url}"
        }
    }
}
```

## Options handling

    OverwritDataStructure > CMS config > Default options

Please pay attention to maintaining consistent data structure.

## Options support

|service  |  image | input | summary | title | description | lang
| ------------- |:-----|:--------:| -----:| -----:| -----:| -----:|
|facebook|- (must be in the same domain with share url)|×|√|√|×|×|
|facebook_feed|√|×|√|√|√|√|
|twitter|×|√|×|×|×|×|
|googleplus|- (only: microdata / Open Graph protocol / meta)|×|×|√|×|√|
|zingme|√|√|×|√|√|×|

Notice: 

- The zingme URL must have the http protocol.
- If you want share link with image, please use `facebook_feed` service.

## Contributing

## Release History

* 2013/12/10 - v1.1.0
    - [API] Now facebook share support any picture, even cross-domain, see: [share_image](http://view.gitlab.pro/common-ui/sns-share/raw/master/demo/share_image.html).
    - [API] Add a new prop in service config: `active`.

* 2013/10/31 - v0.1.0 - First release

## License

Copyright (c) 2012 Boaz Sender  
Licensed under the MIT, GPL licenses.
http://code.bocoup.com/license/

## Authors

* [yuji](http://gitlab.pro/u/yuji)
* [wangmingfei](http://gitlab.pro/u/wangmingfei)