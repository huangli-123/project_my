<template>
<view class="html">
<view v-for="(item, Findex) in cartgoods" :key="Findex" class="main" v-if="cartgoods">
    <view class="title flex alignItems">
      <image :src="item.shop_image" class="good-img"></image>
      <text>{{item.name}}</text>
    </view>
   <checkbox-group>
    <view v-for="(item, Sindex) in item.group" :key="Sindex" class="good-list">
        <label>
            <checkbox class="good-list-checkbox" :checked="item.checked" :data-indexf="Findex" :data-indexs="Sindex" @tap="change"></checkbox>
        </label>
        <image :src="item.photo" class="good-img"></image>
        <view class="good-list-view">
            <text class="title">{{item.goods_title}}</text>
            <text v-for="(item, index) in item.new" :key="index" class="guige">{{item.spec_name}}:{{item.title}}; </text>
            <view class="good-list-view-all">
               <text>￥{{item.goods_price}}</text>
               <view class="good-list-view-btn fr">
                   <text :data-indexf="Findex" :data-indexs="Sindex" data-val="1" @tap="suanfa">-</text><text class="number">{{item.buy_num}}</text><text data-val="2" @tap="suanfa" :data-indexf="Findex" :data-indexs="Sindex">+</text>
                   <text class="delete" :data-indexf="Findex" :data-indexs="Sindex" @tap="deleteFun" :data-id="item.cart_id">删除</text>
               </view>
            </view>
        </view>     
    </view>   
    </checkbox-group>
</view>
<view class="jiesuan" v-if="cartgoods">
        <label>
            <checkbox :checked="allCheck" :data-select="allCheck" class="good-list-checkbox" @tap="allChange">全选</checkbox>
        </label>
        <view class="jiesuan-all">
          <text class="price">合计：￥{{count}}</text>
          <text class="btn" @tap="jiesuan">结算</text>
        </view>
</view>
<view class="flexcolumn alignItems no-car" v-if="!cartgoods">
  <text class="iconfont icon-gouwuche font-size-60 marginTopBottom20"></text>
  <view class="font-size-25">购物车还什么都没有，快去看看吧~</view>
</view>
</view>
</template>

<script>
// pages/car/car.js
const app = getApp();
var api = null;
api = require("../../api.js");

