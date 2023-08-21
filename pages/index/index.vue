<template>
<!--index.wxml-->
<view class="container">
	<uni-popup ref="popupDialog" type="dialog">
			<uni-popup-dialog :type="msgType" title="服务协议和隐私政策"  :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
	</uni-popup>
 <!-- 头部 -->
 <view class="header">
   <view class="shangji">
       <navigator class="flex justifyStart alignItems" url="/pages/city/city" hover-class="none">
         <image class="shangji-pic" :src="newagent.head_portrait"></image>
         <text class="marginLeft"> {{city.name}}</text>
         <text class="iconfont icon-icon_arrow_right"></text>
       </navigator>
   </view>
 </view>
 <view class="zhanwei"></view>
 <view class="sousuo">
    <navigator url="/pages/search/search">
     <icon type="search" size="12"></icon>
     <input placeholder="搜索"></input>
    </navigator> 
 </view>
 <!-- 头部 -->
 <!-- 轮播图 -->
 <view>
	 <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
	     <swiper-item v-for="(item, index) in carousel" :key="index">
	        <view class="swiper-item uni-bg-red"><image style="width: 100%;height:300rpx" :src="item.image"></image></view>
	    </swiper-item>
	    <!-- <swiper-item>
	        <view class="swiper-item uni-bg-green"><image style="width: 100%;height:300rpx" src="/static/images/banner598.jpg"></image></view>
	     </swiper-item>
	     <swiper-item>
	        <view class="swiper-item uni-bg-blue"><image style="width: 100%;height:300rpx" src="/static/images/banner509.png"></image></view>
	    </swiper-item> -->
	</swiper>
 </view>
  <!-- <swiper class="swiperList"
    indicator-dots="{{indicatorDots}}"
    autoplay="{{autoplay}}"
    interval="{{interval}}"
    duration="{{duration}}">
    <block wx:for="{{imgUrls}}" wx:key="index">
      <swiper-item class="swiperBanner">
        <image src="{{item}}" class="slide-image" />
      </swiper-item>
    </block>
  </swiper> -->
  <!-- 轮播图 -->
  <!-- 分类 -->
  <view class="classify">
     <block v-for="(item, index) in classify" :key="index">
      <navigator hover-class="none" :url="'/pages/goodsList/goodsList?id=' + item.cate_id">
         <!-- <image :src="'https://www.jiabusanyi.com/attachs/' + item.photo"></image> -->
		 <image :src="item.photo"></image>
         <text>{{item.cate_name}}</text>
      </navigator>
     </block> 
  </view>
  <!-- 分类 -->
  <!-- 秒杀 -->
   <!--
  <view class="spike">
    <view class="spikeTitle flex justifyBetween alignItem">
      <text>限时秒杀</text>
      <navigator url="/pages/spike/spike" hover-class="none"><text>查看更多</text><text class="iconfont icon-icon_arrow_right"></text></navigator>
    </view>
    <view class="spikeContent">
      <view class="spikeTimerList flex">
         <view 
         wx:for="{{timeList}}" wx:key="index"
         class="spikeTimerItem flex flexcolumn {{item.id==chav?'spikeActive':''}}" 
         bindtap='timeChoose' 
         data-tid="{{item.id}}">
           <text class="time">{{item.time}}</text>
           <text class="stateText">{{item.stateText}}</text>
         </view>
      </view>
      <view class="spikeGoodsContent" >
        <scroll-view class="goodsScrollView" scroll-x style="width: 100%"  wx:for="{{goodsList}}" wx:key="index" wx:if="{{item.id==chav}}">
           <view class="spikeGoodItem"  wx:for="{{item.good}}" wx:key="index">
             <navigator>
              <image src="{{item.img}}" />
              <text class="spikeGoodItemTitle">{{item.title}}</text>
              <view class="spikeGoodItemContent">
                  <text class="symbol">￥</text>
                  <text class="price">{{item.price}}</text>
                  <text class="originalPrice">￥{{item.originalPrice}}</text>
              </view>
              </navigator>
           </view>
        </scroll-view>
      </view>
    </view>
  </view>-->
  <!-- 秒杀 -->
  <!-- 广告11 -->
  <view class="mybanner">
	  <view class="bannerone">
		  <image  src="/static/jy.jpg" @tap="into"></image>
	  </view>
	  <view class="bannertwo">
		  <image  src="/static/jz.jpg" @tap=into2></image>
	  </view>
  </view>
  <!-- 广告 -->
  <view class="advert">
	  <view class="advert_last">
	  </view>
  </view>
  <view class="sp_buy">
	  <view class="title_ym">
		  <text class="yptm">优品特卖:</text>
		  <text class="dpduo">更多大牌等你来选</text>
	  </view>
	  <view class="scroll-index">
		  <scroll-view class="scroll-view_H" scroll-x="true"  scroll-left="120">
		    <view  class="scroll-view-item_H kouhong ">
				<image src="/static/images/nvbao_06.png" ></image>
				<text class="price-red">¥216</text>
			</view>
			<view  class="scroll-view-item_H">
				<image src="/static/images/guozi.png"></image>
				<text class="price-red">¥216</text>
			</view>
			<view  class="scroll-view-item_H">
				<image src="/static/images/xiezi.png"></image>
				<text class="price-red">¥216</text>
			</view>
			<view  class="scroll-view-item_H">
				<image src="/static/images/kouh.png"></image>
				<text class="price-red">¥216</text>
			</view>
			<view  class="scroll-view-item_H">
				<image src="/static/images/laganxiangpng.png"></image>
				<text class="price-red">¥216</text>
			</view>
			
		  </scroll-view>
	  </view>
	  <view>
		  
	  </view>
  </view>
  <!-- 商品 -->
  <view class="mustBuy">
     <view class="mustBuyTitle">
        <text>热销爆款 </text><text>| 人见人爱的热销款</text>
     </view>
     <view class="mustBuyGoodsList">
        <view v-for="(item, index) in hotGoodList" :key="index" class="mustBuyGoodsItem">
          <navigator class="flex" hover-class="none" :url="'/pages/goodDetail/goodDetail?id=' + item.goods_id">
              <view class="goodLeft">
                <image v-if="item.is_hot==1" class="biaoqian" src="/static/images/goods/boom.png"></image>
                <image class="tu" :src="item.photo"></image>
              </view>
              <view class="goodRight flex flexcolumn justifyBetween">
                 <view class="top flex flexcolumn">
                    <text class="title">{{item.title}}</text>
                    <text class="sell">已售{{item.sold_num}}件</text>
                 </view>
                 <view class="bottom">
                     <text class="symbol">￥</text>
                     <text class="price">{{item.price}}</text>
                     <!-- <text class="originalPrice">￥{{item.wholesale_price}}</text> -->
                 </view>
              </view>
            </navigator>
            <!-- <navigator class="addCar"  hover-class="none">
               <text class="iconfont icon-gouwuchexiadan"></text>
            </navigator> -->
			
			
        </view>
		
     </view>
  </view>
  <!-- 商品 -->
