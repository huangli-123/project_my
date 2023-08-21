<template>
<view>
     <view class="flex alignItems goodsTitle">
         <image :src="info.photo"></image>
         <view class="text">
            <view>{{info.good_title}}</view>
            <view class="huise font-size-25">规格:{{info.specification_title}}</view>
         </view>
     </view>
     <view class="refund ">
         <view class="flex justifyBetween alignItems padding20 borderBottom" @tap="openFixed">
            <text>退款类型</text>
            <view class="huise flex alignItems">
               <text v-if="itemStatus==0">请选择</text>
               <text v-if="itemStatus==1">仅退款</text>
               <text v-if="itemStatus==2">退货退款</text>
               <text class="iconfont icon-icon_arrow_right"></text>
            </view>
         </view>
         <view class="flex justifyStart alignItems padding20">
            <text>退款金额：</text>
            <view class="flex alignItems">
               <text class="red">￥</text>
               <input :value="info.total_price" placeholder="请填写" type="number" class="red inputLength"></input>
            </view>
         </view>
         <view class="flex justifyStart alignItems padding20">
            <text>退款原因：</text>
            <view class="flex alignItems">
               <input placeholder="请填写退款原因" class="inputLength" @input="changeInput"></input>
            </view>
         </view>
     </view>
    <view class="uploadPic">
     <view>上传凭证</view>
      <view class="flex picList">
            <image v-for="(item, index) in tempFilePaths" :key="index" :src="item" :data-index="index" @tap="deleteTap"></image>
            <view v-if="tempFilePaths.length<3" class="flexcolumn justifyCenter alignItems addpic" @tap="addPic">
              <text class="iconfont icon-xiangji font-size-60 huise"></text>
              <text class="huise font-size-20">上传凭证</text>
            </view>
        </view>
    </view>
    <view class="tijiao" @tap="isOk">提交</view>

    <view class="fixed numFixed" v-if="fixedFlag">
        <view class="fixed  numcontent">
            <view class="padding20">
              <view class="textCenter">退款类型</view>
              <view>
                    <label v-for="(item, index) in items" :key="index" @tap="shouhuoStatus" :data-val="item.value">
                        <view class="padding20  flex justifyBetween alignItems">
                          <text>{{item.name}}</text>
                          <checkbox class="good-list-checkbox" :checked="item.checked"></checkbox>
                        </view>
                    </label>
              </view>
            </view>
            <button @tap="openFixed">关闭</button>
        </view>
        
  </view>

</view>
</template>

<script>
// pages/refund/refund.js
const app = getApp();
var api = null;
api = require("../../api.js");

export default {
  data() {
    return {
      tempFilePaths: [],
      items: [{
        value: 1,
        name: "仅退款",
        checked: ''
      }, {
        value: 2,
        name: "退货退款",
        checked: ''
      }],
      itemStatus: 0,
      fixedFlag: false,
      orderid: "",
      spec: "",
      info: "",
      content: "",
      kk: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var orderid = options.id;
    that.setData({
      orderid: options.id
    });
    wx.request({
      url: api + '/SupermarketApi/Order/refund',
      data: {
        order_id: orderid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",

      success(res) {
        console.log(res);
        that.setData({
          // paytype: res.data.paytype,
          // goods: res.data.goods,
          spec: res.data.specifications,
          info: res.data.info
        });
      }

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
    changeInput(e) {
      // console.log(e)
      this.setData({
        content: e.detail.value
      });
    },

    isOk() {
      var itemStatus = this.itemStatus;
      var price = this.info.total_price;
      var tempFilePaths = this.tempFilePaths;
      var content = this.content;
      var paytype = this.paytype;
      var orderid = this.orderid;
      var openid = wx.getStorageSync('code');
      var that = this;
      var files = '';

      if (itemStatus == 0) {
        wx.showToast({
          title: '请选择退款类型!',
          icon: 'none',
          duration: 2000
        });
      } else if (!content) {
        wx.showToast({
          title: '请填写退款原因!',
          icon: 'none',
          duration: 2000
        });
      } else if (tempFilePaths.length == 0) {
        wx.showToast({
          title: '请上传照片凭证!',
          icon: 'none',
          duration: 2000
        });
      } else {
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: api + '/SupermarketApi/Order/KKupload',
            //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i][0],
            name: 'file',
            formData: {
              'user': 'test'
            },

            success(res) {
              console.log('res');
              console.log(res.data.imgpath);
              console.log(JSON.parse(res.data).imgpath);
              console.log('res');
              var image = JSON.parse(res.data).imgpath;
              files = files + image + '#';
              that.setData({
                kk: files
              });
            }

          });
        }

        setTimeout(function () {
          wx.request({
            url: api + '/SupermarketApi/Order/refundapply',
            // 仅为示例，并非真实的接口地址
            data: {
              image: files,
              // openid: openid,
              price: price,
              content: content,
              order_id: orderid,
              itemStatus: itemStatus,
              paytype: paytype
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值

            },
            method: 'POST',

            success(res) {
              console.log(res);

              if (res.data.code == 1) {
                wx.showLoading({
                  title: '申请成功'
                });
                setTimeout(function () {
                  wx.hideLoading();
                  wx.navigateTo({
                    url: '/pages/order/order'
                  });
                }, 1000);
              } else if (res.data.code == 0) {
                wx.showLoading({
                  title: '申请失败'
                });
                setTimeout(function () {
                  wx.hideLoading();
                  wx.navigateTo({
                    url: '/pages/order/order'
                  });
                }, 1000);
              } else if (res.data.code == "a") {
                wx.showLoading({
                  title: '申请已在审核中...'
                });
                setTimeout(function () {
                  wx.hideLoading();
                  wx.navigateTo({
                    url: '/pages/order/order'
                  });
                }, 1000);
              } else if (res.data.code == "b") {
                wx.showLoading({
                  title: '审核成功，退款中...'
                });
                setTimeout(function () {
                  wx.hideLoading();
                  wx.navigateTo({
                    url: '/pages/order/order'
                  });
                }, 1000);
              } else if (res.data.code == "c") {
                wx.showLoading({
                  title: '退款已完成'
                });
                setTimeout(function () {
                  wx.hideLoading();
                  wx.navigateTo({
                    url: '/pages/order/order'
                  });
                }, 1000);
              } else if (res.data.code == "d") {
                wx.showLoading({
                  title: '审核失败...'
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
      }
    },

    openFixed() {
      this.setData({
        fixedFlag: !this.fixedFlag
      });
    },

    shouhuoStatus(e) {
      var that = this;
      var val = e.currentTarget.dataset.val;
      var items = that.items;

      for (var i = 0; i < items.length; i++) {
        items[i].checked = '';
      }

      items[val - 1].checked = true;
      that.setData({
        itemStatus: val,
        fixedFlag: !this.fixedFlag,
        items: items
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
    }

  }
};
</script>
<style>
@import "./refund.css";
</style>