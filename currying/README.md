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