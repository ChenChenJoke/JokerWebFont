Currying
============

######From Wikipedia, the free encyclopedia######

**For leather finishing, see Currier.**
**In mathematics and computer science, currying is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument (partial application).**
**It was introduced by Moses Schönfinkel[1][2][3] and later developed by Haskell Curry.[4][5]**

**Uncurrying is the dual transformation to currying, and can be seen as a form of defunctionalization. 
It takes a function f(x) which returns another function g(y) as a result,
and yields a new function f′(x,y) which takes a number of additional parameters and applies them to the function returned by function f.
The process can be iterated if necessary.**



**译文：在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，**
**并且返回接受余下的参数而且返回结果的新函数的技术。这个技术由Christopher Strachey以逻辑学家哈斯凯尔·加里命名的，**
**尽管它是Moses Schönfinkel和戈特洛布·弗雷格发明的。在直觉上，柯里化声称“如果你固定某些参数，你将得到接受余下参数的一个函数”。**
**所以对于有两个变量的函数y^x，如果固定了y=2，则得到有一个变量的函数2^x。**
**在理论计算机科学中，柯里化提供了在简单的理论模型中，比如：只接受一个单一参数的lambda演算中，研究带有多个参数的函数的方式。**
**函数柯里化的对偶是Uncurrying，一种使用匿名单参数函数来实现多参数函数的方法。**



我感觉维基百科这个解释应该是最贴切的，从计算机科学角度来讲这是一种思想，并不是某种语言的特性，但是作为一名前端工作者，我还是从前端入手。

让我们先看一下下面这个例子：


```javascript
/**工厂模式**/
var Car = (function () {
    var Car = function (model, year, miles) {
        this.model = model;
        this.year = year;
        this.miles = miles;
    };
    return function (model, year, miles) {
        return new Car(model, year, miles);
    };
})();

var tom = new Car("Tom", 2009, 20000);
var dudu = new Car("Dudu", 2010, 5000);
```

上面的代码是一个用javascript的简单的工厂模式，这个工厂是生产汽车的，
我们可以通过new Car来得出我们想要的汽车。我们只有一个汽车厂，但是可以生产出来不同的汽车。
我相信大家这个都可以理解。这个工厂是生产object的。为什么要先说这个呢，我个人感觉，currying
其实也是一个工厂，不过是生产具体function的（在这里我们对于function 和 object不做狭义区分，因为
在javascript中一切皆对象）。下面让我们看这个例子。


```javascript
/**工厂模式**/
// 数字求和函数的函数生成器
function addGenerator(num){
  // 返回一个简单的函数，求两个数字的和，其中第一个数字来自生成器
  return function(toAdd){
    return num + toAdd;
  };
}

// addFive 现在包含一个接受单一参数的函数，这个函数能求得 5 加上该参数的和
var addFive = addGenerator(5);
var addSix = addGenerator(6);
var addSeven = addGenerator(7);

// 这里我们可以看到，在传入参数为 4 时，addFive addSix addSeven这三个方法所得的是9/10/11
addFive(4);//结果为9
addSix(4);//结果为10
addSeven(4);//结果为11
*/
```

上面我们看到了什么，我们本来只有一个方法，但是我用那个方法，又生产了出了三个额外的方法。
我的第一个addGenerator是不是变成了一个工厂了，是不是生产出了三个函数，他们的共同点都是输入一个数
进行求和，但是不同点是他们的第一个值被锁定了。有人感觉我说的有点啰嗦，这么简单的东西干嘛废话
讲这么多，而且这东西有什么用呢？如果您也是这么认为的那么请往下看。



######我们需要一个函数来绑定dom事件，原生js的写法一般情况下是这样的######


```javascript

var addEvent = function(el, type, fn, capture) {
    if (window.addEventListener) {
        el.addEventListener(type, function(e) {
            fn.call(el, e);
        }, capture);
    } else if (window.attachEvent) {
        el.attachEvent("on" + type, function(e) {
            fn.call(el, e);
        });
    } 
};

```
我相信大多数人跟我的写法差不多。包括我自己之前也一直是什么写，没有什么不好。突然有一天，我认识了currying，
所以我想换个写法。

```javascript

var addEvent = (function(){
    if (window.addEventListener) {
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        return function(el, sType, fn, capture) {
            el.attachEvent("on" + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})();

```


大家看出了什么不同了么，addEvent里面不就是多了两个return么。这有什么区别，其实这里形成了两个闭包，我把两种浏览器
的绑定事件的状态存了起来。把判断浏览器作为固定参数锁定了。可能大家还不太清楚。

> notice: 
> 第一种方法我们执行的时候，我们的方法是整个函数，每次执行都要进行判断if else相信这点大家都没有任何异议。
> 第二种方法我们只执行了一次，我们就会得到一个函数

**在标准浏览器下他是**

```javascript

var addEvent =  function(el, sType, fn, capture) {
		            el.addEventListener(sType, function(e) {
		                fn.call(el, e);
		            }, (capture));
			        
			    }
```


**在IE浏览器下他是**

```javascript

var addEvent =  function(el, sType, fn, capture) {
		            el.attachEvent("on" + sType, function(e) {
	                	fn.call(el, e);
	            	});
			    
			    }
```

我们其实生产出来一个新的函数来适配当前浏览器，不用每次进行判断，因为我们已经锁定了**到底是哪个浏览器**这个参数。
是不是很简单。这仅仅是一个很小的用处，我们可以把很多复杂的参数通过锁定参数的方法，生成更多的简化的方法。有人说
这跟我写多个函数的区别在哪里，仅仅代码上的简化么？而且这样写我会更加难以理解。