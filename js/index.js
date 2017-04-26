var myApp=angular.module('myApp',['ngRoute',"moviecatJsonpApp"]);
//路由
myApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/Recommend',{
		controller:"RecommendController",//推荐
		templateUrl:"Recommend.html"
	}).when('/remengequ/:id',{
		controller:"remengequController",//热门歌曲
		templateUrl:"remengequ.html"
	}).when('/gequ/:id',{
		controller:"gequController",//歌曲播放
		templateUrl:"gequ.html"
	}).when('/Ranking',{
		controller:"RankingController",//排名榜
		templateUrl:"Ranking.html"
	}).when('/paimingzhishu/:id',{
		controller:"paimingzhishuController",//排名榜歌曲100
		templateUrl:"paimingzhishu.html"
	}).when('/search',{
		controller:"searchController",//搜索
		templateUrl:"search.html"
	}).otherwise({
		redirectTo:"Recommend"
	})
}]);



//推荐
myApp.controller("RecommendController",["$scope","jsonpService",function($scope,jsonpService){
	$scope.donghua = true;
	jsonpService.jsonp("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=938407465&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1487567432353",{jsonpCallback:"jsonp"},function(data){
		$scope.data=data.data;
		console.log($scope.data);
		$scope.donghua=false;
		$scope.$apply();
	});
	
//轮播图
slider();
function slider(){
    //需求分析
    //1、自动轮播 (定时器 过渡)
    //2、小圆点随着图片滚动(监听图片显示的索引，然后设置当前样式now)
    //3、图片能滑动(touch)
    //4、滑动不超过一定距离 吸附回去 (过渡)
    //5、滑动超过一定距离 滚动到下一张(过渡)
    
    //0、获取事件源和相关元素
    var box = document.querySelector(".recommend");
    var imgUl = box.children[0];
    var dotUl = box.children[1];
    var imgLis = imgUl.children;
    var dotLis = dotUl.children;
    var width = box.offsetWidth;
    var num = 1;
   
    //1、自动轮播 (定时器 过渡)
    clearInterval(box.timer);
    box.timer = setInterval(function(){
        num++;
        chinasofti.addTransition(imgUl);
        chinasofti.setTransform(imgUl,-num*width);

    }, 3000)
    
    chinasofti.addTransitionEnd(imgUl, function(){
        if(num>imgLis.length-2){
            num = 1;
            chinasofti.removeTransition(imgUl);
            chinasofti.setTransform(imgUl,-num*width);
        }else if(num==0){
            num = imgLis.length-2;
            chinasofti.removeTransition(imgUl);
            chinasofti.setTransform(imgUl,-num*width);
        }
        light();
    })
    //2、小圆点随着图片滚动(监听图片显示的索引，然后设置当前样式now)
    function light(){
        for(var i =0;i<dotLis.length;i++){
            dotLis[i].className = "";
        }
        dotLis[num-1].className = "now";
    }
    
    //4、滑动不超过一定距离 吸附回去 (过渡)
    //5、滑动超过一定距离 滚动到下一张(过渡)
    var startX = 0 ;
    var moveX = 0 ;
    var endX = 0;
    var isMove = false;
    var distance = 0;
    imgUl.addEventListener("touchstart", function(e){
        clearInterval(box.timer);
        startX = e.touches[0].clientX;
    })
    imgUl.addEventListener("touchmove", function(e){
        moveX = e.touches[0].clientX;
        isMove = true;
        //3、图片能滑动(touch)
        distance = moveX - startX;
        chinasofti.removeTransition(imgUl);
        chinasofti.setTransform(imgUl,-num*width+distance);
        // if(distance>0){
        //     //distance>0,右滑，就是要看上一张
        //     setTransform(imgUl,-num*width+distance);
        // }else{
        //     //distance<0,左滑，就是要看下一张
        //     setTransform(imgUl,-num*width+distance);
        // }
        
    })
    imgUl.addEventListener("touchend", function(e){
        endX = moveX;
        if(isMove){
            if(Math.abs(distance)>width/3){
              if(distance>0){
                    num--;
              }else{
                    num++;
              }
                chinasofti.addTransition(imgUl);
                chinasofti.setTransform(imgUl,-num*width);

            }else{
                chinasofti.addTransition(imgUl);
                chinasofti.setTransform(imgUl,-num*width);
            }
        }
        clearInterval(box.timer);
        box.timer = setInterval(function(){
        num++;
        chinasofti.addTransition(imgUl);
        chinasofti.setTransform(imgUl,-num*width);

        }, 3000)
        startX = 0 ;
        moveX = 0 ;
        endX = 0;
        isMove = false;
        distance = 0;
    });
    
}
//导航栏
//var qqnav=document.querySelector(".qq-nav");
//console.log(qqnav);
//var aliSS=qqnav.children
//console.log(aliSS);
//function lightaa(){
//	for(var i=0;i<aliSS.length;i++){
//		aliSS[i].className=""
//	}
//}
//asdasd();
//function asdasd(){
//	for(var i=0;i<aliSS.length;i++){
//		aliSS[i].onclick=function(){
//			lightaa();
//			this.className="curret";
//		}
//	}
//}

  

}]);
//热门歌曲
myApp.controller("remengequController",["$scope","jsonpService","$http","$interval","$location","$routeParams",function($scope,jsonpService,$http,$interval,$location,$routeParams){	
	$scope.donghua = true;
	jsonpService.jsonp("https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?platform=h5&new_format=1&pic=500&type=1&disstid="+$routeParams.id,{jsonpCallback:"jsonp"},function(data){
		 $scope.data=data;
		 $scope.donghua = false;
		 console.log($scope.data);		 
		 $scope.$apply();
	})
}]);
//歌曲播放
myApp.controller("gequController",["$scope","jsonpService","$http","$interval","$location","$routeParams","$sce",function($scope,jsonpService,$http,$interval,$location,$routeParams,$sce){	
	$scope.trustSrc = function(url){
		console.log(url)
		return $sce.trustAsResourceUrl(url);
	}
	$scope.donghua = true;
	jsonpService.jsonp("http://i.y.qq.com/v8/fcg-bin/fcg_get_song_detail.fcg?songid="+$routeParams.id,{jsonpCallback:"jsonp"},function(data){
		$scope.donghua = false;
		$scope.data=data;
    $scope.daurl="http://ws.stream.qqmusic.qq.com/"+$routeParams.id+".m4a?fromtag=38";
		 console.log($scope.data);
//		 console.log( $scope.trustSrc)
	$scope.lyrics=$scope.data.data.info[$scope.data.data.info.length-1].content.value.split('\n');
		var it=0;
		var locetex=[];
		for(var i=0;i<$scope.lyrics.length;i++){
			if($scope.lyrics[i].split(']')[1].length>0){
				locetex[it]=$scope.lyrics[i].split(']')[1];
				it++;
			}
		}
		$scope.locetex=locetex;
		 $scope.$apply();
		 var videoId=document.getElementById("videoId");
		 var bofangtubiao=document.querySelector(".icon-a");
		 var lyricTxt=document.getElementById("lyric_txt");
//		 console.log(bofangtubiao)
//		 console.log(videoId)
        videoId.ontimeupdate=function(){

			lyricTxt.style.transition="all .5s linear";
			lyricTxt.style.transform="translateY("+-(lyricTxt.offsetHeight*(Math.ceil(videoId.currentTime)/Math.ceil(videoId.duration)))+"px)";
		}
		 $scope.iconPlay=function(){
	        if (!videoId.paused) {
	            videoId.pause();
	            videoId.paused = true;
	              bofangtubiao.style.backgroundPosition="0px -150px";
	            
	        }else{
	            videoId.play();
	            videoId.paused = false;
	            bofangtubiao.style.backgroundPosition="0px -180px";
	        }      
	    };
	})
}]);

