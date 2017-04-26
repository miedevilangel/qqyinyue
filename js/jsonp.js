angular.module("moviecatJsonpApp",[]).service('jsonpService',['$window',function($window){
	this.jsonp=function(url,data,fn){
		//生成一个随机的函数名
		var callbackName='jsonp'+new Date().getTime()+Math.random().toString().substr(2);
		//有一个全局函数，函数名是
		$window[callbackName]=function(data){
			fn(data);
			$window.document.body.removeChild(script);
		};
		 //生成请求地址：		
//		var url+=url+"?";
	    url+="&jsonpCallback="+callbackName;
		var script = document.createElement('script');
      script.src=url;
        //把新建的script标签插入body的末尾
        $window.document.body.appendChild(script);
	}
}])
