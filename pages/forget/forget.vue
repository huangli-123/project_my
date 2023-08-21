<template>
	<view class="forget">
		
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="请输入手机号码"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="请输入新密码"
					isShowPass
				></wInput>
				
				<wInput
					v-model="verCode"
					type="number"
					maxlength="6"
					placeholder="验证码"
					
					isShowCode
					codeText="获取重置码"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			
			<wButton 
				class="wbutton"
				text="重置密码"
				:rotate="isRotate" 
				@click.native="startRePass()"
			></wButton>

		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				phoneData: "", //电话
				passData: "", //密码
				verCode:"", //验证码
				isRotate: false, //是否加载旋转
			}
		},
		components:{
			wInput,
			wButton
		},
		mounted() {
			_this= this;
		},
		methods: {
			getVerCode(){
				//获取验证码
				if (_this.phoneData.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				console.log("获取验证码")
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: '模拟倒计时触发'
				});
				//请求获取验证码
				  uni.request({
				      url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/fasongxinxi2', //仅为示例，并非真实接口地址。
				      data: {
				          phone: _this.phoneData
				      },
				      header: {
				        'content-type': 'application/x-www-form-urlencoded',
				        'Accept': 'application/json'
				      },
				      method: "POST",
				      success: (res) => {
				          console.log(res)
						  uni.showToast({
						      icon: 'none',
						  	  position: 'bottom',
						      title: res.data
						  });
				      }
				  });
				setTimeout(function(){
					_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '模拟倒计时终止'
					});
				},3000)
			},
			startRePass() {
				//重置密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length != 11 || this.phoneData=='') {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
			    if (this.passData=='') {
			        uni.showToast({
			            icon: 'none',
						position: 'bottom',
			            title: '密码不正确'
			        });
			        return false;
			    }
				if (this.verCode=='') {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '验证码不正确'
				    });
				    return false;
				}
				//重置密码
				  const unionId = uni.getStorageSync('unionId');
				  uni.request({
				      url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/login2', //仅为示例，并非真实接口地址。
				      data: {
				          phone: this.phoneData,
						  password:this.passData,
						  yzm_code:this.verCode,
						  unionId:unionId
				      },
				      header: {
				        'content-type': 'application/x-www-form-urlencoded',
				        'Accept': 'application/json'
				      },
				      method: "POST",
				      success: (res) => {
				          console.log(res.data)
						  if(res.data.status==1){
							  uni.setStorageSync('token',res.data.token.token);
							  uni.switchTab({
							  	url: '/pages/index/index',
							      success: res => {console.log(res)},
							      fail: () => {console.log(res)},
							      complete: () => {console.log(res3)}
							  });
						  }else if (res.data.status==2){
							  uni.showToast({
							    title: res.data.msg,
							    icon: 'none',
							    duration: 2000,
							  });	
						  }
						  
						 
				      }
				  });
				_this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false
				},3000)
				
				
			}
		}
	}
</script>

<style>
	@import "./forget.css";
</style>

