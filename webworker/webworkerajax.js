
function createXHR() {
    return new XMLHttpRequest();
}

function ajax(obj) {
    var xhr = createXHR();  //创建XHR对象
    //通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题
    obj.url = obj.url + '?rand=' + Math.random();
    obj.data = params(obj.data);  //通过params()将名值对转换成字符串
    //若是GET请求，则将数据加到url后面
    if (obj.method === 'get') {
        obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
    }
    if (obj.async === true) {   //true表示异步，false表示同步
        //使用异步调用的时候，需要触发readystatechange 事件
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {   //判断对象的状态是否交互完成
                callback();      //回调
            }
        };
    }
    //在使用XHR对象时，必须先调用open()方法，
    //它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
    xhr.open(obj.method, obj.url, obj.async);
    if (obj.method === 'post') {
        //post方式需要自己设置http的请求头，来模仿表单提交。
        //放在open方法之后，send方法之前。
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(obj.data);     //post方式将数据放在send()方法里
    } else {
        xhr.send(null);     //get方式则填null
    }
    if (obj.async === false) {  //同步
        callback();
    }
    function callback() {
        if (xhr.status == 200) {  //判断http的交互是否成功，200表示成功
            obj.success(xhr.responseText);          //回调传递参数
        } else {
            alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
        }  
    }
}

function params(data) {
    var arr = [];
    for (var i in data) {
        //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
        arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
    }
    return arr.join('&');
}

for(var i = 0 ; i < 10000000 ; i++) {
    if(i%50000 == 0) {
        ajax({
            method : 'get',
            url : '/WebWorker/webworker',
            data : {
                name : "11",
                pwd:"22"
            },
            success : function (message) {
                console.log("请求成功了");
            },
            async : true
        });
    }
}




