<template>
<view>
<!--引入towxml模版入口文件，并使用模版-->

<!--<import src="/towxml-master/entry.wxml"></import>-->
<view class="container">
  <!-- 轮播图 -->
  <swiper class="swiperList" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">

    <swiper-item class="swiperBanner" v-if="goodsdetail.video" style="display:flex;justify-content:center;">
      <video :src="goodsdetail.video" class="slide-video" custom-cache="false" :poster="goodsdetail.video_photo" objectFit="fill">
      </video>
    </swiper-item>
    <block v-for="(item, index) in thumbs" :key="index">
      <swiper-item class="swiperBanner">
        <image :src="item.photo" class="slide-image"></image>
      </swiper-item>
    </block>

  </swiper>
  <!-- 轮播图 -->
  <view class="detailContent">
    <view class="title">
      <view class="priceList flex">
        <view class="symbol">￥</view>
        <view class="price margin0 font-size-35 bold">{{standardObject.price}}</view>
        <!-- <view class="originalPrice">￥16.99</view> -->
      </view>
      <view class="secondhand" v-if="goodsdetail.used==1">
        <text class="assistant">二手物品</text>
      </view>
      <view class="flex justifyBetween alignItems">
        <view class>
          <view>{{goodsdetail.title}}</view>
          <view class="huise font-size-25">
            <text>已售{{goodsdetail.sold_num}}{{goodsdetail.unit}}</text>
          </view>
        </view>
        <!-- <view class="flexcolumn alignItems share" bindtap='huoqutoken'>
            <text class="iconfont icon-fenxiang red font-size-20 bold"></text>
            <text class="font-size-18 red">获取token</text>
          </view> -->
        <view class="flexcolumn alignItems share" @tap="shareFirend">
          <text class="iconfont icon-fenxiang red font-size-20 bold"></text>
          <text class="font-size-18 red">分享好友</text>
        </view>
      </view>
    </view>
    <view class="pingjia guige" @tap="buyNow">
      <view class="guigeTitle flex justifyBetween alignItems">
        <text>规格</text>
        <view class="flex justifyEnd alignItems">
          <text class="font-size-23 huise">规格:{{!mergeStandard?"未选择":'"'+selectedStandard+'"'}}</text>
          <text class="iconfont icon-icon_arrow_right huise"></text>
        </view>
      </view>
    </view>
    <view class="pingjia">
      <view class="flex justifyBetween alignItems pingjiaTitle">
        <text>商品评价 ({{comment_count}})</text>
        <navigator class="font-size-23" hover-class="none" :url="'/pages/evaluationList/evaluationList?id=' + goodsdetail.goods_id">
          <text class="huise">好评度 </text>
          <text class="red">97% </text>
          <text class="iconfont icon-icon_arrow_right huise font-size-23"></text>
        </navigator>
      </view>
      <scroll-view v-if="comment" class="pingjiaList flex" scroll-x style="width: 100%">
        <view class="pingjiaItem">
          <view class="itemUser flex justifyBetween">
            <view class="flex">
              <image src="/static/images/goods/1.jpg"></image>
              <view class="flexcolumn justifyBetween">
                <text class="font-size-25 overflow">{{comment.user}}</text>
                <text class="font-size-23 huise">{{comment.created_time}}</text>
              </view>
            </view>
            <view class="flexcolumn justifyBetween">
				<view class="starItem" v-if="comment.allStar == 1">
				    <text class="iconfont icon-buoumaotubiao44"></text>
				   
				</view>
				<view class="starItem" v-else-if="comment.allStar == 2">
				    <text class="iconfont icon-buoumaotubiao44"></text>
				    <text class="iconfont icon-buoumaotubiao44"></text>
				   
				</view>
				<view class="starItem" v-else-if="comment.allStar == 3">
				    <text class="iconfont icon-buoumaotubiao44"></text>
				    <text class="iconfont icon-buoumaotubiao44"></text>
				    <text class="iconfont icon-buoumaotubiao44"></text>
				              
				</view>
				<view class="starItem" v-else-if="comment.allStar == 4">
				    <text class="iconfont icon-buoumaotubiao44"></text>
				    <text class="iconfont icon-buoumaotubiao44"></text>
				    <text class="iconfont icon-buoumaotubiao44"></text>
				    <text class="iconfont icon-buoumaotubiao44"></text>
				  
				</view>
				<view class="starItem" v-else-if="comment.allStar == 5">
				    <text class="iconfont icon-buoumaotubiao44"></text>
				    <text class="iconfont icon-buoumaotubiao44"></text>
				    <text class="iconfont icon-buoumaotubiao44"></text>
				    <text class="iconfont icon-buoumaotubiao44"></text>
				    <text class="iconfont icon-buoumaotubiao44"></text>
				</view>
				<view class="starItem" v-else>
				</view>
              <!-- <view class="starItem">
                <text class="iconfont icon-buoumaotubiao44"></text>
                <text class="iconfont icon-buoumaotubiao44"></text>
                <text class="iconfont icon-buoumaotubiao44"></text>
                <text class="iconfont icon-buoumaotubiao44"></text>
              </view> -->
              <!-- <text class="font-size-23 huise manyi">很满意</text> -->
            </view>
          </view>
          <view class="font-size-25">{{comment.content}}</view>
        </view>
      </scroll-view>
    </view>
  </view>
  <view class="dianpu">
    <view class="flex justifyStart alignItems">
      <image :src="shop_info.shop_image"></image>
      <view class="flexcolumn justifyCenter text">
        <text class="red font-size-30 bold ">店铺 {{shop_info.merchant}}</text>
        <!-- <view class="font-size-25 huise"><text>掌柜：{{shop_info.agent_name}}</text><text class="marginLeft">手机号：{{shop_info.phone}}</text></view> -->
      </view>
    </view>
  </view>
  <view class="xiangqing">
    <view class="title">商品详情</view>
	<rich-text :nodes="details" class="xiangqing"></rich-text>
  </view>
  <view style="height:90rpx;"></view>

  <view class="flex fixed">
    <navigator class="flexcolumn alignItems" hover-class="none" :url="'/pages/store/index/index?agent_id=' + shop_info.agent_id">
      <text class="iconfont icon-dianpu red bold font-size-30"></text>
      <text class="font-size-20 red">店铺</text>
    </navigator>
    <!-- <navigator class="gouwucheIcon flexcolumn alignItems" url="/pages/shoppingCar/shoppingCar" open-type="switchTab">
      <view class="carNum" v-if="countcart!=0">{{countcart}}</view>
      <view class="flexcolumn alignItems">
        <text class="iconfont icon-gouwuche huise bold font-size-35"></text>
        <text class="font-size-20 huise">购物车</text>
      </view>
    </navigator> -->
    <button class="addCar" @tap="addCar">加入购物车</button>
    <button @tap="confirmNum">立即购买</button>
  </view>
  <view v-if="showNum==true" class="fixed numFixed">
    <view class="fixed  numcontent">
      <view class="flex justifyBetween borderBottom goods">
        <view class="flex alignItems">
          <!-- <image src="{{modelImg}}" /> -->
          <image :src="standardObject.photo"></image>
          <view class="flexcolumn">
            <!-- <view class="flex marginLeft">
              <view class="price margin0 font-size-35 bold">￥</view>
              <view class="price margin0 font-size-35 bold">{{price}}</view>
            </view>
            <view class="marginLeft huise font-size-25">
              <text>库存：{{number}}</text>
            </view> -->
             <view class="flex marginLeft">
              <view class="price margin0 font-size-35 bold">￥</view>
              <view class="price margin0 font-size-35 bold">{{standardObject.price}}</view>
            </view>
            <view class="marginLeft huise font-size-25">
              <text>库存：{{standardObject.number}}</text>
            </view>
            <view class="marginLeft huise font-size-25">
              <text>规格：{{selectedStandard}}</text>
            </view>
          </view>
        </view>
        <text class="close" @tap=closeNum>x</text>
      </view>
      <view class="guigeBox">
        
        <!-- <view class="flex guigeList">
          <view wx:for="{{specification}}" wx:key="index" class="guigeItem {{chavId==item.id?'guigeActive':''}}" data-id="{{item.id}}" data-index="{{index}}" data-title='{{item.title}}' bindtap='chooseGuige'>
            {{item.title}}
          </view>
        </view> -->
          <block v-for="(item, standardIndex) in commodityStandard" :key="standardIndex">
         
           <view class="standardTitle">{{item[0][0].spec_name}}</view>
          <view class="flex guigeList">        
          <view v-for="(item, index) in item[0]" :key="index" :class="'guigeItem ' + isSelect[item.isClick]" @tap="handleStandardClick" :data-standard-index="standardIndex" :data-index="index" :data-id="item.id">
            {{item.title}}
          </view>
        </view>
 
        </block>
      </view>
      <view class=" flex justifyBetween alignItems padding20 marginTopBottom20">
        <text>数量</text>
        <view class=" flex justifyStart alignItems">
          <text class="jiajian" data-val="1" @tap="suanfa">-</text>
          <text class="number">{{buy_num}}</text>
          <text class="jiajian jian" data-val="2" @tap="suanfa">+</text>
        </view>
      </view>
      <!-- bindtap='closeNum' -->
      <view class="queding" @tap="submitSelected">确定</view>
    </view>
  </view>
  <view class="fixed numFixed sharefixed" v-if="showShare==true">
    <view class="fixed  numcontent shareContent">
      <view class="flex justifyBetween alignItems shareTitle">
        <text class="lineH"></text>
        <view>分享</view>
        <text class="lineH"></text>
      </view>
      <view class="flex justifyCenter shareBody">
        <view class="fenxiangPosition">
          <button open-type="share"></button>
          <view class="flexcolumn alignItems">
