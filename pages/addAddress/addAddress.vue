<template>
<view>
<view class="container">
     <view class="addAddress">
         <view class="flex alignItems box"> 
             <text>姓  名：</text><input type="text" :value="name" placeholder="请填写服务人姓名" @input="setName"></input> 
         </view>
         <view class="flex alignItems box"> 
             <text>手机号：</text><input type="number" :value="num" placeholder="请填写服务人手机号码" @input="setNum"></input> 
         </view>
          <view class="flex alignItems box">
             <text>所在地区：</text>
             <!-- <input  placeholder="请选择省市区"  value="{{province}}-{{city}}-{{county}}"   bindfocus="open" /> -->
             <text class="cityValue" @tap="open">{{province}}-{{city}}-{{county}}</text>
            
          </view>
          <view class="flex box"> 
             <text>详细地址：</text><textarea :value="address" @input="setAddress" placeholder="如道路、门牌号、小区、楼栋号、单元室等"></textarea> 
         </view>
     </view>
     <view class="flex justifyBetween alignItems moren">
       <text>设为默认地址</text>
       <switch :checked="moren==1?true:false" @change="switchChange"></switch>
     </view>
     <view class="confirm" @tap="bianji">保存</view>
</view>

<view v-if="condition" class="citypicker">
	<view class="cityheader">
	  <view @tap="open" class="city-cancel">取消</view>
	  <view @tap="open" class="city-true">确定</view>
	</view>
  <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" :value="value" @change="bindChange" class="citybody">
        <picker-view-column>
          <view v-for="(item, index) in provinces" :key="index" style="line-height: 50px;padding-left:10px;">{{item}}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, index) in citys" :key="index" style="line-height: 50px;padding-left:10px;">{{item}}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, index) in countys" :key="index" style="line-height: 50px;padding-left:10px;">{{item}}</view>
        </picker-view-column>
  </picker-view>
</view>
</view>
</template>

<script>
//获取应用实例
var tcity = require("../../utils/city.js");
const app = getApp;
var api = null;
api = require('../../api.js');

