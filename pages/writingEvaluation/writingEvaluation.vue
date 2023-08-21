<template>
<view>
   <view class="flex alignItems padding20 borderBottom pianjaiTitle background">
       <image :src="goods.photo"></image>
       <view class="flex alignItems">
                <text class="marginLeft huise">描述相符</text>
                <view class="starItem">               
                    <text v-for="(item, index) in star" :key="index" :data-index="index" @tap="starCheck" :class="'iconfont ' + (item.checked==true?'icon-buoumaotubiao44':'icon-shoucang')"></text>
                 </view>
       </view>
   </view>
   <view class="padding20 background">
      <textarea class="textareaContent" placeholder="宝贝满足你的期待么？说说它的优点和美中不足的地方吧" :value="content" @input="changeInput"></textarea>
      <view class="flex picList">
          <image v-for="(item, index) in tempFilePaths" :key="index" :src="item" :data-index="index" @tap="deleteTap"></image>
          <view v-if="tempFilePaths.length<3" class="flexcolumn justifyCenter alignItems addpic" @tap="addPic">
            <text class="iconfont icon-xiangji font-size-60 huise"></text>
            <text class="huise font-size-20" @tap="upimage">添加图片</text>
          </view>
      </view>
   </view>
   <view class="fabu" @tap="fabu">发布</view>
</view>
</template>

<script>
// pages/writingEvaluation/writingEvaluation.js
const app = getApp();
var api = null;
api = require("../../api.js");

export default {
  data() {
    return {
      star: [{
        id: 1,
        checked: true
      }, {
        id: 2,
        checked: true
      }, {
        id: 3,
        checked: true
      }, {
        id: 4,
        checked: true
      }, {
        id: 5,
        checked: true
      }],
      allStar: 5,
      tempFilePaths: [],
      content: '',
      kk: "",
      goods: "",
      order_id: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var goods_id = options.goods_id;
    wx.request({
      url: api + '/SupermarketApi/My/getgoods',
      // 仅为示例，并非真实的接口地址
      data: {
        goods_id: goods_id
      },
      header: {
        'content-type': 'application/json' // 默认值

      },
      method: 'GET',

      success(res) {
        that.setData({
          goods: res.data
        });
      }

    });
    this.setData({
      order_id: options.order_id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    starCheck(e) {
      var that = this;
      var index = e.currentTarget.dataset.index;
      var star = that.star;

      for (var i = 0; i <= index; i++) {
        star[i].checked = true;
      }

      for (var i = index + 1; i < star.length; i++) {
        star[i].checked = false;
      }

      that.setData({
        star: star,
        allStar: index + 1
      });
    },

    changeInput(e) {
      this.setData({
        content: e.detail.value
      });
    },

    addPic() {
      var that = this;
      var tem = that.tempFilePaths;

      if (tem.length < 3) {
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],

          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths;
            that.setData({
              tempFilePaths: [...tem, tempFilePaths]
            });
          }

        });
      }
    },

    deleteTap(e) {
      var that = this;
      var tempFilePaths = that.tempFilePaths;
      var index = e.currentTarget.dataset.index;
      wx.showModal({
        title: '提示',
        content: '确认删除这一张图片么？',

        success(res) {
          if (res.confirm) {
            tempFilePaths.splice(index, 1);
            that.setData({
              tempFilePaths: tempFilePaths
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }

      });
    },

    upimage() {
      var that = this;
      var allStar = this.allStar;
      var content = this.content;
      var tempFilePaths = this.tempFilePaths;
      var files = '';

      for (var i = 0, h = tempFilePaths.length; i < h; i++) {
        wx.uploadFile({
          url: api + '/SupermarketApi/My/KKupload',
          //仅为示例，非真实的接口地址
          filePath: tempFilePaths[i][0],
          name: 'file',
          formData: {
            'user': 'test'
          },

          success(res) {
            var image = res.data;
            files = files + '#' + image;
            that.setData({
              kk: files
            });
          }

        });
      }
    },

    fabupingjia() {
      var that = this;
      var allStar = this.allStar;
      var content = this.content;
      var tempFilePaths = this.tempFilePaths;
	  
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
	  					  var that = this
	  					wx.request({
	  					  url: api + '/SupermarketApi/My/writingEvaluation',
	  					  // 仅为示例，并非真实的接口地址
	  					  data: {
	  					    image: this.kk,
	  					    user_id: user_id,
	  					    allStar: allStar,
	  					    content: content,
	  					    order_id: this.order_id
	  					  },
	  					  header: {
	  					    'content-type': 'application/x-www-form-urlencoded' // 默认值
	  					
	  					  },
	  					  method: 'POST',
	  					
	  					  success(res) {
	  					    console.log(res);
	  					  }
	  					
	  					});
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
	      }else{
	  		uni.redirectTo({
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

    fabu() {
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
							  var that = this;
							  var allStar = this.allStar;
							  var content = this.content;
							  var tempFilePaths = this.tempFilePaths;
							  var files = '';
							  
							  for (var i = 0, h = tempFilePaths.length; i < h; i++) {
							    wx.uploadFile({
							      url: api + '/SupermarketApi/My/KKupload',
							      //仅为示例，非真实的接口地址
							      filePath: tempFilePaths[i][0],
							      name: 'file',
							      formData: {
							        'user': 'test'
							      },
							  
							      success(res) {
							        var image = res.data;
							        files = files + '#' + image;
							        that.setData({
							          kk: files
							        });
							      }
							  
							    });
							  }
							  
							  var order_id = this.order_id;
							  setTimeout(function () {
							    wx.request({
							      url: api + '/SupermarketApi/My/writingEvaluation',
							      // 仅为示例，并非真实的接口地址
							      data: {
							        image: files,
							        user_id: user_id,
							        allStar: allStar,
							        content: content,
							        order_id: order_id
							      },
							      header: {
							        'content-type': 'application/x-www-form-urlencoded' // 默认值
							  
							      },
							      method: 'POST',
							  
							      success(res) {
							        if (res.data == 'ok') {
							          wx.showLoading({
							            title: '评价已完成'
							          });
							          setTimeout(function () {
							            wx.hideLoading();
							            wx.navigateTo({
							              url: '/pages/order/order'
							            });
							          }, 1000);
							        }
							      }
							  
							    });
							  }, 1000);
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
		    }else{
				uni.redirectTo({
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
};
</script>
<style>
@import "./writingEvaluation.css";
</style>