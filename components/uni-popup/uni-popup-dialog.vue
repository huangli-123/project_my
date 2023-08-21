<template>
	<view class="uni-popup-dialog">
		<view class="uni-dialog-title">
			<text class="uni-dialog-title-text" :class="['uni-popup__'+dialogType]">
				{{title}}
			</text>
		</view>
		<view class="uni-dialog-content">
			<view class="uni-dialog-content-text" v-if="mode === 'base'">
				<view style="font-size: 14px;">请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了向你提供线上平台，内容分享等服务，我们需要收集你的设备信息、操作日志等个人信息，你可以在“我的”中查看、变更、删除个人信息，并管理你的授权，你可阅读<navigator url="/pages/about/zc" style="display: inline-block; color: #0062CC;">《服务协议》</navigator>和<navigator url="/pages/about/ys" style="display: inline-block; color: #0062CC;">《隐私政策》</navigator>了解详细信息。如你同意，请点击“同意”开始接受我们的服务</view>
			</view>
			<input v-else class="uni-dialog-input" v-model="val" type="text" :placeholder="placeholder" :focus="focus" >
		</view>
		<view class="uni-dialog-button-group">
			<view class="uni-dialog-button" @click="close">
				<text class="uni-dialog-button-text">不同意</text>
			</view>
			<view class="uni-dialog-button uni-border-left" @click="onOk">
				<text class="uni-dialog-button-text uni-button-color">同意</text>
			</view>
		</view>

	</view>
</template>

<script>
	/**
	 * PopUp 弹出层-对话框样式
	 * @description 弹出层-对话框样式
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} value input 模式下的默认值
	 * @property {String} placeholder input 模式下输入提示
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} mode = [base|input] 模式、
	 * 	@value base 基础对话框
	 * 	@value input 可输入对话框
	 * @property {String} content 对话框内容
	 * @property {Boolean} beforeClose 是否拦截取消事件
	 * @event {Function} confirm 点击确认按钮触发
	 * @event {Function} close 点击取消按钮触发
	 */

	export default {
		name: "uniPopupDialog",
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String, Number],
				default: '请输入内容'
			},
			/**
			 * 对话框主题 success/warning/info/error	  默认 success
			 */
			type: {
				type: String,
				default: 'error'
			},
			/**
			 * 对话框模式 base/input
			 */
			mode: {
				type: String,
				default: 'base'
			},
			/**
			 * 对话框标题
			 */
			title: {
				type: String,
				default: '服务协议和隐私政策'
			},
			/**
			 * 对话框内容
			 */
			// content: {
			// 	type: String,
			// 	default: '请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了向你提供线上平台，内容分享等服务，我们需要收集你的设备信息、操作日志等个人信息，你可以在“我的”中查看、变更、删除个人信息，并管理你的授权，你可阅读《服务协议》和《隐私政策》了解详细信息。如你同意，请点击“同意”开始接受我们的服务'
			// },
			/**
			 * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
			 */
			beforeClose: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dialogType: 'error',
				focus: false,
				val: ""
			}
		},
		inject: ['popup'],
		watch: {
			type(val) {
				this.dialogType = val
			},
			mode(val) {
				if (val === 'input') {
					this.dialogType = 'info'
				}
			},
			value(val) {
				this.val = val
			}
		},
		created() {
			// 对话框遮罩不可点击
			this.popup.mkclick = false
			if (this.mode === 'input') {
				this.dialogType = 'info'
				this.val = this.value
			} else {
				this.dialogType = this.type
			}
		},
		mounted() {
			this.focus = true
		},
		methods: {
			/**
			 * 点击确认按钮
			 */
			onOk() {
				this.$emit('confirm', () => {
					this.popup.close()
					if (this.mode === 'input') this.val = this.value
					}, this.mode === 'input' ? this.val : '')
					var cid=uni.getStorageSync('cid');
					if(cid){
							  console.log('set保存的的');
							  console.log(cid);
					}else{
						uni.setStorageSync('cid','4d5441744a28610be985a44e836854dd')
							  // plus.push.getClientInfoAsync((info) => {
							  //     var cid = info.clientid;
							  // 		  uni.setStorageSync('cid',cid)
									//   console.log('第一次获取的');
							  // 		  console.log(cid);
									// 	  // 页面打开自动打开对话框
										  
							  //     }, err => {
							  // 			  console.log('cid');
							  // });
					}
					
			},
			/**
			 * 点击取消按钮
			 */
			close() {
				// this.$emit('confirm', () => {
				// 	this.popup.close()
				// 	if (this.mode === 'input') this.val = this.value
				// 	}, this.mode === 'input' ? this.val : '')
				// 	var cid=uni.getStorageSync('cid');
				// 	if(cid){
				// 			  console.log('set保存的的');
				// 			  console.log(cid);
				// 	}else{
				// 		uni.setStorageSync('cid','4d5441744a28610be985a44e836854dd')
				// 			  // plus.push.getClientInfoAsync((info) => {
				// 			  //     var cid = info.clientid;
				// 			  // 		  uni.setStorageSync('cid',cid)
				// 					//   console.log('第一次获取的');
				// 			  // 		  console.log(cid);
				// 					// 	  // 页面打开自动打开对话框
										  
				// 			  //     }, err => {
				// 			  // 			  console.log('cid');
				// 			  // });
				// 	}
				if (this.beforeClose) {
					this.$emit('close', () => {
						this.popup.close()
						switch (uni.getSystemInfoSync().platform) {
						    case 'android':
						        plus.runtime.quit();
						    break;
						    case 'ios':
						        plus.ios.import('UIApplication').sharedApplication().performSelector('exit');
						    break;
						}
					})
					return
				}
				this.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-popup-dialog {
		width: 300px;
		border-radius: 15px;
		background-color: #fff;
	}

	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 15px;
		padding-bottom: 5px;
	}

	.uni-dialog-title-text {
		font-size: 16px;
		font-weight: 500;
	}

	.uni-dialog-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 15px 15px 15px;
	}

	.uni-dialog-content-text {
		font-size: 14px;
		color: #6e6e6e;
	}

	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}

	.uni-dialog-button-text {
		font-size: 14px;
	}

	.uni-button-color {
		color: $uni-color-primary;
	}

	.uni-dialog-input {
		flex: 1;
		font-size: 14px;
	}

	.uni-popup__success {
		color: $uni-color-success;
	}

	.uni-popup__warn {
		color: $uni-color-warning;
	}

	.uni-popup__error {
		color: $uni-color-error;
	}

	.uni-popup__info {
		color: #909399;
	}
</style>
