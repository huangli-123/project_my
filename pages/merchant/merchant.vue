<template>
	<view class="one">
		<view class="bg-white padding">
			<view style="text-align: center; color: #000000; font-size: 17px;font-weight: 800;">商户申请</view>
		</view>
		<form  @submit="formSubmit">
		<view class="BH5"></view>
		<view class="padding-sm">
			<view class="position">
				<view class="title"><span>*</span>联系人姓名</view>
				<view class="padding-top-xs"><input placeholder="请输入联系人姓名" name="input" v-model="surname"></input></view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>所属城市</view>
				<view class="padding-top-xs">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
									<view class="uni-input">{{array[index].name}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>手机号码</view>
				<view class="text-blue padding-top-xs"><input placeholder="请输入手机号" name="input" v-model="hm"></input></view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>常用邮箱</view>
				<view class="text-blue padding-top-xs"><input placeholder="请输入邮箱" name="input" v-model="yx"></input></view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>商户简称</view>
				<view class="padding-top-xs"><input placeholder="请输入商户简称" name="input" v-model="jc"></input></view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>经营类目</view>
				<view class="padding-top-xs">
					<!-- <view class="content">
						<foodType ref='foodTypeChild'></foodType>
					</view> -->
					<addressd @changes="childClick" :value="addressd"></addressd>
				</view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>营业执照注册号</view>
				<view class="padding-top-xs"><input placeholder="请输入注册号" name="input" v-model="zch"></input></view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>营业期限</view>
				<view class="uni-list-cell">
					<ruiDatePicker
					    fields="day"
                        start="1950-00-00"
					    end="2080-12-30"
					    :value="value"
					    @change="bindChange"
					    @cancel="bindCancel"
					></ruiDatePicker>
				</view>
				<text>至</text>
				<view class="uni-list-cell">
					<ruiDatePicker
					    fields="day"
                        start="1950-00-00"
					    end="2080-12-30"
					    :value="value2"
					    @change="bindChange2"
					    @cancel="bindCancel"
					></ruiDatePicker>
				</view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>证件持有人类型</view>
				<view class="padding-top-xs">
					<view class="uni-list">
						<view class="uni-list-cell">
						
							<view class="uni-list-cell-db">
								<picker @change="bindkeyChange" :value="key" :range="array1" range-key="name">
									<view class="uni-input">{{array1[key].name}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="position">
				<view class="title"><span>*</span>证件持有人姓名</view>
				<view class="padding-top-xs"><input placeholder="请输入证件持有人姓名" name="input" v-model="zjxm"></input></view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>证件号码</view>
				<view class="padding-top-xs"><input placeholder="请输入证件号码" type="idcard" name="input" v-model="zjhm"></input></view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>证件有效期</view>
				<view class="uni-list-cell">
					<ruiDatePicker
					    fields="day"
					    start="1950-00-00"
					    end="2080-12-30"
					    :value="value3"
					    @change="bindChange3"
						@cancel="bindCancel"
					></ruiDatePicker>
				</view>
				<text>至</text>
				<view class="uni-list-cell">
					<ruiDatePicker
					    fields="day"
					    start="1950-00-00"
					    end="2080-12-30"
					    :value="value4"
						 @change="bindChange4"
					    @cancel="bindCancel"
					></ruiDatePicker>
				</view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>代理商推荐码</view>
				<view class="padding-top-xs"><input placeholder="请输入代理商推荐码" name="input" v-model="agenttuijianma"></input></view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>银行卡号</view>
				<view class="padding-top-xs"><input placeholder="请输入银行卡号" name="input" v-model="yhk"></input></view>
			</view>
		</view>
		<view class="BH5"></view>
		<view class="bian ">
			<view class="title"><span>*</span>身份证<text class="text-gray">（请上传经营者身份证照片）</text></view>
			<view class="shangc">
				<view class="sc-l">
					<view class="sc-l-img"><img src="../../static/images/shen.png"></img></view><br/>
					身份证正面
					<view class="page">
					<upload-img
					    :width="340"
					    :height="216"
						:value="img2"
					    bgsrc="../../static/temp/bg.png"
					    @chooseimg="handleChooseImg">
					    </upload-img>
					</view>
				</view>
				<view class="sc-l">
					<view class="sc-l-img"><img src="../../static/images/shen.png"></img></view><br/>
					身份证反面	
					<view class="page">
					    <upload-img 
					        :width="340"
					        :height="216"
					        bgsrc="../../static/temp/bg.png"
					        @chooseimg="handleChooseImg3"
							:value="img3"
							>
					    </upload-img>
					</view>
				</view>
				
			</view>
		</view>
		<view class="bian ">
			<view class="title"><span>*</span>营业执照<text class="text-gray">（请上传最新中国大陆营业执照正面照）</text></view>
			<view class="yyzz">
				<img src="../../static/images/shen.png"></img>
				<view class="page2">
				    <upload-img 
				        :width="710"
				        :height="266"
						:value="img4"
				        bgsrc="../../static/temp/bg.png"
				        @chooseimg="handleChooseImg4"
						>
				    </upload-img>
				</view>
			</view>
		</view>
		<view class="bian ">
			<view class="title"><span>*</span>银行卡照片<text class="text-gray">（请上传最新中国大陆营业执照正面照）</text></view>
			<view class="yyzz">
				<img src="../../static/images/shen.png"></img>
				<view class="page3">
				    <upload-img 
				        :width="710"
				        :height="266"
						:value="img55"
				        bgsrc="../../static/temp/bg.png"
				        @chooseimg="handleChooseImg5"
						>
				    </upload-img>
				</view>
			</view>
		</view>
		<view class="H50"></view>
		<view class="btn flex flex-direction">
			<button class="cu-btn lg bg-orange" @click="next" >完成</button>
		</view>
		</form>
	</view>

</template>

<script>
	const app = getApp();
	var api = null;
	api = require("../../api.js");
	import ruiDatePicker from '../../components/rattenking-dtpicker/rattenking-dtpicker.vue';
	import addressd from '../../components/jm-address/jm-address.vue'
	import uploadImg from '../../components/amazarashi-uploadimg/uploadImg.vue'
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				numList: [{
					name: '提交资质'
				}, {
					name: '选择入驻方式'
				}, {
					name: '等待审核'
				},  ],
				num: 0,
				title: 'picker',
				array: [{name:'无锡'},{name: '扬州'}, {name:'苏州'}, {name:'南京'}],
				array1: [{name:'法人'},{name: '自然人'}, {name:'经办人'}, {name:'其他经济组织'}],
				index: 0,
				key:0,
				date:"",
				src:'',
				focus: false,
				inputValue: '',
				changeValue: '',
				// title: '中国菜',
				// classMax: '粤菜',
				// classMin: '港式茶餐厅',
				hm:'',
				surname:'',
				yx:'',
				jc:'',
				zch:'',
				zjxm:'',
				zjhm:'',
				jylm:'',
				addressd:[],
				value:'',
				value2:'',
				value3:'',
				value4:'',
				img2:'',
				img3:'',
				img4:'',
				yhk:'',
				img55:'',
				agenttuijianma:'',
				city_id:'',
				rules:{
				                    surname:{
				                        rule:/\S/,
				                        msg:"联系人不能为空"
				                    },
				                    hm:{
				                        rule:/^[0-9a-zA-Z]{11}$/,
				                        msg:"电话号码应该为11位"
				                    },
									yx:{
										rule:/\S/,
										msg:"邮箱不能为空"
									},
									jc:{
										rule:/\S/,
										msg:"商户简称不能为空"
									},
									zjhm:{
										rule:/\S/,
										msg:"证件号码不能为空"
									},
									zjxm:{
										rule:/\S/,
										msg:"证件持有人姓名不能为空"
									},
									yhk:{
										rule:/\S/,
										msg:"银行卡号不能为空"
									},
									img2:{
										rule:/\S/,
										msg:"身份证正面不能为空"
									},
									img3:{
										rule:/\S/,
										msg:"身份证反面不能为空"
									},
									img55:{
										rule:/\S/,
										msg:"银行卡照片不能为空"
									},
				                }
			};
		},
		components:{
		        uploadImg,
				addressd,
				ruiDatePicker,
		    },
			/**
			 * 生命周期函数--监听页面显示
			 */
			onShow: function () {
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
			  
			      var detailData = res.data;
			      console.log('res3');
				  console.log(res);
				  console.log('res3');
			      that.setData({
			  	  array:res.data
			  
			      }); 
			  
			    }
			  
			  });
			},
			/**
			 * 生命周期函数--监听页面卸载
			 */
			onLoad: function (options) {
			
			},
			
		
		methods:{
			next(res){
				
				if(!this.validate('surname')) return;
				if(!this.validate('hm')) return;
				if(!this.validate("yx"))  return;
				if(!this.validate("jc"))  return;
				if(!this.validate('zjxm')) return;
				if(!this.validate('zjhm')) return;
				if(!this.validate('yhk')) return;
				if(!this.validate('img2')) return;
				if(!this.validate('img3')) return;
				if(!this.validate('img55')) return;
				let surname =this.surname;
				let number =this.hm;
				let city =this.city_id;
				let type_zj = this.key;
				let postbox = this.yx;
				let abbreviation=this.jc;
				let registration_number=this.zch;
				let papers=this.zjxm;
				let Credentia=this.zjhm;
				let addressd =this.addressd;
				let img2=this.img2;
				let yhk = this.yhk;
				let img3=this.img3;
				let img4=this.img4;
				let img55 =this.img55;
				let valueqx=this.value+"至"+this.value2;
				let valueyxq=this.value3+"至"+this.value4;
				let agenttuijianma=this.agenttuijianma;
				console.log(city);
				console.log(img2,img3,img4);
				try {
				    const token = uni.getStorageSync('token');
				    if (token) {
						uni.request({
						    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
						    data: {
						        token: token,
						    },
							method:'GET',
						    header: {
						        'custom-header': "hello", //自定义请求头信息
						    },
						    success: (res) => {
								
								if(res.data.status==200){
									var user_id = res.data.token.user;
									uni.request({
									  url: api + '/SupermarketApi/Agent/apply',
									  // 仅为示例，并非真实的接口地址
									  data: {
									    user_id: user_id,
										agent_name:surname,
										phone:number,
										city_id:city,
										holder_type:type_zj,
										email:postbox,
										merchant:abbreviation,
										registration_number:registration_number,
										holder_name:papers,
										ID_number:Credentia,
										// addressd:addressd,
										ID_photo1:img2,
										ID_photo2:img3,
										credit:img55,
										license:img4,
										agenttuijianma:agenttuijianma,
										credit_num:yhk,
										
									  },
									  header: {
									    'content-type': 'application/x-www-form-urlencoded' // 默认值
									  
									  },
									  method: 'POST',
									
									  success(res) {
									    if(res.data.code ==2){
									    	uni.showToast({
									    	  title: res.data.msg,
									    	  icon: 'none',
									    	  duration: 2000,
									    	});	
									    }else if(res.data.code==1){
									    	uni.switchTab({
									    		url: '/pages/my/my',
									    	    success: res => {console.log(res)},
									    	    fail: (res) => {console.log(res)},
									    	    complete: (res) => {console.log(res)}
									    	}); 
									    	uni.showToast({
									    	  title: res.data.msg,
									    	  icon: 'none',
									    	  duration: 2000,
									    	});	
									    	
									    }
									  }
									
									});					  
								}else{
										uni.navigateTo({
											url: '/pages/record/record',
										    success: res => {console.log('res')},
										    fail: () => {console.log('res2')},
										    complete: () => {console.log('res3')}
										});
									}
						    }
						});
				    }else{
						uni.navigateTo({
							url: '/pages/record/record',
						    success: res => {console.log('res')},
						    fail: () => {console.log('res2')},
						    complete: () => {console.log('res3')}
						});
					}
				} catch (e) {
				    // error
					
				}
			},

		bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value
						let citya = this.array;
						for (var i=0;i<citya.length; i++)
						{ 
						   if(i== this.index){
							   this.setData({
							   city_id:citya[i]['city_id']
							   			  
							   }); 
							   // this.city_id = citya[i]['city_id'];
							   break;
						   }
						}
			        },
		bindkeyChange: function(e) {
	        console.log('picker发送选择改变，携带值为', e.target.value)
	        this.key = e.target.value
	    },
	
		handleChooseImg:function(e){
		            console.log('imageSrc:',e);
					this.img2=e.src;
														var images = [];
														images.push(e.src);
														console.log(images)  // ["http://192.168.100.251:8970/6_1597822634094.png"]
														uni.previewImage({ // 预览图片  图片路径必须是一个数组 => ["http://192.168.100.251:8970/6_1597822634094.png"]
														    current:0,
														    urls:images,
														    longPressActions: {  //长按保存图片到相册
														        itemList: ['保存图片'],
														        success: (data)=> {
														            console.log(data);
														            uni.saveImageToPhotosAlbum({ //保存图片到相册
														                filePath: payUrl,
														                success: function () {
														                    uni.showToast({icon:'success',title:'保存成功'})
														                },
														                fail: (err) => {
														                    uni.showToast({icon:'none',title:'保存失败，请重新尝试'})
														                }
														            });
														        },
														        fail: (err)=> {
														            console.log(err.errMsg);
														        }
														}
														});
		        },	
		handleChooseImg3:function(e){
				    console.log('imageSrc:',e);
					this.img3=e.src;
				        },	
	    handleChooseImg4:function(e){
					console.log('imageSrc:',e);
					this.img4=e.src;
						        },
		handleChooseImg5:function(e){
					console.log('imageSrc:',e);
					this.img55=e.src;
						        },							
		childClick:function(res) {
				    console.log(res);
					this.addressd =res.city+" "+res.district+" "+res.province;
				        },
		bindChange:function(e){
			console.log(e);
			this.value=e
			
		},
		bindChange2:function(e){
			console.log(e);
			this.value2=e
			
		},
		bindChange3:function(e){
			console.log(e);
			this.value3=e
			
		},
		bindChange4:function(e){
			console.log(e);
			this.value4=e
			
		},
		bindCancel:function(e){
			
		},
		submit:function(e){
			
		},
		formSubmit:function(e){
			
		},
		validate(key){
		                let bool=true;
		                if(!this.rules[key].rule.test(this[key])){
		                    //提示信息
		                    uni.showToast({
		                        title:this.rules[key].msg,
								icon: 'none',
								duration: 2000,
		                    })
		                    //取反
		                    bool=false;
		                    return false;
		                }
		                return bool;
		            },
		},

	}