export default {
  data() {
    return {
      allCheck: false,
      checkedLength: 0,
      count: 0,
      cartgoods: "",
      allLength: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	 
	  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	var that = this;
    try {
        const value = uni.getStorageSync('token');
        if (value) {
    		uni.request({
    		    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
    		    data: {
    		        token: value
    		    },
    			method:'GET',
    		    header: {
    		        'custom-header': "hello", //自定义请求头信息
    		    },
    		    success: (res) => {
    		        
    				if(res.data.status==200){
						var user_id = res.data.token.user;
    					uni.request({
    						url: api + '/SupermarketApi/Shoppingcart/index1',
    						  // 仅为示例，并非真实的接口地址
    						  data: {
    						    user_id: user_id
    						  },
    						  header: {
    						      'custom-header': "hello", //自定义请求头信息
    						  },
    						  method: 'GET',
    						
    						  success: (res) => {
    						      
    						    console.log('res');
    						    console.log(res.data);
    						    console.log('res');
    						    var data = res.data;
    						    var allLength = 0;
    						
    						    for (var i in data) {
    						      for (var j in data[i].group) {
    						        allLength++;
    						      }
    						    }
    						
								that.cartgoods = data;
								that.allLength = allLength;
    						  }
    						
    						});					  
    				}else{
    						uni.navigateTo({
    							url: '/pages/record/record',
    						    success: res => {console.log('res')},
    						    fail: () => {console.log('res2')},
    						    complete: () => {console.log('res3')}
    						});
    					}
    		    }
    		});
        }else{
    		uni.navigateTo({
    			url: '/pages/record/record',
    		    success: res => {console.log('res')},
    		    fail: () => {console.log('res2')},
    		    complete: () => {console.log('res3')}
    		});
    	}
    } catch (e) {
        // error
    	
    }
    
	},
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
	},
	
	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},
	
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onBackPress:function() {
	  
	  uni.reLaunch({
	      url: '/pages/shoppingCar/shoppingCar',
	      success: function(e) {
	          // var page = getCurrentPages().pop();
	          // if (page == undefined || page == null) return;
	          // page.onLoad();
	      },
		  
	  });
	  return true;
	
	},
    
 
  methods: {
	checkToken:function(){
		try {
		    const value = uni.getStorageSync('token');
		    if (value) {
				uni.request({
				    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
				    data: {
				        token: value
				    },
					method:'GET',
				    header: {
				        'custom-header': "hello", //自定义请求头信息
				    },
				    success: (res) => {
				        
						if(res.data.status==200){
							var user_id = res.data.token.user;
							return user_id;
						}else{
								uni.navigateTo({
									url: '/pages/record/record',
								    success: res => {console.log('res')},
								    fail: () => {console.log('res2')},
								    complete: () => {console.log('res3')}
								});
							}
				    }
				});
		    }else{
				uni.navigateTo({
					url: '/pages/record/record',
				    success: res => {console.log('res')},
				    fail: () => {console.log('res2')},
				    complete: () => {console.log('res3')}
				});
			}
		} catch (e) {
		    // error
			
		}
	},
    change: function (e) {
      var that = this;
      var checkedLength = that.checkedLength;
      var indexF = e.target.dataset.indexf;
      var indexS = e.target.dataset.indexs;
      var newList = that.cartgoods;

      if (newList[indexF].group[indexS].checked == true) {
        newList[indexF].group[indexS].checked = false;
        checkedLength--;
        that.setData({
          checkedLength: checkedLength
        });
      } else {
        newList[indexF].group[indexS].checked = true;
        checkedLength++;
        that.setData({
          checkedLength: checkedLength
        });
      }

      if (checkedLength == that.allLength) {
        that.setData({
          allCheck: true
        });
      } else {
        that.setData({
          allCheck: false
        });
      }

      that.setData({
        cartgoods: newList
      });
      that.countFun();
    },
    allChange: function (e) {
      var that = this;
      var allchecked = e.currentTarget.dataset.select;
      var newList = that.cartgoods;

      if (allchecked == false) {
        allchecked = true;

        for (var i = 0; i < newList.length; i++) {
          for (var j = 0; j < newList[i].group.length; j++) {
            newList[i].group[j].checked = true;
          }
        }
      } else {
        allchecked = false;

        for (var i = 0; i < newList.length; i++) {
          for (var j = 0; j < newList[i].group.length; j++) {
            newList[i].group[j].checked = false;
          }
        }
      }

      that.setData({
        cartgoods: newList,
        allCheck: allchecked
      });
      that.countFun();
    },
    suanfa: function (e) {
      var that = this;
      var or = e.currentTarget.dataset.val;
      var newList = that.cartgoods;
      var indexF = e.target.dataset.indexf;
      var indexS = e.target.dataset.indexs;

      if (or == 2) {
        newList[indexF].group[indexS].buy_num = String(1 + parseInt(newList[indexF].group[indexS].buy_num));
      } else {
        newList[indexF].group[indexS].buy_num = String(newList[indexF].group[indexS].buy_num - 1);

        if (newList[indexF].group[indexS].buy_num <= 1) {
          newList[indexF].group[indexS].buy_num = String(1);
        }
      }

      that.setData({
        cartgoods: newList
      });
      that.countFun();
    },
    deleteFun: function (e) {
      var that = this;
      var indexF = e.target.dataset.indexf;
      var indexS = e.target.dataset.indexs;
      var id = e.target.dataset.id;
      var newList = that.cartgoods;
      wx.request({
        url: api + '/SupermarketApi/Shoppingcart/delcartgood',
        // 仅为示例，并非真实的接口地址
        data: {
          id: id
        },
        header: {
          'content-type': 'application/json' // 默认值

        },
        method: 'GET',

        success(res) {
          if (res.data == 'ok') {
            wx.showLoading({
              title: '购物车商品已删除'
            });
            setTimeout(function () {
              wx.hideLoading();
            }, 500);

            if (newList[indexF].group.length == 1) {
              newList.splice(indexF, 1);
            } else {
              newList[indexF].group.splice(indexS, 1);
            }

            that.setData({
              cartgoods: newList
            });
            that.countFun();
          }
        }

      });
    },
    countFun: function () {
      var that = this;
      var newcount = 0;
      var newList = that.cartgoods;

      for (var i = 0; i < newList.length; i++) {
        for (var j = 0; j < newList[i].group.length; j++) {
          if (newList[i].group[j].checked == true) {
            newcount += newList[i].group[j].goods_price * newList[i].group[j].buy_num;
          }
        }
      }

      that.setData({
        count: newcount.toFixed(2)
      });
    },

    jiesuan() {
      var that = this;
      var newList = that.cartgoods;
      var car = [];

      for (var i = 0; i < newList.length; i++) {
        for (var j = 0; j < newList[i].group.length; j++) {
          if (newList[i].group[j].checked == true) {
            car.push({
              cart_id: newList[i].group[j].cart_id,
              buy_num: newList[i].group[j].buy_num,
              goods_id: newList[i].group[j].goods_id,
              specification: newList[i].group[j].specification
            });
          }
        }
      }
console.log(car)
      if (car == '') {
        wx.showLoading({
          title: '请选择商品'
        });
        setTimeout(function () {
          wx.hideLoading();
        }, 500);
      } else {
        var goods = [];

        for (var i = 0; i < car.length; i++) {
          goods.push(car[i].cart_id + '/' + car[i].buy_num + '/' + car[i].goods_id + '/' + car[i].specification);
        }

        var car = JSON.stringify(car);
		try {
		    const value = uni.getStorageSync('token');
		    if (value) {
				uni.request({
				    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
				    data: {
				        token: value
				    },
					method:'GET',
				    header: {
				        'custom-header': "hello", //自定义请求头信息
				    },
				    success: (res) => {
				        
						if(res.data.status==200){
							var user_id = res.data.token.user;
							wx.request({
							  url: api + '/SupermarketApi/Order/checkBuy22',
							  // 仅为示例，并非真实的接口地址
							  data: {
							    car: goods,
							    user_id: user_id
							  },
							  header: {
							    'content-type': 'application/x-www-form-urlencoded',
							    'Accept': 'application/json'
							  },
							  method: 'POST',
							
							  success(res) {
							    console.log(res);
							
							    if (res.data.status == 0) {
							      wx.showToast({
							        title: res.data.good.title + res.data.good.days + '天内您还可购买' + res.data.num + '个',
							        icon: 'none',
							        duration: 3000
							      });
							    } else if (res.data.status == 3) {
							      wx.showToast({
							        title: res.data.good.title + res.data.msg,
							        icon: 'none',
							        duration: 3000
							      });
							    } else {
							      //结算
							      wx.navigateTo({
							        url: '/pages/confirmOrder/confirmOrder?car=' + car + '&type=gouwuche'
							      });
							    }
							  }
							
							});
						}else{
								uni.navigateTo({
									url: '/pages/record/record',
								    success: res => {console.log('res')},
								    fail: () => {console.log('res2')},
								    complete: () => {console.log('res3')}
								});
							}
				    }
				});
		    }else{
				uni.navigateTo({
					url: '/pages/record/record',
				    success: res => {console.log('res')},
				    fail: () => {console.log('res2')},
				    complete: () => {console.log('res3')}
				});
			}
		} catch (e) {
		    // error
			
		}
      }
    }

  }
};
</script>
<style>
@import "./shoppingCar.css";
</style>