</view>
</template>

<script>
//index.js
//获取应用实例k
const app = getApp();
var api = null;
var page = 1;
api = require("../../api.js");
import citySelect from '@/components/city-select/city-select.vue'
import uniPopup from '../../components/uni-popup/uni-popup.vue'
import uniPopupMessage from '../../components/uni-popup/uni-popup-message.vue'
import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog.vue'
var QQMapWX = require("../../utils/qqmap-wx-jssdk.js");
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'WSPBZ-TABW4-4ZRUZ-DO4C2-KQBUF-SLFDV' //这里自己的key秘钥进行填充

});
export default {
  data() {
    return {
      apiI: api,
      imgUrls: ['https://jiabusanyi.oss-cn-hangzhou.aliyuncs.com/thumb_5bd7cee32d57d.png', 'https://jiabusanyi.oss-cn-hangzhou.aliyuncs.com/thumb_5bd7f41b14d83.png', 'https://jiabusanyi.oss-cn-hangzhou.aliyuncs.com/thumb_5bd7f427741d1.png'],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
	  type: 'top',
	  msgType: 'success',
      timeList: [{
        id: 1,
        time: "最后",
        stateText: "疯抢"
      }, {
        id: 2,
        time: "10:00",
        stateText: "已开抢"
      }, {
        id: 3,
        time: "15:00",
        stateText: "正在疯抢"
      }, {
        id: 4,
        time: "20:00",
        stateText: "即将开抢"
      }, {
        id: 5,
        time: "明日",
        stateText: "预告"
      }],
      chav: 1,
      goodsList: [],
      hotGoodList: [],
      classify: "",
      goodscount: "",
      newagent: "",
	  carousel:"",
    };
  },

  components: {
	  uniPopup,
	  uniPopupDialog,
  },
  props: {},
  onLoad: function (options) {
	  this.$forceUpdate();//强制刷新页面
 //    var that = this; //请求分类				 
	// var city = uni.getStorageSync('city');
	// var longitude = uni.getStorageSync('longitude');
	// var latitude = uni.getStorageSync('latitude');
		
	// if (!city && !longitude && !latitude) {
	//   that.getLocation();
	// } 
 //    wx.request({
 //      url: api + '/SupermarketApi/Index/index',
 //      // 仅为示例，并非真实的接口地址
 //      header: {
 //        'content-type': 'application/json' // 默认值

 //      },
 //      method: 'GET',

 //      success(res) {
 //        console.log(res);
 //        that.setData({
 //          classify: res.data.goodscate,
 //          hotGoodList: res.data.goodshot,
 //          goodscount: res.data.goodscount
 //        });
 //      },

 //      fail(res) {
 //        console.log(res);
 //      }

 //    }); //请求分类
  },
  onShow: function () {
	  var that = this; //请求分类
	  // var that = this; //请求分类
	  var city = uni.getStorageSync('city');
	  var longitude = uni.getStorageSync('longitude');
	  var latitude = uni.getStorageSync('latitude');
	 
	  if (!city && !longitude && !latitude) {
	    that.getLocation();
	  } 
	  wx.request({
	    url: api + '/SupermarketApi/Index/index',
	    // 仅为示例，并非真实的接口地址
	    header: {
	      'content-type': 'application/json' // 默认值
	  
	    },
	    method: 'GET',
	  
	    success(res) {
	      console.log(res);
	      that.setData({
	        classify: res.data.goodscate,
	        hotGoodList: res.data.goodshot,
	        goodscount: res.data.goodscount,
			carousel:res.data.carousel,
	      });
	    },
	  
	    fail(res) {
	      console.log(res);
	    }
	  
	  }); //请求分类			 
	  var city = uni.getStorageSync('city');
	  var longitude = uni.getStorageSync('longitude');
	  var latitude = uni.getStorageSync('latitude');
	  	
	  if (!city && !longitude && !latitude) {
	    that.getLocation();
	  } 
	  
    this.setData({
      city: uni.getStorageSync('city')
    });
	that.$forceUpdate();//强制刷新页面
  },
  onPullDownRefresh:function(){
	  console.log('refresh');
	  setTimeout(function () {
	      uni.stopPullDownRefresh();
	  }, 1000);        
  },
  onReachBottom: function () {
    var that = this; // 显示加载图标

    if (page <= 10 && page < that.goodscount) {
      // wx.showLoading({
      //   title: '玩命加载中'
      // });
      wx.request({
        url: api + '/SupermarketApi/Index/index/?page=' + page,
        method: "GET",
        // 请求头部
        header: {
          'content-type': 'application/text'
        },
        success: function (res) {
          // // 页数+1
          if (page <= 100) {
            page++;
          } // // 回调函数


          var hotGoodList = that.hotGoodList;

          for (var i = 0; i < res.data.goodshot.length; i++) {
            hotGoodList.push(res.data.goodshot[i]);
          } // // 设置数据


          that.setData({
            hotGoodList: hotGoodList,
            goodscount: res.data.goodscount
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
  onReady() {
	  // var cid = uni.getStorageSync('cid');
	  // if(cid){
	  // 		  console.log('set保存的的');
	  // 		  console.log(cid);
	  // }else{
		 //  setTimeout(() => {
		 //  	this.msgType = 'success'
		 //  	this.$refs.popupDialog.open()
		 //  }, 500)	  		  
	  // }
  	
  },

  methods: {
	  into(){
		  uni.navigateTo({
		      url: '/pages/commission/five'
		  });
	  },
	into2(){
		uni.navigateTo({
		    url: '/pages/commission/four'
		});
	},
	  /**
	          * 点击取消按钮触发
	          * @param {Object} done
	          */
	         close(done){
	             // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
	             // ...
				 this.$refs.popupDialog.open();
				 done();
	         },
	         /**
	          * 点击确认按钮触发
	          * @param {Object} done
	          * @param {Object} value
	          */
	         confirm(done,value){
	             // 输入框的值
	             console.log(value)
	             // TODO 做一些其他的事情，手动执行 done 才会关闭对话框
	             // ...
	             done()
	         },
			 
    timeChoose(e) {
      this.setData({
        chav: e.currentTarget.dataset.tid
      });
    },
	getLocation() {
	  var that = this;
	  wx.getLocation({
	    type: 'wgs84',
	
	    // 返回可以用于wx.openLocation的经纬度
	    success(res) {
	      that.setData({
	        hasLocation: true
   });
	      const latitude = res.latitude;
	      const longitude = res.longitude;
	      that.getLocal(latitude, longitude);
	    },
	
	    fail(res) {
	      that.setData({
	        hasLocation: false
	      });
	    }
	
	  });
	},
	
	// 获取当前地理位置
	getLocal: function (latitude, longitude) {
	  var that = this;
	  qqmapsdk.reverseGeocoder({
	    location: {
	      latitude: latitude,
	      longitude: longitude
	    },
	    success: function (res) {
	      var city = res.result.ad_info.city;
	      uni.request({
	        url: api + '/SupermarketApi/City/findCity',
	        // 仅为示例，并非真实的接口地址
	        data: {
	      		city:city
	        },
	        header: {
	          'content-type': 'application/json' // 默认值
	      
	        },
	        method: 'GET',
	      
	        success(res) {
	      					console.log(res)
	         that.setData({
	           city: {
	               city_id: res.data,
	               name: city
	           },
	         });
	        }
	      
	      });					 
	    },
	    fail: function (res) {},
	    complete: function (res) {// console.log(res);
	    }
	  });
	},

  }
};
</script>
<style>
@import "./index.css";
</style>