</script>

<style lang="scss">
.one{
	.BH5{background-color: #F3F5F4;height: 4px;}
	.title{padding: 5px 0 15px;font-weight: 600;
		span{color: #E74949;padding-right: 5px;}
	}
	.position{display: flex;justify-content: space-between;padding: 5px 0 0;
		input{text-align: right;}
	}
	.bian{border-bottom: 1px solid #F7F7F7;padding: 10px 10px 20px;position: relative;}
	.shangc{display: flex;justify-content: space-between;
		.sc-l{width: 48%;text-align: center;color: #A1A1A1;
			.sc-l-img{background-color: #F7F7F7;padding: 10px 0;
				img{width: 100%;height: 85px;}
			}
		}
	}
	.yyzz{background-color: #F7F7F7;padding: 15px;text-align: center;
		img{width: 160px;height: 100px;}
	}
	.H50{height: 50px;}
	.btn{position: fixed;bottom: 0; left:0;padding: 10px;width: 100%;background-color: #fff;z-index: 9;}
}

.page{
	position: absolute;
	top: 100rpx;
    width: 170px;
    height: 100px;
}

.page2{
	position: absolute;
	top: 100rpx;
	left: 10px;
	width: 170px;
	height: 100px;
}
.page3{
	position: absolute;
	top: 140rpx;
	left: 10px;
	width: 170px;
	height: 100px;
}
</style>
