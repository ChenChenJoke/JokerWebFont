Media Queries直译过来就是“媒体查询”，在我们平时的Web页面中head部分常看到这样的一段代码：
```javascript
  <link href="css/reset.css" rel="stylesheet" type="text/css" media="screen" />
  <link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
  <link href="css/print.css" rel="stylesheet" type="text/css" media="print" />
```
或者这样的形式：
```javascript
  <style type="text/css" media="screen">
    @import url("css/style.css");
  </style>
 ```
不知道大家留意没有，其中两种方式引入CSS样式都有一个共同的属性“media”，而这个“media”就是用来指定特定的媒体类型，在HTML4和CSS2中充许你使用“media”来指定特定的媒体类型，
如屏幕（screen）和打印（print）的样式表，当然还有其他的，比如说“TV”,“handheld”等，其中“all”表示的是支持所有媒体介质。有关于更多的Media类型，可以点击这里。
上面简单说了一下HTML4和CSS2的“Media Queries”,而今天的主要是来学习CSS3中的"Media Queries"的更多使用方法和相关知识，下面我们开始进入今天的主题。
CSS3中的Media Queries增加了更多的媒体查询，同时你可以添加不同的媒体类型的表达式用来检查媒体是否符合某些条件，如果媒体符合相应的条件，那么就会调用对应的 样式表。
换句简单的说，“在CSS3中我们可以设置不同类型的媒体条件，并根据对应的条件，给相应符合条件的媒体调用相对应的样式表”。
现在最常见的一个 例子，你可以同时给PC机的大屏幕和移动设备设置不同的样式表。这功能是非常强大的，他可以让你定制不同的分辨率和设备，并在不改变内容的情况下，
让你制 作的web页面在不同的分辨率和设备下都能显示正常，并且不会因此而丢失样式。
首先来看一个简单的实例：
```javascript
  <link rel="stylesheet" media="screen and (max-width: 600px)" href="small.css" />
```
上面的media语句表示的是：当页页宽度小于或等于600px,调用small.css样式表来渲染你的Web页面。首先来看media的语句中包含的内容：
1、screen：这个不用说大家都知道，指的是一种媒体类型；
2、and：被称为关键词，与其相似的还有not,only，稍后会介绍；
3、（max-width:600px）：这个就是媒体特性，说得通俗一点就是媒体条件。
前面这个简单的实例引出两个概念性的东西，一个就是媒体类型（Media Type）和 媒体特性（Media Query），首先一起来理解一下这两个概念：
一、媒体类型(Media Type)
媒体类型(Media Type)在css2中是一个常见的属性，也是一个非常有用的属性，可以通过媒体类型对不同的设备指定不同的样式，在css2中我们常碰到的就是 all（全部）,screen（屏幕）
,print（页面打印或打邱预览模式）,其实在媒体类型不止这三种，w3c总共列出了10种媒体类型。
页面中引入媒体类型方法也有多种：
####1、link方法引入####
```javascript
   <link rel="stylesheet" type="text/css" href="../css/print.css" media="print" />
```
####2、xml方式引入####
```javascript
  <?xml-stylesheet rel="stylesheet" media="screen" href="css/style.css" ？>
```
####3、@import方式引入####
@import引入有两种方式，一种是在样式文件中通过@import调用别一个样式文件；另一种方法是 在<head>>/head>中的<style>...</style>中引入，单这种使用方法在 ie6-7都不被支持 如
样式文件中调用另一个样式文件：
```javascript
   @import url("css/reset.css") screen;
   @import url("css/print.css") print;
```
在<head>>/head>中的<style>...</style>中调用：
```javascript
  <head>
    <style type="text/css">
    @import url("css/style.css") all;
    </style>
  </head>   
```     
####4、@media引入####
这种引入方式和@imporr是一样的，也有两种方式：
样式文件中使用：
   @media screen{
     选择器{
    属性：属性值；
     }
   }
在<head>>/head>中的<style>...</style>中调用：
```javascript
  <head>
    <style type="text/css">
    @media screen{
           选择器{
         属性：属性值；
       }
    }
    </style>
  </head>       
  ``` 
以上几种方法都有其各自的利弊，在实际应用中我建议使用第一种和第四种，因为这两种方法是在项目制作中是常用的方法，对于他们的具体区别，我就不说了，想了解的大家可以去找度娘或Ｇ爸，
他们能帮你解决。
二、媒体特性（Media Query）
前面有简单的提到，Media Query是CSS3 对Media Type的增强版，其实可以将Media Query看成Media Type(判断条件)+CSS(符合条件的样式规则)，常用的特性w3c共列出来13种。
具体的可以参阅：Media features。为了更能理解Media Query，我们在次回到前面的实例上：
  <link rel="stylesheet" media="screen and (max-width: 600px)" href="small.css" />
转换成css中的写法为：
  @media screen and (max-width: 600px) {
    选择器 {
      属性：属性值；
    }
  }
