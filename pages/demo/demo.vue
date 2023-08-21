<template>
<view>
<view class="multipleStandard" @tap="standardSelect">
  <view class="standard">
    规格:
    <text class="item">颜色</text>    
    <text class="item">颜色</text>    
    <text class="item">颜色</text>    
  </view>
  <image src="/static/images/arrows.png" class="arrows"></image>
</view>
<view style="background:rgb(207, 224, 232); height: 300rpx;margin-top: 50rpx;"></view>
<view :animation="animationData" class="selectStandard" catchtouchmove="noMove">
  <view class="tophead">
    <view class="topimg">
      <image :src="goods.original_img"></image>
    </view>
    <view class="topright">
      <view class="selectClose">
        <view style="color:#ef5426;">{{standardObject.price}}</view>
        <image src="/static/images/close.png" @tap="handleClose"></image>
      </view>
      <view style="margin:10rpx 0;color:#999999;">库存:{{standardObject.store_count}}</view>
      <view>规格: {{mergeStandard}}</view>
    </view>
  </view>
  <view v-for="(item, standardIndex) in commodityStandard" :key="standardIndex" class="standard">
    <view class="standardTitle">{{item[0].spec_name}}</view>
    <view class="standardItem">
      <block v-for="(item, index) in item" :key="index">
        <view :class="'selectItem ' + isSelect[item.isClick]" @tap="handleStandardClick" :data-standard-index="standardIndex" :data-index="index" :data-id="item.item_id">{{item.item}}</view>        
      </block>
    </view>
    <view style="height:1px; width:100%;background-color:#eeeeee;"></view>
  </view>
  <view class="selectCount">
    <view class="countname">数量</view>
    <view class="countright">
      <i-input-number :value="commodityNum" min="1" :max="store_count" @change="handleCommodityNumber"></i-input-number>
    </view>
  </view>
  <view class="submitBtn" @tap="submitSelected">
    确定
  </view>
</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      animationData: {},
      isSelect: ["standardNormal", "standardSelected", "standardDisable"],

      /* 用于区别当前的规格是否选中 */
      goods: {
        goods_name: "男鞋",
        store_count: 158,
        cost_price: "10.00",
        original_img: "/static/images/commodity.jpg"
      },
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
      store_count: "",
      currentId: "",
      mergeStandard: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    let goods = this.goods;
    let standardObject = this.standardObject;
    standardObject.price = goods.cost_price;
    standardObject.store_count = goods.store_count;
    let store_count = goods.store_count;
    this.setData({
      standardObject,
      store_count
    });
  },
  methods: {
    /* 规格选择 */
    standardSelect() {
      var that = this;
      var animal1 = wx.createAnimation({
        timingFunction: 'ease-in'
      }).translate(0, -600).step({
        duration: 300
      });
      that.setData({
        animationData: animal1.export()
      });
    },

    /* 关闭规格选择 */
    handleClose() {
      var that = this;
      var animal1 = wx.createAnimation({
        timingFunction: 'ease-in'
      }).translate(0, 600).step({
        duration: 300
      });
      that.setData({
        animationData: animal1.export()
      });
    },

    /* 每个规格的点击事件 */
    handleStandardClick(e) {
      let id = e.currentTarget.dataset.id; // 总规格名称索引

      let standardIndex = e.currentTarget.dataset.standardIndex; // 单个规格名称索引

      let index = e.currentTarget.dataset.index;
      let commodityStandard = this.commodityStandard;
      let standardLength = commodityStandard[standardIndex].length; // 用于存储规格的id

      let selectedId = this.selectedId; // 用总规格名称索引来存储每个选中的规格id

      selectedId[standardIndex] = id;
      let selectedStandard = this.selectedStandard; // 在点击的时候，只需要对点击的这个规格所在的数组进行循环

      for (let i = 0; i < standardLength; i++) {
        // 找到对应的单个规格索引，并设置isClick及单个规格名称
        if (index == i) {
          commodityStandard[standardIndex][index].isClick = 1;
          selectedStandard[standardIndex] = commodityStandard[standardIndex][index].item;
        } else {
          commodityStandard[standardIndex][i].isClick = 0;
        }
      } // 将id用_连接起来


      let mergeId = selectedId.join('_');
      console.log(mergeId);
      let mergeStandard = selectedStandard.join('  ');
      console.log(mergeStandard);
      let standardInfo = this.standardInfo;
      let standardInfoLength = standardInfo.length; // 用于存储选中的规格

      let standardObject = {};

      for (let i = 0; i < standardInfoLength; i++) {
        if (standardInfo[i].key == mergeId) {
          standardObject = standardInfo[i];
          break;
        } else {
          standardObject = this.standardObject;
        }
      }

      this.setData({
        currentId: id,
        commodityStandard,
        selectedId,
        standardObject,
        mergeStandard,
        selectedStandard
      });
    },

    /* 选择数量 */
    handleCommodityNumber(e) {
      let commodityNum = e.detail.value;

      if (commodityNum >= this.store_count) {
        commodityNum = this.store_count;
      }

      this.setData({
        commodityNum
      });
    },

    /* 保存选择的规格 */
    submitSelected() {
      let selectedStandard = this.selectedStandard;
      let length = selectedStandard.length;
      console.log(length);

      if (length == 0) {
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
          duration: 2000
        });
        return false;
      }

      for (let i = 0; i < length; i++) {
        if (length < this.commodityStandard.length) {
          wx.showToast({
            title: '请选择规格',
            icon: 'none',
            duration: 2000
          });
          break;
        }

        if (selectedStandard[i] == undefined) {
          wx.showToast({
            title: '请选择规格',
            icon: 'none',
            duration: 2000
          });
          break;
        }
      }

      wx.showToast({
        title: '成功',
        icon: 'none',
        duration: 2000
      });
    }

  }
};
</script>
<style>
@import "./demo.css";
</style>