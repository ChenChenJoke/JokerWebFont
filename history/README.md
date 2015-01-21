## History

simulate history with either HTML5 History API or hashchange

## Compatibility

Chrome 1+ / Firefox 10+ / Opera 9+ / IE 8+

## Usage

> Notice: get a history instance first, and then call its pushState method to update history stack or capture popstate event whenever history is changed

```javascript
	// init a history instance
    var historyObj = new History();

    $("#trigger").click(function() {
        index == 3 ? index = 0 : index++;
        var newHash = HASHLIST[index];
        // bind trigger
        historyObj.pushState(newHash);
    });    

    // capture history custom event
    $(historyObj).on("popstate", function(e, hash) {
        callback(hash);
    });
```

### 调用函数 ###

| 函数名        | 参数 | 描述 |
| ------------- |:--------:| -----:|
| pushState     | `String` | 计入历史记录 |

### 抛出事件 ###
| 事件名        | 参数 | 描述 |
| ------------- |:--------:| -----:|
| popstate     | `String` | 前进、后退及hash改变时抛出 |

## Changelog
* 2014/07/28 prototype 1
    
