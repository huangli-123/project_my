
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/nearbLeaders/nearbLeaders","pages/city/city","pages/record/record","pages/register/register","pages/record/record","pages/forget/forget","pages/livetelecast/livetelecast","pages/fenlei/fenlei","pages/shoppingCar/shoppingCar","pages/my/my","pages/spike/spike","pages/search/search","pages/goodsList/goodsList","pages/goodDetail/goodDetail","pages/order/order","pages/confirmOrder/confirmOrder","pages/orderDetail/orderDetail","pages/refund/refund","pages/evaluationList/evaluationList","pages/writingEvaluation/writingEvaluation","pages/bind/mobilPhone/mobilPhone","pages/bind/vipReg/vipReg","pages/bind/verificationCode/verificationCode","pages/addressList/addressList","pages/addAddress/addAddress","pages/store/index/index","pages/demo/demo","pages/personal/personal","pages/record/record","pages/register/register","pages/forget/forget","pages/commission/commission","pages/commission/two","pages/commission/two2","pages/commission/three","pages/merchant/merchant","pages/about/ys","pages/about/zc","pages/withdrawal/withdrawal","pages/withdrawal/withdrawal2","pages/bindPayment/bindAlipay","pages/commission/four","pages/commission/five","pages/about/about"],"window":{"backgroundTextStyle":"dark","navigationBarBackgroundColor":"#fff","navigationBarTitleText":"家步31","navigationBarTextStyle":"black"},"tabBar":{"color":"#a9b7b7","selectedColor":"#1de7b5","borderStyle":"black","list":[{"pagePath":"pages/index/index","text":"家步","iconPath":"/static/images/footer/ccv1.png","selectedIconPath":"/static/images/footer/ccv.png"},{"pagePath":"pages/fenlei/fenlei","text":"探物","iconPath":"/static/images/footer/tw.png","selectedIconPath":"/static/images/footer/tw1.png"},{"pagePath":"pages/shoppingCar/shoppingCar","text":"购物篮","iconPath":"/static/images/footer/clz.png","selectedIconPath":"/static/images/footer/clz1.png"},{"pagePath":"pages/my/my","text":"福地","iconPath":"/static/images/footer/garde1.png","selectedIconPath":"/static/images/footer/garde.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"家步三一","compilerVersion":"3.2.12","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true}},{"path":"/pages/nearbLeaders/nearbLeaders","meta":{},"window":{"navigationBarTitleText":"附近服务天使"}},{"path":"/pages/city/city","meta":{},"window":{}},{"path":"/pages/record/record","meta":{},"window":{}},{"path":"/pages/register/register","meta":{},"window":{}},{"path":"/pages/forget/forget","meta":{},"window":{}},{"path":"/pages/livetelecast/livetelecast","meta":{},"window":{}},{"path":"/pages/fenlei/fenlei","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类"}},{"path":"/pages/shoppingCar/shoppingCar","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/spike/spike","meta":{},"window":{"navigationBarTitleText":"限时秒杀"}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"搜索","enablePullDownRefresh":true}},{"path":"/pages/goodsList/goodsList","meta":{},"window":{"navigationBarTitleText":"商品列表"}},{"path":"/pages/goodDetail/goodDetail","meta":{},"window":{"navigationBarTitleText":"商品详情"}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"我的订单"}},{"path":"/pages/confirmOrder/confirmOrder","meta":{},"window":{"navigationBarTitleText":"确认订单"}},{"path":"/pages/orderDetail/orderDetail","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/refund/refund","meta":{},"window":{"navigationBarBackgroundColor":"#f5f5f5","navigationBarTitleText":"申请退款"}},{"path":"/pages/evaluationList/evaluationList","meta":{},"window":{"navigationBarTitleText":"商品评价"}},{"path":"/pages/writingEvaluation/writingEvaluation","meta":{},"window":{"navigationBarTitleText":"发表评价","navigationBarBackgroundColor":"#f5f5f5"}},{"path":"/pages/bind/mobilPhone/mobilPhone","meta":{},"window":{"navigationBarTitleText":"绑定手机号"}},{"path":"/pages/bind/vipReg/vipReg","meta":{},"window":{"navigationBarTitleText":"会员注册","navigationBarBackgroundColor":"#ff0000","navigationBarTextStyle":"white"}},{"path":"/pages/bind/verificationCode/verificationCode","meta":{},"window":{"navigationBarTitleText":"绑定手机号"}},{"path":"/pages/addressList/addressList","meta":{},"window":{"navigationBarTitleText":"我的服务地址"}},{"path":"/pages/addAddress/addAddress","meta":{},"window":{"navigationBarTitleText":"编辑地址"}},{"path":"/pages/store/index/index","meta":{},"window":{"navigationBarTitleText":"店铺"}},{"path":"/pages/demo/demo","meta":{},"window":{}},{"path":"/pages/personal/personal","meta":{},"window":{}},{"path":"/pages/commission/commission","meta":{},"window":{}},{"path":"/pages/commission/two","meta":{},"window":{}},{"path":"/pages/commission/two2","meta":{},"window":{}},{"path":"/pages/commission/three","meta":{},"window":{}},{"path":"/pages/merchant/merchant","meta":{},"window":{}},{"path":"/pages/about/ys","meta":{},"window":{}},{"path":"/pages/about/zc","meta":{},"window":{}},{"path":"/pages/withdrawal/withdrawal","meta":{},"window":{"navigationBarTitleText":"推荐代理商提现","navigationBarBackgroundColor":"#f5f5f5"}},{"path":"/pages/withdrawal/withdrawal2","meta":{},"window":{"navigationBarTitleText":"商品订单提现","navigationBarBackgroundColor":"#f5f5f5"}},{"path":"/pages/bindPayment/bindAlipay","meta":{},"window":{}},{"path":"/pages/commission/four","meta":{},"window":{"navigationBarTitleText":"霞光家政","bounce":"none","titleNView":{"buttons":[{"type":"close","text":"返回主页","float":"right"}]}}},{"path":"/pages/commission/five","meta":{},"window":{"navigationBarTitleText":"言行教育","bounce":"none","titleNView":{"buttons":[{"type":"close","text":"返回主页","float":"right"}]}}},{"path":"/pages/about/about","meta":{},"window":{"navigationBarBackgroundColor":"#ffffff","navigationBarTitleText":"关于我们","navigationBarTextStyle":"black"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});