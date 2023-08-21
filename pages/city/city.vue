<template>
    <view>
        <city-select
            @cityClick="cityClick"
            :formatName="formatName"
            :activeCity="activeCity"
            :hotCity="hotCity"
            :obtainCitys="obtainCitys"
            :isSearch="true"
        ></city-select>
    </view>
</template>

<script>
// import citys from '@/components/city-select/citys.js'
// console.log(citys.length)
const app = getApp();
var api = null;
api = require("../../api.js");

import citySelect from '@/components/city-select/city-select.vue'
var QQMapWX = require("../../utils/qqmap-wx-jssdk.js");
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'WSPBZ-TABW4-4ZRUZ-DO4C2-KQBUF-SLFDV' //这里自己的key秘钥进行填充

});
export default {
    data() {
        return {
            //需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
            formatName: 'name',
            //当前城市
            activeCity: {
                city_id: '',
                name: ''
            },
            //热门城市
            hotCity: [
                {
                    id: 0,
                    title: '南京市'
                },
                {
                    id: 1,
                    title: '南京市'
                }
            ],
            //显示的城市数据
            obtainCitys: [
                {
                    city_id: "4",
                    name: "无锡市",
                    first_letter: "W",
                    is_open: "1",
                    orderby: "2"
                },
            ],
        }
    },
    components: {
        citySelect
    },
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
	},
    onLoad() {
		
		var that = this;
		
		uni.request({
		  url: api + '/SupermarketApi/City/index',
		  // 仅为示例，并非真实的接口地址
		  data: {
		  },
		  header: {
		    'content-type': 'application/json' // 默认值
		
		  },
		  method: 'GET',
		
		  success(res) {
		   that.setData({
		     obtainCitys: res.data
		   });
		   
		   //动态更新数据
		   setTimeout(() => {
		       //修改需要构建索引参数的名称
		       this.formatName = 'cityName'
		       //修改当前城市
		       this.activeCity = {
		           cityName: activeCity["name"],
		           cityCode: activeCity["city_id"]
		       }
		       //修改热门城市 
		       this.hotCity = [
		           {
		               cityName: '南京',
		               cityCode: 110100
		           },
		           {
		               cityName: '北京',
		               cityCode: 110102
		           }
		       ]
		       //修改构建索引数据
		       this.obtainCitys = obtainCitys
		       uni.showToast({
		           icon: 'none',
		           title: '更新数据成功',
		           // #ifdef MP-WEIXIN
		           duration: 3000,
		           // #endif
		           mask: true
		       })
		   }, 5000)
		  }
		
		});					 
		var activeCity = uni.getStorageSync('activeCity');
		var longitude = uni.getStorageSync('longitude');
		var latitude = uni.getStorageSync('latitude');
			
		if (!activeCity && !longitude && !latitude) {
		  that.getLocation();
		} else {
		  that.setData({
		    hasLocation: true,
		    address: address
		  });
		}	
        
    },
    methods: {
        cityClick(item) {
			 uni.setStorageSync('city', item);
			 uni.switchTab({
			 	url: '/pages/index/index',
			     success: res => {console.log('res')},
			     fail: () => {console.log('res2')},
			     complete: () => {console.log('res3')}
			 });
            // uni.showToast({
            //     icon: 'none',
            //     title: 'item: ' + JSON.stringify(item),
            //     // #ifdef MP-WEIXIN
            //     duration: 3000,
            //     // #endif
            //     mask: true
            // })
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
			       activeCity: {
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
}

</script>
<style></style>