其实就是把small.css文件中的样式放在了@media srceen and (max-width;600px){...}的大括号之中。在语句上面的语句结构中，可以看出Media query和css的属性集合很相似，主要区别在：
1、Media query只接受单个的逻辑表达式作为其值，或者没有值；
2、css属性用于声明如何表现页页的信息；而Media Query是一个用于判断输出设备是否满足某种条件的表达式；
3、Media Query其中的大部分接受min/max前缀，用来表示其逻辑关系，表示应用于大于等于或者小于等于某个值的情况
4、CSS属性要求必须有属性值，Media Query可以没有值，因为其表达式返回的只有真或假两种
常用的Media Query如下表所示：
 
兼容的浏览器：
 
下面我们一起来看看Media Queries的具体使用方式
####一、最大宽度Max Width####
  <link rel="stylesheet" media="screen and (max-width:600px)" href="small.css" type="text/css" />
上面表示的是：当屏幕小于或等于600px时，将采用small.css样式来渲染Web页面。
####二、最小宽度Min Width####
   <link rel="stylesheet" media="screen and (min-width:900px)" href="big.css" type="text/css"  />
上面表示的是：当屏幕大于或等于900px时，将采用big.css样式来渲染Web页面。
####三、多个Media Queries使用####
   <link rel="stylesheet" media="screen and (min-width:600px) and (max-width:900px)" href="style.css" type="text/css" />
Media Query可以结合多个媒体查询，换句话说，一个Media Query可以包含0到多个表达式，表达式又可以包含0到多个关键字，以及一种Media Type。
正如上面的其表示的是当屏幕在600px-900px之间时采用style.css样式来渲染web页面。
####四、设备屏幕的输出宽度Device Width####
   <link rel="stylesheet" media="screen and (max-device-width: 480px)" href="iphone.css" type="text/css" />
上面的代码指的是iphone.css样式适用于最大设备宽度为480px，比如说iPhone上的显示，这里的max-device-width所指的是设备的实际分辨率，也就是指可视面积分辨率
####五、iPhone4####
   <link rel="stylesheet" media="only screen and (-webkit-min-device-pixel-ratio: 2)" type="text/css" href="iphone4.css" />
上面的样式是专门针对iPhone4的移动设备写的。
####六、iPad####
  <link rel="stylesheet" media="all and (orientation:portrait)" href="portrait.css" type="text/css" /> 
  <link rel="stylesheet" media="all and (orientation:landscape)" href="landscape.css"  type="text/css" />
在大数情况下，移动设备iPad上的Safari和在iPhone上的是相同的，只是他们不同之处是iPad声明了不同的方向，比如说 上面的例子，在纵向(portrait)时采用portrait.css来渲染页面；
在横向（landscape）时采用landscape.css来渲 染页面。
####七、android####
  /*240px的宽度*/
  <link rel="stylesheet" media="only screen and (max-device-width:240px)" href="android240.css" type="text/css" />
  /*360px的宽度*/
  <link rel="stylesheet" media="only screen and (min-device-width:241px) and (max-device-width:360px)" href="android360.css" type="text/css" />
  /*480px的宽度*/
  <link rel="stylesheet" media="only screen and (min-device-width:361px) and (max-device-width:480px)" href="android480.css" type="text/css" />
我们可以使用media query为android手机在不同分辨率提供特定样式，这样就可以解决屏幕分辨率的不同给android手机的页面重构问题。
####八、not关键字####
  <link rel="stylesheet" media="not print and (max-width: 1200px)" href="print.css" type="text/css" />
not关键字是用来排除某种制定的媒体类型，换句话来说就是用于排除符合表达式的设备。
####九、only关键字####
  <link rel="stylesheet" media="only screen and (max-device-width:240px)" href="android240.css" type="text/css" />
only用来定某种特定的媒体类型，可以用来排除不支持媒体查询的浏览器。其实only很多时候是用来对那些不支持Media Query但却支持Media Type的设备隐藏样式表的。
其主要有：支持媒体特性（Media Queries）的设备，正常调用样式，此时就当only不存在；对于不支持媒体特性(Media Queries)但又支持媒体类型(Media Type)的设备，这样就会不读了样式，
因为其先读only而不是screen；另外不支持Media Qqueries的浏览器，不论是否支持only，样式都不会被采用。
####十、其他####
在Media Query中如果没有明确指定Media Type，那么其默认为all，如：
  <link rel="stylesheet" media="(min-width: 701px) and (max-width: 900px)" href="medium.css" type="text/css" />
另外还有使用逗号（，）被用来表示并列或者表示或，如下
  <link rel="stylesheet" type="text/css" href="style.css" media="handheld and (max-width:480px), screen and (min-width:960px)" />
上面代码中style.css样式被用在宽度小于或等于480px的手持设备上，或者被用于屏幕宽度大于或等于960px的设备上。
关于Media Query的使用这一节就介绍到此，最后总体规纳一下其功能，个人认为就是一句话：Media Queries能在不同的条件下使用不同的样式，使用页面达到不同的渲染效果。