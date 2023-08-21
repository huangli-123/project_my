import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;
// Vue.prototype.checkToken= false;
// Vue.prototype.checkToken = function () {  
// 	try {
// 	    const value = uni.getStorageSync('token');
// 	    if (value) {
// 			uni.request({
// 			    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
// 			    data: {
// 			        token: value
// 			    },
// 				method:'GET',
// 			    header: {
// 			        'custom-header': "hello", //自定义请求头信息
// 			    },
// 			    success: (res) => {
// 			        console.log('333')
// 					console.log(res.data.unionId.unionId)
// 					if(res.data.status==200){
// 						return res.data.unionId.unionId;
// 					}else{
// 							uni.redirectTo({
// 								url: '/pages/record/record',
// 							    success: res => {console.log('res')},
// 							    fail: () => {console.log('res2')},
// 							    complete: () => {console.log('res3')}
// 							});
// 						}
// 			    }
// 			});
// 	    }else{
// 			uni.redirectTo({
// 				url: '/pages/record/record',
// 			    success: res => {console.log('res')},
// 			    fail: () => {console.log('res2')},
// 			    complete: () => {console.log('res3')}
// 			});
// 		}
// 	} catch (e) {
// 	    // error
		
// 	}
//     // uni.getStorage({
//     // 			  	key: 'token',
//     // 			  	success: function (res) {
//     // 			  		console.log(res.data);
//     // 			  		if(res.data!==null){
//     // 			  			uni.request({
//     // 			  			    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
//     // 			  			    data: {
//     // 			  			        token: res.data
//     // 			  			    },
//     // 			  				method:'GET',
//     // 			  			    header: {
//     // 			  			        'custom-header': "hello", //自定义请求头信息
//     // 			  			    },
//     // 			  			    success: (res) => {
//     // 			  			        console.log('333')
//     // 			  					console.log(res.data.unionId.unionId)
//     // 			  					if(res.data.status==200){
//     // 			  						return res.data;
//     // 			  					}else{
//     // 			  							uni.redirectTo({
//     // 			  								url: '/pages/record/record',
//     // 			  							    success: res => {console.log('res')},
//     // 			  							    fail: () => {console.log('res2')},
//     // 			  							    complete: () => {console.log('res3')}
//     // 			  							});
//     // 			  						}
//     // 			  			    }
//     // 			  			});
//     // 			  		}
//     // 			  	},
//     // 			  	fail:function(res2){
//     // 			  		console.log(res2.data);
//     // 			  		uni.redirectTo({
//     // 			  			url: '/pages/record/record',
//     // 			  		    success: res => {console.log('res')},
//     // 			  		    fail: () => {console.log('res2')},
//     // 			  		    complete: () => {console.log('res3')}
//     // 			  		});
//     // 			  	},
//     // 			  	complete:function(res3){
//     // 			  		console.log(res.data);
//     // 			  	}
//     // 			  });
    	
//     }

Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			const handleData = (tepData, tepKey, afterKey) => {
				tepKey = tepKey.split('.');
				tepKey.forEach(item => {
					if (tepData[item] === null || tepData[item] === undefined) {
						let reg = /^[0-9]+$/;
						tepData[item] = reg.test(afterKey) ? [] : {};
						tepData = tepData[item];
					} else {
						tepData = tepData[item];
					}
				});
				return tepData;
			};
			const isFn = function(value) {
				return typeof value == 'function' || false;
			};
			Object.keys(obj).forEach(function(key) {
				let val = obj[key];
				key = key.replace(/\]/g, '').replace(/\[/g, '.');
				let front, after;
				let index_after = key.lastIndexOf('.');
				if (index_after != -1) {
					after = key.slice(index_after + 1);
					front = handleData(that, key.slice(0, index_after), after);
				} else {
					after = key;
					front = that;
				}
				if (front.$data && front.$data[after] === undefined) {
					Object.defineProperty(front, after, {
						get() {
							return front.$data[after];
						},
						set(newValue) {
							front.$data[after] = newValue;
							that.$forceUpdate();
						},
						enumerable: true,
						configurable: true
					});
					front[after] = val;
				} else {
					that.$set(front, after, val);
				}
			});
			// this.$forceUpdate();
			isFn(callback) && this.$nextTick(callback);
		},
		// checkToken: function(){
		// 		  uni.getStorage({
		// 		  	key: 'token',
		// 		  	success: function (res) {
		// 		  		console.log(res.data);
		// 		  		if(res.data!==null){
		// 		  			uni.request({
		// 		  			    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
		// 		  			    data: {
		// 		  			        token: res.data
		// 		  			    },
		// 		  				method:'GET',
		// 		  			    header: {
		// 		  			        'custom-header': "hello", //自定义请求头信息
		// 		  			    },
		// 		  			    success: (res) => {
		// 		  			        console.log('333')
		// 		  					console.log(res.data.unionId.unionId)
		// 		  					if(res.data.status==200){
		// 		  						return res.data;
		// 		  					}else{
		// 		  							uni.redirectTo({
		// 		  								url: '/pages/record/record',
		// 		  							    success: res => {console.log('res')},
		// 		  							    fail: () => {console.log('res2')},
		// 		  							    complete: () => {console.log('res3')}
		// 		  							});
		// 		  						}
		// 		  			    }
		// 		  			});
		// 		  		}
		// 		  	},
		// 		  	fail:function(res2){
		// 		  		console.log(res2.data);
		// 		  		uni.redirectTo({
		// 		  			url: '/pages/record/record',
		// 		  		    success: res => {console.log('res')},
		// 		  		    fail: () => {console.log('res2')},
		// 		  		    complete: () => {console.log('res3')}
		// 		  		});
		// 		  	},
		// 		  	complete:function(res3){
		// 		  		console.log(res.data);
		// 		  	}
		// 		  });
		// },
	}
});

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
