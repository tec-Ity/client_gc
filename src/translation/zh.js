const global = {
  general: { goBack: "返回" },

  prodTable: {
    prod: "商品",
    quantity: "数量",
    prodUnitPrice: "单价",
    prodTotalPrice: "单品总价",
    totalPrice: "总价",
  },
};
const zh = {
  global: global.general,
  login: {
    login: "登录",
    register: "注册",
    orThirdParty: "或通过以下方式登录",
    firstTime: "第一次访问？",
    hasAccount: "已有账号？",
    forgetPwd: "忘记密码？",
    recieve: "获取",
    phoneAreaSel: "请选择区号",
    placeholders: {
      account: "编号/邮箱/手机号",
      pwd: "密码",
      pwdNew: "新密码",
      pwdOld: "旧密码",
      pwdConfirm: "确认密码",
      verifCode: "验证码",
    },
  },
  address: {
    shipTo: "配送至：",
    selectAddr: "请选择地址",
    enterAddr: "请输入地址",
    curLocation: "您当前的位置",
    getCurLocation: "请获取当前地址",
    locate: "定位",
    locateTooltip: "先查詢您的位置",
    savedAddr: "保存的地址",
    confirmAddr: "确认地址",
    addNewAddr: "添加新地址",
    newAddrDetails: "栋/门牌/其他信息",
  },
  cart: {
    name: "购物车",
    modal: {
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
    },
  },
  order: {
    modal: {
      emptyTitle: "暂无订单",
      emptyMsg: "现在就去商店下单吧!",
      allOrders: "全部订单",
    },
    page: {
      checkOut: "付款",
      orderInfo: "订单信息",
      orderInfo_number: "订单编号",
      orderInfo_date: "订单日期",
      shipInfo: "配送信息",
      prodInfo: "商品详情",
      shipPrice: "配送费用",
      selPayment: "选择付款方式",
      payOnline: "网上支付",
      //   payOffline: "货到付款",
    },
    table: global.prodTable,
    status: {
      canceled: "已取消",
      toPay: "去付款",
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
    selfCenter: "个人中心",
    logOut: "登出",
    modify: "更改您的",
    notYet: "暂无",
    name: "用户名",
    account: "账号",
    social: "第三方绑定",
    paymentMethod: "付款方式",
    address: "地址",
    language: "语言",
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
      discounted: "打折",
    },
  },
  prod: {
    price: "价格",
    details: "产品资料",
    suggestions: "或许兴趣",
  },
  citta: {
    ROMA: "罗马",
    MILANO: "米兰",
    MONZA: "MONZA",
  },
  components: {
    search: {
      prod: "寻找店面产品",
    },
    prod: {
      expand: "查看更多",
    },
    nav: {
      back: "返回",
    },
    alerts: {
      outOfRange: "超出配送范围",
      success: "完成",
    },
  },
};

export default zh;