<!--            <text class="iconfont icon-weixin weixin"></text>
            <text class="font-size-25 padding20">分享好友</text> -->
			<view class="content">
				<!-- 说明 -->
			<!-- 	<text style="font-size: 29rpx;color: #999;">
					drawArray为Function时, 携带参数对象新增方法setBgObj、getBgObj\n
					setBgObj为动态设置画布大小方法传参 { height: Number, width: Number }\n
					getBgObj方法返回最新的画布信息\n
				</text> -->
				<!-- 生成海报 -->
				<button type="primary" @tap="shareFc()">生成海报</button>
				<!-- 图片展示由自己实现 -->
				<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
					<view class="flex_column">
						<view class="backgroundColor-white padding1vh border_radius_10px">
							<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
						</view>
						<view class="flex_row marginTop2vh">
							<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
							<button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button>
						</view>
					</view>
				</view>
				<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
			</view>
          </view>
        </view>
        


      </view>
      <view class="quxiao" @tap="shareFirend">取消</view>
    </view>

  </view>
  <view class="fixed numFixed" v-if="showHaibao==true">
    <view class="haibaoContent">
      <icon class="guanbi" type="cancel" size="28" color="white" @tap="guanbiHaibao"></icon>
      <view style="height:76rpx"></view>
      <view class="canvasBox">
        <canvas canvas-id="myCanvas"></canvas>
      </view>
      <view class="savePic">
        <text class="white" @tap="saveHaibao">保存到本地</text>
      </view>
    </view>
  </view>
