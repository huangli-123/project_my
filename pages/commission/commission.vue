 <template>
	<view class="one">
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-orange'" v-for="(item,index) in numList" :key="index">
					<text class="num"  :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view>
		<view class="BH5"></view>
		<view class="padding-sm">
			<view class="position">
				<view class="title"><span>*</span>联系人姓名</view>
				<view class="padding-top-xs"><input placeholder="请输入代理商名称" name="input"  v-model="agentname"></input></view>
			</view>
		
			<view class="position">
				<view class="title"><span>*</span>所属城市</view>
				<view class="padding-top-xs">
					<view class="uni-list">
						<view class="uni-list-cell">
		
							<view class="uni-list-cell-db">
								<picker  @change="bindPickerChange" :value="index" :range="array" range-key="name">
									<view class="uni-input">{{array[index].name}}</view>
									<view class="uni-input">{{array[index].city_id}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>代理商手机号</view>
				<view class="text-blue padding-top-xs"><input placeholder="请输入手机号" name="input" v-model="phonenumber"></input></view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>常用邮箱</view>
				<view class="text-blue padding-top-xs"><input placeholder="请输入邮箱" name="input" v-model="mailbox"></input></view>
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
				<view class="padding-top-xs"><input placeholder="请输入证件持有人姓名" name="input" v-model="certificate"></input></view>
			</view>
			<view class="position">
				<view class="title"><span>*</span>证件号码</view>
				<view class="padding-top-xs"><input placeholder="请输入证件号码" name="input" v-model="zjrhaoma"></input></view>
			</view>
		<view class="position">
			<view class="title"><span>*</span>证件有效期</view>
			<view class="uni-list-cell">
				<ruiDatePicker
				    fields="day"
				    start="1950-00-00"
				    end="2080-12-30"
				    :value="value5"
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
				    :value="value6"
					 @change="bindChange4"
				    @cancel="bindCancel"
				></ruiDatePicker>
			</view>
		</view>
		<view class="position">
			<view class="title"><span></span>代理商推荐码</view>
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
					    @chooseimg="handleChooseImg"
						>
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
			<view class="title"><span>*</span>银行卡照片<text class="text-gray">（请上传最新中国大陆营业执照正面照）</text></view>
			<view class="yyzz">
				<img src="../../static/images/shen.png"></img>
				<view class="page2">
				    <upload-img 
				        :width="710"
				        :height="400"
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
			<button class="cu-btn lg bg-orange" @click="next">下一步</button>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	var api = null;
	api = require("../../api.js");
	import ruiDatePicker from '../../components/rattenking-dtpicker/rattenking-dtpicker.vue'
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
				city_id:'',
				index: 0,
				key:0,
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				src:'',
				agentname:'',
				value5:'',
				value6:'',
				hyk:'',
				img2:'',
				img3:'',
				img55:'',
				phonenumber:'',
				mailbox:'',
				certificate:'',
				zjrhaoma:'',
				agenttuijianma:'',
				yhk:'',
				city_id:'',
				rules:{
				                    agentname:{
				                        rule:/\S/,
				                        msg:"联系人姓名不能为空"
				                    },
				                    phonenumber:{
				                        rule:/^[0-9a-zA-Z]{11}$/,
				                        msg:"电话号码应该为11位"
				                    },
									mailbox:{
										rule:/\S/,
										msg:"邮箱不能为空"
									},
									zjrhaoma:{
										rule:/\S/,
										msg:"证件号码不能为空"
									},
									certificate:{
										rule:/\S/,
										msg:"证件姓名不能为空"
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
			next(){
				if(!this.validate('agentname')) return;
				if(!this.validate("phonenumber"))  return;
				if(!this.validate('mailbox')) return;
				if(!this.validate('certificate')) return;
				if(!this.validate('zjrhaoma')) return;
				if(!this.validate('yhk')) return;
				if(!this.validate('img2')) return;
				if(!this.validate('img3')) return;
				if(!this.validate('img55')) return;
				
				let agentname =this.agentname;
				let	phonenumber=this.phonenumber;	
				let city =this.city_id;
				let type_zj = this.key;
				let mailbox=this.mailbox;
				let certificate=this.certificate;
				let zjrhaoma=this.zjrhaoma;
				let img2 =this.img2;
				let yhk =this.yhk;
				let img3 =this.img3;
				let img55 =this.img55;
				let zjyxq=this.value5+"至"+this.value6
				let agenttuijianma=this.agenttuijianma				

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
									  url: api + '/SupermarketApi/Newagent/apply',
									  // 仅为示例，并非真实的接口地址
									  data: {
									    user_id: user_id,
										agent_name:agentname,
										phone:phonenumber,
										city_id:city,
										holder_type:type_zj,
										email:mailbox,
										holder_name:certificate,
										ID_number:zjrhaoma,
										ID_photo1:img2,
										ID_photo2:img3,
										bank_card_number:yhk,
										bank_card:img55,
										agenttuijianma:agenttuijianma,
									  },
									  header: {
									    'content-type': 'application/x-www-form-urlencoded' // 默认值
									  
									  },
									  method: 'POST',
									
									  success(res) {
										  console.log(res)
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
					
				};
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
						console.log(this.city_id)
			        },
		bindkeyChange: function(e) {
	        console.log('picker发送选择改变，携带值为', e.target.value)
	        this.key = e.target.value
	    },
		 handleChooseImg:function(e){
		            console.log('imageSrc:',e);
					this.img2=e.src;
					let _this = this;
					let imgsArray = [];
					imgsArray[0] = e.src
					console.log(imgsArray)
					uni.previewImage({
					    current: 0,
					    urls: imgsArray
					});
		        },	
		handleChooseImg3:function(e){
				    console.log('imageSrc:',e);
					this.img3=e.src;
				        },
		handleChooseImg5:function(e){
					console.log('imageSrc:',e);
					this.img55=e.src;
						        },							
		bindChange3:function(e){
			console.log(e);
			this.value5=e
			
		},
		bindChange4:function(e){
			console.log(e);
			this.value6=e
			
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
		}
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
				img{width: 140px;height: 85px;}
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
	top: 50px;
    width: 170px;
    height: 100px;
}
.page2{
	position: absolute;
	top: 80rpx;
	left: 10px;
	width: 170px;
	height: 300px;
}

</style>
