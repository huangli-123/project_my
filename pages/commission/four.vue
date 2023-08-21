<template>
	 <view class="z-index">
	        <web-view :webview-styles="webviewStyles" src="https://www.xiaguangjiazheng.com/"></web-view>
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
			                }	
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
