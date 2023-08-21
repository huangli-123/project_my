<script>
var api = null;
api = require("./api.js");

export default {
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    // wx.setStorageSync('logs', logs); // 登录

    var code = wx.getStorageSync('code');
	//#ifdef APP-PLUS  
	    var server = "https://www.jiabusanyi.com/SupermarketApi/Index/appUpdate"; //检查更新地址  
	    var req = { //升级检测数据  
	        "appid": plus.runtime.appid,  
	        "version": plus.runtime.version,
			"os":plus.os.name   
	    };  
	    uni.request({  
	        url: server,  
	        data: req,  
	        success: (res) => {  
				console.log(res);
	            if (res.data.rsp.status === 1) {  
					console.log('k');
	                uni.showModal({ //提醒用户更新  
	                    title: "更新提示",  
	                    content: res.data.rsp.note,  
	                    success: (res2) => {  
							console.log(res2);
	                        if (res2.confirm) {  
	                            plus.runtime.openURL(res.data.rsp.url);  
	                        }  
	                    }  
	                })  
	            }  
	        }  
	    })  
	    //#endif  
    // if (!code) {
    //   wx.login({
    //     // success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     success: function (res) {
    //       console.log(res);

    //       if (res.code) {
    //         //发起网络请求      
    //         wx.request({
    //           url: api + '/SupermarketApi/Passport/login',
    //           data: {
    //             code: res.code
    //           },

    //           success(res) {
    //             wx.setStorageSync('code', res.data);
    //           }

    //         });
    //       } else {
    //         console.log('登录失败！' + res.errMsg);
    //       }
    //     } // }

    //   });
    // } // 获取用户信息


    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo; // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况

    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res);
    //           }
    //         }
    //       });
    //     }
    //   }
    // });
  },
  
  globalData: {
    userInfo: null,

  },
  
  methods: {
	  msgSuccess:function(){
		  uni.getStorage({
		  	key: 'token',
		  	success: function (res) {
		  						return res.data.unionId.unionId;
		  		console.log(res.data);
		  		if(res.data!==null){
		  			uni.request({
		  			    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
		  			    data: { 
		  			        token: res.data
		  			    },
		  				method:'GET',
		  			    header: {
		  			        'custom-header': "hello", //自定义请求头信息
		  			    },
		  			    success: (res) => {
		  			        console.log('333')
		  					console.log(res.data.unionId.unionId)
		    									
		  					if(res.data.status==200){
		    								       
		  					}else{
		  							uni.redirectTo({
		  								url: '/pages/record/record',
		  							    success: res => {console.log('res')},
		  							    fail: () => {console.log('res2')},
		  							    complete: () => {console.log('res3')}
		  							});
		  						}
		  			    }
		  			});
		  		}
		  	},
		  	fail:function(res2){
		  		console.log(res2.data);
		  		uni.redirectTo({
		  			url: '/pages/record/record',
		  		    success: res => {console.log('res')},
		  		    fail: () => {console.log('res2')},
		  		    complete: () => {console.log('res3')}
		  		});
		  	},
		  	complete:function(res3){
		  		console.log(res.data);
		  	}
		  });
	  },
	 
  }
};
</script>
<style>
@import "./app.css";
</style>