export default {
  data() {
    return {
      provinces: [],
      province: "",
      citys: [],
      city: "",
      countys: [],
      county: '',
      value: [0, 0, 0],
      values: [0, 0, 0],
      condition: false,
      moren: 1,
      orderType: 'add',
      address: '',
      name: '',
      num: '',
      car: "",
      addressid: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var id = options.addressid;

    if (!id) {
      that.setData({
        car: options.car,
        orderType: options.type
      });
    } else {
      //如果不是新建地址则获取地址信息
      let listtoadd = wx.getStorageSync('listtoadd');
      that.setData({
        addressid: id,
        car: options.car,
        orderType: options.type,
        name: listtoadd.user_name,
        num: listtoadd.user_phone,
        address: listtoadd.address,
        moren: listtoadd.setting
      });
    }

    tcity.init(that);
    var cityData = that.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }

    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name);
    }

    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name);
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    });
  },
  methods: {
    open: function () {
      this.setData({
        condition: !this.condition
      });
    },

    setName(e) {
      this.setData({
        name: e.detail.value
      });
    },

    setNum(e) {
      this.setData({
        num: e.detail.value
      });
    },

    setAddress(e) {
      this.setData({
        address: e.detail.value
      });
    },

    switchChange(e) {
      if (e.detail.value == true) {
        this.setData({
          moren: 1
        });
      } else {
        this.setData({
          moren: 0
        });
      }
    },

    bindChange: function (e) {
      console.log(e);
      var val = e.detail.value;
      var t = this.values;
      var cityData = this.cityData;

      if (val[0] != t[0]) {
        const citys = [];
        const countys = [];

        for (let i = 0; i < cityData[val[0]].sub.length; i++) {
          citys.push(cityData[val[0]].sub[i].name);
        }

        for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
          countys.push(cityData[val[0]].sub[0].sub[i].name);
        }

        this.setData({
          province: this.provinces[val[0]],
          city: cityData[val[0]].sub[0].name,
          citys: citys,
          county: cityData[val[0]].sub[0].sub[0].name,
          countys: countys,
          values: val,
          value: [val[0], 0, 0]
        });
        return;
      }

      if (val[1] != t[1]) {
        const countys = [];

        for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
          countys.push(cityData[val[0]].sub[val[1]].sub[i].name);
        }

        this.setData({
          city: this.citys[val[1]],
          county: cityData[val[0]].sub[val[1]].sub[0].name,
          countys: countys,
          values: val,
          value: [val[0], val[1], 0]
        });
        return;
      }

      if (val[2] != t[2]) {
        this.setData({
          county: this.countys[val[2]],
          values: val
        });
        return;
      }
    },

    bianji(e) {
      var type = this.orderType;
      var id = this.addressid;
      var that = this;
      var name = this.name;
      var num = this.num;
      var province = this.province;
      var city = this.city;
      var county = this.county;
      var address = this.address;
      var moren = this.moren;

try {
        var value = uni.getStorageSync('token');
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
    					if (type == 'add') {
    					  if (!id) {
    					    if (name == '' || num == '' || address == '') {
    					      wx.showToast({
    					        title: '所有项不能为空!',
    					        icon: 'none',
    					        duration: 2000
    					      });
    					    } else {
    					      wx.request({
    					        url: api + '/SupermarketApi/My/useraddressadd2',
    					        data: {
    					          user_id: user_id,
    					          user_name: name,
    					          user_phone: num,
    					          address: address,
    					          area_id1: province,
    					          area_id2: city,
    					          area_id3: county,
    					          setting: moren
    					        },
    					        header: {
    					          'content-type': 'application/x-www-form-urlencoded',
    					          'Accept': 'application/json'
    					        },
    					        method: "POST",
    					
    					        success(res) {
    					          wx.showToast({
    					            title: '添加成功!',
    					            icon: 'none',
    					            duration: 2000
    					          });
    					          wx.redirectTo({
    					            url: '/pages/addressList/addressList'
    					          });
    					        },
    					
    					        fail(res) {
    					          wx.showToast({
    					            title: '网络延迟!',
    					            icon: 'none',
    					            duration: 2000
    					          });
    					          console.log(res);
    					        }
    					
    					      });
    					    }
    					  } else {
    					    if (name == '' || num == '' || address == '') {
    					      wx.showToast({
    					        title: '所有项不能为空!',
    					        icon: 'none',
    					        duration: 2000
    					      });
    					    } else {
    					      wx.request({
    					        url: api + '/SupermarketApi/My/useraddress2',
    					        data: {
    					          user_id: user_id,
    					          address_id: id,
    					          user_name: name,
    					          user_phone: num,
    					          address: address,
    					          area_id1: province,
    					          area_id2: city,
    					          area_id3: county,
    					          setting: moren
    					        },
    					        header: {
    					          'content-type': 'application/x-www-form-urlencoded',
    					          'Accept': 'application/json'
    					        },
    					        method: "POST",
    					
    					        success(res) {
    					          wx.showToast({
    					            title: '修改成功!',
    					            icon: 'none',
    					            duration: 2000
    					          });
    					          wx.redirectTo({
    					            url: '/pages/addressList/addressList'
    					          });
    					        },
    					
    					        fail(res) {
    					          wx.showToast({
    					            title: '网络延迟!',
    					            icon: 'none',
    					            duration: 2000
    					          });
    					          console.log(res);
    					        }
    					
    					      });
    					    }
    					  }
    					} else {
    					  if (!id) {
    					    if (name == '' || num == '' || address == '') {
    					      wx.showToast({
    					        title: '所有项不能为空!',
    					        icon: 'none',
    					        duration: 2000
    					      });
    					    } else {
    					      wx.request({
    					        url: api + '/SupermarketApi/My/useraddressadd2',
    					        data: {
    					          user_id: user_id,
    					          user_name: name,
    					          user_phone: num,
    					          address: address,
    					          area_id1: province,
    					          area_id2: city,
    					          area_id3: county,
    					          setting: moren
    					        },
    					        header: {
    					          'content-type': 'application/x-www-form-urlencoded',
    					          'Accept': 'application/json'
    					        },
    					        method: "POST",
    					
    					        success(res) {
    					          wx.showToast({
    					            title: '添加成功!',
    					            icon: 'none',
    					            duration: 2000
    					          });
    					          wx.redirectTo({
    					            url: '/pages/confirmOrder/confirmOrder?car=' + that.car + '&type=' + that.orderType
    					          });
    					        },
    					
    					        fail(res) {
    					          wx.showToast({
    					            title: '网络延迟!',
    					            icon: 'none',
    					            duration: 2000
    					          });
    					          console.log(res);
    					        }
    					
    					      });
    					    }
    					  } else {
    					    if (name == '' || num == '' || address == '') {
    					      wx.showToast({
    					        title: '所有项不能为空!',
    					        icon: 'none',
    					        duration: 2000
    					      });
    					    } else {
    					      wx.request({
    					        url: api + '/SupermarketApi/My/useraddress2',
    					        data: {
    					          user_id: user_id,
    					          address_id: id,
    					          user_name: name,
    					          user_phone: num,
    					          address: address,
    					          area_id1: province,
    					          area_id2: city,
    					          area_id3: county,
    					          setting: moren
    					        },
    					        header: {
    					          'content-type': 'application/x-www-form-urlencoded',
    					          'Accept': 'application/json'
    					        },
    					        method: "POST",
    					
    					        success(res) {
    					          wx.showToast({
    					            title: '修改成功!',
    					            icon: 'none',
    					            duration: 2000
    					          });
    					          wx.redirectTo({
    					            url: '/pages/confirmOrder/confirmOrder?addressid=' + id + '&car=' + that.car + '&type=' + that.orderType
    					          });
    					        },
    					
    					        fail(res) {
    					          wx.showToast({
    					            title: '网络延迟!',
    					            icon: 'none',
    					            duration: 2000
    					          });
    					          console.log(res);
    					        }
    					
    					      });
    					    }
    					  }
    					}
						 
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
@import "./addAddress.css";
</style>