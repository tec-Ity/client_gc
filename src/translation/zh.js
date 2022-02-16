const global = {
  general: { goBack: "返回" },
  button: {
    expand: "查看更多",
    proceed: "继续",
    confirm: "确认",
    delete: "删除",
    modify: "更改",
    logout: "退出",
    checkout: "付单",
  },
  payment: {
    payMethod: "选择付款方式",
    payMethod_online: "网上支付",
    payMethod_offline: "货到付款",
    payMethod_selected: "付款方式",
    priceShipping: "配送费用",
    priceTot: "总价",
  },
  prodTable: {
    prod: "商品",
    quantity: "数量",
    prodUnitPrice: "单价",
    prodTotalPrice: "单品总价",
    totalPrice: "总价",
  },
};
const zh = {
  global: global,
  login: {
    login: "登录",
    register: "注册",
    orThirdParty: "或通过以下方式登录",
    firstTime: "第一次访问？",
    hasAccount: "已有账号？",
    forgetPwd: "忘记密码？",
    receive: "获取",
    timer: "秒",
    phoneAreaSel: "请选择区号",
    placeholders: {
      account: "账号/邮箱/手机号",
      region: "--请选择区号--",
      pwd: "密码",
      pwdNew: "新密码",
      pwdOld: "旧密码",
      pwdConfirm: "确认密码",
      verifCode: "验证码",
    },
    alert: {
      wrongCred: "用户名或密码错误",
    },
  },
  address: {
    shipTo: "配送至：",
    selectAddr: "请选择地址",
    enterAddr: "请输入地址",
    curLocation: "当前定位",
    getCurLocation: "请获取当前地址",
    locate: "定位",
    locateTooltip: "请定位",
    savedAddr: "保存的地址",
    confirmAddr: "确认地址",
    addNewAddr: "添加新地址",
    newAddrDetails: "栋/门牌/其他信息",
    modal: {
      placeholder: {
        recipient: "收件人姓名",
        recipientPhone: "电话号码",
      },
    },
  },
  cart: {
    name: "购物车",
    modal: {
      shopLabel: "店铺： ",
      emptyTitle: "空购物车",
      emptyMsg: "现在就去商店把你的购物车装满吧!",
      order: "下单",
    },
    page: {
      shipInfo: "配送信息",
      modify: "更改",
      prodInfo: "商品详情",
      shipPrice: "配送费用",
      confirm: "确认下单",
      continueShopping: "继续购物",
    },
    table: global.prodTable,
    alert: {
      title: "信息不完整",
      message: "请输入完整的送货信息!",
      recipient: "请选择收货人姓名",
      number: "请选择收货人电话",
    },
  },
  order: {
    modal: {
      emptyTitle: "暂无订单",
      emptyMsg: "现在就去商店下单吧!",
      orderOpen: "查看订单",
      allOrders: "全部订单",
      fillOrder: "请先订下一个订单!",
    },
    page: {
      checkOut: "付款",
      orderInfo: "订单信息",
      orderInfo_number: "订单编号",
      orderInfo_date: "订单日期",
      shipInfo: "配送信息",
      prodInfo: "商品详情",
      shipPrice: global.payment.priceShipping,
      selPayment: global.payment.payMethod,
      payOnline: global.payment.payMethod_online,
      payOffline: global.payment.payMethod_offline,
      labelShop: "店面",
      shipDetail:
        "绿城运费通知：运费8€ 凡购物满50欧3公里内免运费，满100欧6公里内免运费大袋米跟水不计算在免运份额内，下单后3-4小时送到。蔬菜、肉类、部分水果、海鲜等商品价格因无法准确重量，所以价格会稍有浮动最终价格以收据小票的价格为准，祝大家购物愉快",
    },
    table: global.prodTable,
    status: {
      canceled: "已取消",
      toPay: "等待付款",
      inProgress: "进行中",
      reciving: "接单中",
      preparing: "备货中",
      delivering: "配送中",
      completed: "已完成",
    },
    alert: {
      title: "订单已超时",
      message: "此订单已自动变为取消订单，请重新下单",
    },
  },
  selfCenter: {
    welcome: "欢迎! ",
    selfCenter: "个人中心",
    logOut: "登出",
    modify: "更改您的",
    notYet: "暂无",
    name: "用户名",
    account: "账号",
    social: "第三方绑定",
    paymentMethod: "付款方式",
    password: "密码",
    address: "地址",
    defaultAddressLabel: "默认",
    language: "语言",
    userCenter: "用户中心",
    placeholders: {
      name: "添加名字",
      social: "暂无第三方登录",
      paymentMethod: "暂无支付方式",
      address: "暂无地址",
    },
  },
  home: {
    welcome: "欢迎！",
    locals: "我们在哪",
    slogan: {
      black: "国际好物\n配送",
      white: "到家",
    },
    adress: {
      tooltip: "请输入您的地址寻找店面:",
      placeholder: "您地址在哪？",
      finder: "使用当前地址",
    },
  },
  shop: {
    banner: {
      0: "送到家",
      1: "货到付款",
      2: "会员",
    },
    sidebar: {
      discounted: "折扣商品",
    },
  },
  prod: {
    price: "价格",
    details: "商品详情",
    suggestions: "可能感兴趣的商品",
  },
  citta: {
    ROMA: "罗马",
    MILANO: "米兰",
    MONZA: "MONZA",
  },
  components: {
    search: {
      prod: "搜索店内商品",
    },
    button: {
      expand: "查看更多",
      proceed: "继续",
      modify: "更改",
      logout: "退出",
    },
    nav: {
      back: "返回",
      backShop: "继续购买",
    },
    alerts: {
      outOfRange: "超出配送范围",
      success: "完成",
    },
    language: "语言",
    placeholders: {
      nameInput: "添加名字",
    },
  },
};

export default zh;