<!--  <view class="kefu">
    <text class="iconfont icon-kefu"></text>
    <button open-type="contact" @contact="handleContact" send-message-title="商品" :send-message-path="'/pages/goodDetail/goodDetail?id=' + goods_id" show-message-card plain></button>
  </view> -->
</view>
</view>
</template>

<script>
import _app from '../../components/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '../../components/QS-SharePoster/QS-SharePoster.js';	
// pages/goodDetail/goodDetail.js
const app = getApp();
var api = null;
api = require("../../api.js");
var graceRichText = require("../../components/richText.js");
export default {
  data() {
    return {
	  poster: {},
	  qrShow: false,
	  canvasId: 'default_PosterCanvasId',
	  count: 0,	
      article: {},
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      guigeList: [],
      carNum: 1,
      buy_num: 1,
      showNum: false,
      showShare: false,
      showHaibao: false,
      chavId: '未选择',
      isSelect: ["standardNormal", "standardSelected", "standardDisable"],

      /* 用于区别当前的规格是否选中 */
      commodityStandard: [[{
        spec_name: "颜色",
        item_id: 535385,
        item: "白色",
        src: "",
        isClick: 0
      }, {
        spec_name: "颜色",
        item_id: 535386,
        item: "黑色",
        src: "",
        isClick: 0
      }], [{
        spec_name: "尺寸",
        item_id: 535692,
        item: "170",
        src: "",
        isClick: 0
      }, {
        spec_name: "尺寸",
        item_id: 535693,
        item: "180",
        src: "",
        isClick: 0
      }], [{
        spec_name: "重量",
        item_id: 552569,
        item: "11",
        src: "",
        isClick: 0
      }, {
        spec_name: "重量",
        item_id: 552570,
        item: "15",
        src: "",
        isClick: 0
      }]],
      standardInfo: [{
        id: 1018269,
        key: "535385_535692_552569",
        price: "10.00",
        productprice: "0.00",
        store_count: 20
      }, {
        id: 1018270,
        key: "535385_535692_552570",
        price: "20.00",
        productprice: "0.00",
        store_count: 20
      }, {
        id: 1018271,
        key: "535385_535693_552569",
        price: "30.00",
        productprice: "0.00",
        store_count: 20
      }, {
        id: 1018272,
        key: "535385_535693_552570",
        price: "40.00",
        productprice: "0.00",
        store_count: 20
      }, {
        id: 1018273,
        key: "535386_535692_552569",
        price: "50.00",
        productprice: "0.00",
        store_count: 20
      }, {
        id: 1018274,
        key: "535386_535692_552570",
        price: "60.00",
        productprice: "0.00",
        store_count: 20
      }, {
        id: 1018275,
        key: "535386_535693_552569",
        price: "70.00",
        productprice: "0.00",
        store_count: 20
      }, {
        id: 1018276,
        key: "535386_535693_552570",
        price: "80.00",
        productprice: "0.00",
        store_count: 18
      }],
      selectedId: [],
      selectedStandard: [],
      standardObject: {},
      commodityNum: 1,
      price: "",
      number: "",
      modelImg: "",
      guigetitle: "",
      countcart: "",
      erweima: "",
      goods_id: "",
      details: "1111111",
      goodsdetail: "",
      thumbs: "",
      specification: "",
      shop_info: "",
      currentId: "",
      mergeStandard: "",
      guigeId: "",
      properties: "",
      windowW: "",
      windowHeight: "",
	  comment:[],
	  comment_count:'0'
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sys();
    var goods_id = options.id;
    this.setData({
      goods_id: goods_id
    });
    var that = this;
    uni.request({
      url: api + '/SupermarketApi/Goodsdetail/index2',
      // 仅为示例，并非真实的接口地址
      data: {
        goods_id: goods_id,
      },
      header: {
        'content-type': 'application/json' // 默认值

      },
      method: 'GET',

      success(res) {

        var detailData = res.data;
        console.log(res);
        that.setData({
		  details:graceRichText.format(detailData.goodsdetail.details),

          goodsdetail: detailData.goodsdetail,
          thumbs: detailData.thumbs,
          specification: detailData.specification,
          // number: detailData.specification[0].number,
          // price: detailData.specification[0].price,
          // modelImg: detailData.specification[0].photo,
          shop_info: detailData.shop_info,
          countcart: detailData.countcart,
          commodityStandard: detailData.specs_properties,
          standardInfo: detailData.spec_attribute_combination,
          standardObject: detailData.spec_attribute_combination[0],
		  comment:detailData.comment,
		  comment_count:detailData.comment_count

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
	  // 分享
	  async shareFc() {
	  			let _this = this;
	  			try {
	  				this.count++;
	  				_app.log('准备生成:' + new Date())
	  				const d = await getSharePoster({
	  					_this: _this, //若在组件中使用 必传
	  					type: 'testShareType',
	  					formData: {
	  						//访问接口获取背景图携带自定义数据
	  
	  					},
	  					posterCanvasId: _this.canvasId, //canvasId
	  					delayTimeScale: 20, //延时系数
	  					background: {
	  						height: 10,
	  						width: 10
	  					},
	  					setCanvasWH({
	  						bgObj
	  					}) {
	  						_this.poster = bgObj
	  					},
	  					drawArray({
	  						bgObj,
	  						type,
	  						bgScale,
	  						setBgObj,
	  						getBgObj
	  					}) {
	  						return [{
	  								type: 'image',
	  								id: 'productImage',
	  								url:  '/static/33.png',
	  								dx: 0,
	  								dy: 0,
	  								serialNum: 0,
	  								infoCallBack(imageInfo) {
	  									let width;
	  									let height;
	  									if (imageInfo.width > imageInfo.height) {
	  										width = imageInfo.width > 700 ? 700 : imageInfo.width;
	  										height = width / imageInfo.width * imageInfo.height;
	  									} else {
	  										height = imageInfo.height > 700 ? 700 : imageInfo.height;
	  										width = height / imageInfo.height * imageInfo.width;
	  									}
	  									if (width < 500) {
	  										width = 500;
	  										height = width / imageInfo.width * imageInfo.height;
	  									}
	  									let addHeight = height * .3;
	  									if (addHeight < 150) addHeight = 150;
	  									if (addHeight > 250) addHeight = 250;
	  									setBgObj({
	  										width,
	  										height: height + addHeight
	  									});
	  									return {
	  										dWidth: width,
	  										dHeight: height
	  									}
	  								}
	  							},
	  							{
	  								type: 'text',
	  								id: 'productName',
	  								text: '超市',
	  								color: '#000',
	  								serialNum: 1,
	  								allInfoCallback({
	  									drawArray
	  								}) {
	  									const productImage = drawArray.find(item => item.id === 'productImage')
	  									const addHeight = getBgObj().height - productImage.dHeight;
	  									return {
	  										size: getBgObj().width * 0.05,
	  										lineFeed: {
	  											maxWidth: getBgObj().width * 0.5,
	  											lineNum: 1
	  										},
	  										dx: getBgObj().width * .05,
	  										dy: productImage.dHeight + addHeight * .25,
	  									}
	  								}
	  							},
	  							{
	  								type: 'text',
	  								text: '超级大卖场',
	  								color: '#f1505c',
	  								serialNum: 2,
	  								allInfoCallback({
	  									drawArray
	  								}) {
	  									const productImage = drawArray.find(item => item.id === 'productImage')
	  									const addHeight = getBgObj().height - productImage.dHeight;
	  									return {
	  										size: getBgObj().width * 0.05,
	  										lineFeed: {
	  											maxWidth: getBgObj().width * 0.5,
	  											lineNum: 1
	  										},
	  										dx: getBgObj().width * .05,
	  										dy: productImage.dHeight + addHeight * .5,
	  									}
	  								}
	  							},
	  							{
	  								type: 'text',
	  								text: '家步三一',
	  								serialNum: 3,
	  								allInfoCallback({
	  									drawArray
	  								}) {
	  									const productImage = drawArray.find(item => item.id === 'productImage')
	  									const addHeight = getBgObj().height - productImage.dHeight;
	  									return {
	  										size: getBgObj().width * 0.05,
	  										lineFeed: {
	  											maxWidth: getBgObj().width * 0.5,
	  											lineNum: 1
	  										},
	  										dx: getBgObj().width * .05,
	  										dy: productImage.dHeight + addHeight * .75,
	  									}
	  								}
	  							},
	  							{
	  								type: 'qrcode',
	  								text: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.jiabusanyi.www',
	  								serialNum: 4,
	  								allInfoCallback({
	  									drawArray
	  								}) {
	  									const productImage = drawArray.find(item => item.id === 'productImage')
	  									const addHeight = getBgObj().height - productImage.dHeight;
	  									const widthSize = getBgObj().width * .4;
	  									const heightSize = addHeight;
	  									const countSize = widthSize > heightSize ? heightSize : widthSize;
	  									const size = countSize * .9;
	  									return {
	  										size: size,
	  										dx: getBgObj().width - countSize * .95,
	  										dy: getBgObj().height - countSize * .95
	  									}
	  								}
	  							}
	  						]
	  					}
	  				})
	  				_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
	  				_this.poster.finalPath = d.poster.tempFilePath;
	  				_this.qrShow = true;
	  			} catch (e) {
	  				_app.hideLoading();
	  				_app.showToast(JSON.stringify(e));
	  				console.log(JSON.stringify(e));
	  			}
	  		},
	  		saveImage() {
	  			// #ifndef H5
	  			uni.saveImageToPhotosAlbum({
	  				filePath: this.poster.finalPath,
	  				success(res) {
	  					_app.showToast('保存成功');
	  				}
	  			})
	  			// #endif
	  			// #ifdef H5
	  			_app.showToast('保存了');
	  			// #endif
	  		},
	  		share() {
	  			// #ifdef APP-PLUS
	  			_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
	  			// #endif
	  
	  			// #ifndef APP-PLUS
	  			_app.showToast('分享了');
	  			// #endif
	  		},
	  		hideQr() {
	  			this.qrShow = false;
	  		},
	  	
	  //结束 
    handleContact(e) {},

    chooseGuige(e) {
      var chavId = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var guigetitle = e.currentTarget.dataset.title;
      var specification = this.specification;
      this.setData({
        chavId: chavId,
        price: specification[index].price,
        number: specification[index].number,
        modelImg: specification[index].photo,
        guigetitle: guigetitle
      });
    },

    confirmNum() {
      if (!this.guigeId) {
        this.setData({
          showNum: true
        });
      } else {
        var num = this.buy_num;
        var goods_id = this.goodsdetail.goods_id;
        var chavId = this.guigeId;
		
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
						console.log(res)
						if(res.data.status==200){
							var user_id = res.data.token.user;
							uni.request({
							  url: api + '/SupermarketApi/Order/checkBuy1',
							  // 仅为示例，并非真实的接口地址
							  data: {
							    goods_id: goods_id,
							    num: num,
							    user_id: user_id
							  },
							  header: {
							    'content-type': 'application/json' // 默认值
							
							  },
							  method: 'GET',
							
							  success(res) {
							    if (res.data.status == 0) {
							      uni.showToast({
							        title: '此商品' + res.data.good.days + '天内您还可购买' + res.data.num + '个',
							        icon: 'none',
							        duration: 2000
							      });
							    } else {
							      var goods = [];
							      goods.push({
							        num: num,
							        goods_id: goods_id,
							        chavId: chavId
							      });
								  
							      var goods = JSON.stringify(goods);
							      uni.navigateTo({
							        url: '/pages/confirmOrder/confirmOrder?car=' + goods + '&type=zhijie'
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
    },

    buyNow() {
      this.setData({
        showNum: true
      });
    },

    closeNum() {
      this.setData({
        showNum:! this.showNum
      });
    },

    addCar() {
      var that = this;
	  
      if (!this.guigeId) {
        this.setData({
          showNum: true
        });
      } else {
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
							  url: api + '/SupermarketApi/Goodsdetail/addCar1',
							  // 仅为示例，并非真实的接口地址
							  data: {
							    goods_id: that.goods_id,
							    chavId: that.guigeId,
							    user_id: user_id
							  },
							  header: {
							    'content-type': 'application/json' // 默认值
							
							  },
							  method: 'GET',
							
							  success(res) {
								  console.log(res.data);return false;
							    if (res.data.status == 'no') {
							      uni.showLoading({
							        title: '购物车已经存在此商品，不能重复添加'
							      });
							      setTimeout(function () {
							        uni.hideLoading();
							      }, 1000);
							    } else {
							      that.setData({
							        countcart: res.data.countcart
							      });
							      uni.showLoading({
							        title: '商品已经成功加入购物车'
							      });
							      setTimeout(function () {
							        uni.hideLoading();
							      }, 1000);
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
				    },
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
    },

    suanfa: function (e) {
      var that = this;
      var or = e.currentTarget.dataset.val;
      var buy_num = that.buy_num;

      if (or == 2) {
        buy_num++;
      } else {
        if (buy_num == 1) {
          buy_num = 1;
        } else {
          buy_num--;
        }
      }

      that.setData({
        buy_num: buy_num
      });
    },

    shareFirend() {
      this.setData({
        showShare: !this.showShare
      });
	  // uni.share({
	  //     provider: 'weixin',
	  //     scene: "WXSceneSession",
	  //     type: 5,
	  //     imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png',
	  //     title: '欢迎体验uniapp',
	  //     miniProgram: {
	  //         id: 'wx2f1a27913ae5644f',
	  //         path: 'pages/index/index',
	  //         type: 0,
	  //         webUrl: 'http://uniapp.dcloud.io'
	  //     },
	  //     success: ret => {
	  //         console.log(JSON.stringify(ret));
	  //     }
	  // });
    },

    getTockon() {
      uni.showLoading({
        title: '正在加载中'
      });
      var that = this;
      var token = '';
      uni.request({
        url: api + '/SupermarketApi/Goodsdetail/token',
        // 仅为示例，并非真实的接口地址
        data: {
          openid: uni.getStorageSync('code')
        },
        header: {
          'content-type': 'application/json' // 默认值

        },
        method: 'GET',

        success(res) {
          token = res.data.access_token; // 获取二维码

          uni.request({
            url: api + '/SupermarketApi/Goodsdetail/fenxiang',
            data: {
              token: res.data.access_token,
              // page: 'pages/index/index',
              scene: '123456',
              width: 200
            },
            dataType: 'json',
            success: function (res) {
              /// 获取到base64Data
              var base64Data = res.data; /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64

              base64Data = uni.arrayBufferToBase64(uni.base64ToArrayBuffer(base64Data)); /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求

              const base64ImgUrl = "data:image/png;base64," + base64Data; /// 刷新数据
              //这个是转化成base64（因为微信官方返回给我们的会被解析成乱码）
              //  that.setData({ imgUrl: wx.arrayBufferToBase64(res.data)})

              var erweima1 = api + '/attachs/' + res.data;
              that.setData({
                showHaibao: true
              });
              uni.getImageInfo({
                src: erweima1,
                success: function (res) {
                  that.setData({
                    erweima: res.path
                  });
                  that.createHaibao();
                  uni.hideLoading();
                },
                fail: function (res) {}
              });
            },
            fail: function (res) {
              uni.showModal({
                title: '提示',
                content: '请稍后重试',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {}
                }
              });
            }
          });
        }

      });
    },

    createHaibao() {
      var that = this;
      var erweima = that.erweima;
      var canvas = uni.createCanvasContext('myCanvas');
      var windowW = that.windowW;
      var canvasimgbg = that.canvasimgbg;
      canvas.drawImage("/static/images/31.jpg", 0, 0, windowW, 430); //画背景图  

      canvas.drawImage(canvasimgbg, (windowW - 100) / 2, 40, 100, 100);
      canvas.setFontSize(18);
      const metrics = canvas.measureText('家步31').width;
      canvas.fillText('家步31', (windowW - metrics) / 2, 30);
      var title = that.goodsdetail.title;
      const titleW = canvas.measureText(title).width;
      canvas.setFontSize(15);
      canvas.fillText(title, (windowW - titleW) / 2, 160);
      var price = '￥' + that.price;
      const priceW = canvas.measureText(price).width;
      canvas.setFillStyle('red');
      canvas.fillText(price, (windowW - priceW) / 2, 180);
      var guige = '已售' + that.goodsdetail.num + that.goodsdetail.unit;
      const guigeW = canvas.measureText(guige).width;
      canvas.setFillStyle('black');
      canvas.fillText(guige, (windowW - guigeW) / 2, 200);
      canvas.drawImage(erweima, (windowW - 150) / 2, 220, 150, 150);
      canvas.draw(true, setTimeout(function () {}, 2000));
    },

    saveHaibao() {
      setTimeout(function () {
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          canvasId: 'myCanvas',
          success: function (res) {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,

              success(res) {}

            }); //大图查看
            // wx.previewImage({
            //   urls: [res.tempFilePath],
            // })
          }
        });
      }, 1000);
    },

    guanbiHaibao() {
      var that = this;
      that.setData({
        showHaibao: false,
        showShare: false
      });
    },

    // 多规格

    /* 每个规格的点击事件 */
    handleStandardClick(e) {
      let id = e.currentTarget.dataset.id; // 总规格名称索引

      let standardIndex = e.currentTarget.dataset.standardIndex; // 单个规格名称索引

      let index = e.currentTarget.dataset.index;
      let commodityStandard = this.commodityStandard;
      let standardLength = commodityStandard[standardIndex][0].length; // 用于存储规格的id

      let selectedId = this.selectedId; // 用总规格名称索引来存储每个选中的规格id

      selectedId[standardIndex] = id;
      let selectedStandard = this.selectedStandard; // 在点击的时候，只需要对点击的这个规格所在的数组进行循环

      for (let i = 0; i < standardLength; i++) {
        // 找到对应的单个规格索引，并设置isClick及单个规格名称
        if (index == i) {
          commodityStandard[standardIndex][0][index].isClick = 1;
          selectedStandard[standardIndex] = commodityStandard[standardIndex][0][index].title;
        } else {
          commodityStandard[standardIndex][0][i].isClick = 0;
        }
      } // 将id用_连接起来


      let mergeId = selectedId.join(',');
      let mergeStandard = selectedStandard.join(',');
      let standardInfo = this.standardInfo;
      mergeStandard = mergeStandard + ",";
      let standardInfoLength = standardInfo.length; // 用于存储选中的规格

      let standardObject = {};

      for (let i = 0; i < standardInfoLength; i++) {
        if (standardInfo[i].properties == mergeStandard) {
          standardObject = standardInfo[i];
          break;
        } else {
          standardObject = this.standardObject;
        }
      }

      console.log(standardObject);
      this.setData({
        currentId: id,
        commodityStandard,
        selectedId,
        standardObject,
        mergeStandard,
        selectedStandard,
        guigeId: standardObject.id,
        properties: standardObject.properties
      });
    },

    /* 保存选择的规格 */
    submitSelected() {
      let selectedStandard = this.selectedStandard;
      let length = selectedStandard.length;

      if (length == 0) {
        uni.showToast({
          title: '请选择规格',
          icon: 'none',
          duration: 2000
        });
        return false;
      }

      for (let i = 0; i < length; i++) {
        if (length < this.commodityStandard.length) {
          uni.showToast({
            title: '请选择规格',
            icon: 'none',
            duration: 2000
          });
          break;
        }

        if (selectedStandard[i] == undefined) {
          uni.showToast({
            title: '请选择规格',
            icon: 'none',
            duration: 2000
          });
          break;
        }

        uni.showToast({
          title: '选择成功',
          icon: 'none',
          duration: 2000
        });
        this.setData({
          showNum: false
        });
      }
    },

    //多规格
    sys: function () {
      var that = this;
      uni.getSystemInfo({
        success: function (res) {
          that.setData({
            windowW: res.windowWidth * 0.6,
            windowHeight: res.windowHeight
          });
        }
      });
    }
  }
};
</script>
<style>
@import "./goodDetail.css";
.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 2vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>