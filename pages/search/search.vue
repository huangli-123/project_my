<template>
<view class="container">
    <view class="search flex borderBottom">
      <view class="searchInput">
        <icon type="search" size="13"></icon> 
        <input :value="inputValue" confirm-type="search" placeholder="请输入商品名称" @input="bindKeyInput" @confirm="search"></input>
      </view>
      <text class="btnSearch" @tap="search">搜索</text>
    </view>
	
    <view style="height:100rpx"></view>
	<view class="search_shop" v-if="shop_info">
		<view v-for="(item, index) in shop_info" :key="index">
			<view class="title_shop">
				<view class="zz_shop">
					<text class="iconfont icon-dianpo"></text>
					<text class="text-name">{{item.merchant}}</text>
				</view>
				<view class="right_shop">
					<navigator id="go_shop" :url="'/pages/store/index/index?agent_id=' + item.agent_id">进店></navigator>
				</view>
			</view> 
			<view class="img-contain">
				<view class="logo_img">
				<image :src= "'https://www.jiabusanyi.com/attachs/'+ item.shop_image" mode=""></image>
				</view>
			
			</view>
		</view>
				
	</view>
   <view class="mustBuyGoodsList" v-if="goods">
        <view class="paixu flex justifyAround alignItems">
            <view v-for="(item, index) in paixu" :key="index" :class="chav==item.id?'red':''" :data-id="item.id" @tap="choosePaixu">{{item.text}}</view>
        </view>
          <view style="height:100rpx"></view>
        <view v-for="(item, index) in goods" :key="index" class="mustBuyGoodsItem">
          <navigator class="flex" hover-class="none" :url="'/pages/goodDetail/goodDetail?id=' + item.goods_id">
              <view class="goodLeft">
                <image v-if="item.is_hot==1" class="biaoqian" src="/static/images/goods/boom.png"></image>
                <image class="tu" :src="item.photo"></image>
              </view>
              <view class="goodRight flex flexcolumn justifyBetween">
                 <view class="top flex flexcolumn">
                    <text class="title">{{item.title}}</text>
                    <text class="sell">已售{{item.sold_num}}{{item.unit}}</text>
                 </view>
                 <view class="bottom">
                     <text class="symbol">￥</text>
                     <text class="price">{{item.price}}</text>
                 </view>
              </view>
            </navigator>
        </view>
     </view>
</view>
</template>

<script>
// pages/search/search.js
const app = getApp();
var api = null;
api = require("../../api.js");

export default {
  data() {
    return {
      paixu: [{
        id: 1,
        text: "默认"
      }, {
        id: 2,
        text: "销量"
      }, {
        id: 3,
        text: "价格"
      }, {
        id: 4,
        text: "上架时间"
      }],
      chav: 1,
      goodslist: [],
      page: 1,
      inputValue: "",
      goods: "",
      goodscount: "",
	  shop_info:"",
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  onReachBottom: function () {
    var that = this; // 显示加载图标

    var page = this.page;
    console.log(page);

    if (page < that.goodscount && this.inputValue!=='') {
      // wx.showLoading({
      //   title: '玩命加载中'
      // });
	  
      wx.request({
        url: api + '/SupermarketApi/Goodsdetail/search/?page=' + page,
        data: {
          keywords: this.inputValue,
          order: this.chav
        },
        method: "GET",
        // 请求头部
        header: {
          'content-type': 'application/text'
        },
        success: function (res) {
          console.log('res.data');
		   console.log(res.data);
		   console.log('res.data');// // 页数+1

          page++; // // 回调函数

          var goods = that.goods;

          for (var i = 0; i < res.data.goodslist.length; i++) {
            goods.push(res.data.goodslist[i]);
          } // // 设置数据


          that.setData({
			shop_info:res.data.shop_info,  
            goods: goods,
            page: page
          }); // 隐藏加载框

          wx.hideLoading();
        }
      });
    } else {
      wx.showLoading({
        title: '没有更多了'
      });
      setTimeout(function () {
        wx.hideLoading();
      }, 1000);
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    bindKeyInput(e) {
      this.setData({
        inputValue: e.detail.value
      });
    },

    search() {
      var that = this;
	  if(this.inputValue!==''){
		  wx.request({
		     url: api + '/SupermarketApi/Goodsdetail/search',
		     // 仅为示例，并非真实的接口地址
		     data: {
		       keywords: this.inputValue
		     },
		     header: {
		       'content-type': 'application/json' // 默认值
		  
		     },
		     method: 'GET',
		  
		     success(res) {
		       console.log(res);
		        that.setData({
		           page: 1,
		           goods: res.data.goodslist,
		           goodscount: res.data.goodscount,
		  			  shop_info:res.data.shop_info,
		         });
		      
		  //      if (res.data.goodslist) {
		  //        that.setData({
		  //          page: 1,
		  //          goods: res.data.goodslist,
		  //          goodscount: res.data.goodscount,
		  			  // shopInfo:res.data.shopInfo
		  //        });
		  //      } else {
		  //        wx.showLoading({
		  //          title: '没有这样的商品哦！'
		  //        });
		  //        setTimeout(function () {
		  //          wx.hideLoading();
		  //        }, 1000);
		  //      }
		     }
		  
		   });
	  }
      
    },

    choosePaixu(e) {
      this.setData({
        chav: e.currentTarget.dataset.id,
        page: 1
      });
      var that = this;
      wx.request({
        url: api + '/SupermarketApi/Goodsdetail/search',
        // 仅为示例，并非真实的接口地址
        data: {
          keywords: this.inputValue,
          order: e.currentTarget.dataset.id
        },
        header: {
          'content-type': 'application/json' // 默认值

        },
        method: 'GET',

        success(res) {
          that.setData({
            goods: res.data.goodslist
          });
        }

      });
    }

  }
};
</script>
<style>
@import "./search.css";
</style>