//排行榜

myApp.controller("RankingController",["$scope","jsonpService",function($scope,jsonpService){
$scope.donghua = true;
	jsonpService.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?format=jsonp&g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1492697023263",{jsonpCallback:"jsonp"},function(data){
		$scope.data=data.data;
		console.log($scope.data);
		$scope.donghua = false;
		$scope.$apply();
	});
	
	
}]);	
//排行榜歌曲100

myApp.controller("paimingzhishuController",["$scope","jsonpService","$routeParams",function($scope,jsonpService,$routeParams){
	$scope.donghua = true;
	jsonpService.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?format=json&topid="+$routeParams.id,{jsonpCallback:"jsonp"},function(data){
		$scope.data=data;
		console.log($routeParams.id)
		console.log($scope.data);
		$scope.donghua = false;
		$scope.$apply();
	});
	
	
}]);

//搜索
myApp.controller("searchController",["$scope","jsonpService","$http","$interval","$routeParams",function($scope,jsonpService,$http,$interval,$routeParams){
	$scope.ngIf=true;
	jsonpService.jsonp("https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?jsonpCallback=hotSearch",{jsonpCallback:"jsonp"},function(data){
		console.log(data)
		$scope.dbg=data
		$scope.dp=data.data.hotkey;
		$scope.ngIf=false;
		$scope.$apply();
	});
	$scope.midfun=function(e){
		$scope.mid=e;
		$scope.sear($scope.mid);
		$scope.sehInpif=true;
	}
	$scope.resultif=false;
	$scope.sehInpif=false;
	$scope.ngif=false;
	$scope.sear=function(id){
		console.log(id);
		jsonpService.jsonp("https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?perpage=20&catZhida=1&w="+id,{jsonpCallback:""},function(data){
			$scope.data=data;
			console.log($scope.data);
			$scope.ngif=true;
			$scope.resultif=true;
			if(data.data.zhida.singername==undefined){
				$scope.ngif=false;
			}
			$scope.$apply();
		});
	}
	$scope.sehInp=function(){
		$scope.sehInpif=true;
	}
	$scope.cancelIf=function(){
		$scope.mid="";
		$scope.sehInpif=!$scope.sehInpif;
		$scope.resultif=false;
	}
	
}]);










