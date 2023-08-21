<template>
	 <view  class="z-index">
	        <web-view :webview-styles="webviewStyles" src="http://wx.yanxingjiaoyu.com/"></web-view>
	    </view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
				                  progress: {
				                      color: '#FF3333'
				                  }
				              },
								  mui:[]
			}
		},
		
		onShow:function() {
			let that =this;
			that.$forceUpdate();
		},
		onBackPress:function() {
		  // uni.switchTab({
		  //     url: '/pages/index/index'
		  // });
		  // return true
		},
		
		
		onNavigationBarButtonTap(e) {
		    uni.switchTab({
		          url: '/pages/index/index'
		      });        
		},
		

		methods: {
	
		}
	}
</script>

<style>

</style>
