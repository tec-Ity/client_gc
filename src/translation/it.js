const global = {
  general: { goBack: "DIETRO" },

  prodTable: {
    prod: "Prodotto",
    quantity: "Quantità",
    prodUnitPrice: "Prezzo Unità",
    prodTotalPrice: "Prezzo Totale",
    totalPrice: "TOTALE",
  },
};
const it = {
  global: global.general,
  login: {
    login: "ACCEDI",
    register: "REGISTRATI",
    orThirdParty: "o accedi con",
    firstTime: "Prima volta qui?",
    hasAccount: "Hai già l’account?",
    forgetPwd: "hai dimenticato la tua password?",
    recieve: "RICEVI",
    phoneAreaSel: "Prefisso",
    placeholders: {
      account: "Code/Email/Num. di telefono",
      pwd: "Password",
      pwdNew: "新密码",
      pwdOld: "旧密码",
      pwdConfirm: "确认密码",
      verifCode: "Codice di verifica",
    },
  },
  address: {
    shipTo: "Consegna a:",
    selectAddr: "Scegli il tuo indirizzo",
    enterAddr: "Inserisci il tuo indirizzo",
    curLocation: "La tua posizione attuale",
    getCurLocation: "Ottieni la posizione attuale",
    locate: "Localizzare",
    locateTooltip: "Acquisisci la tua posizione",
    savedAddr: "I miei indirizzi salvati",
    savedAddrError: "Non ci sono indirizzi salvati.",
    confirmAddr: "CONFERMA L'INDIRIZZO",
    addNewAddr: "Inserisci il nuovo indirizzo",
    newAddrDetails: "Scala/Porta/Indicazione ecc...",
  },
  cart: {
    title: "CARRELLO",
    modal: {
      emptyTitle: "CARRELLO VUOTO",
      emptyMsg: "Vai nei negozi a riempire i tuoi carrelli ora!",
      order: "ORDINARE",
    },
    page: {
      shipInfo: "DETTAGLIO CONSEGNA",
      modify: "MODIFICA",
      prodInfo: "DETTAGLIO SPESA",
      shipPrice: "SPESA CONSEGNA",
      confirm: "CONFERMA",
      continueShopping: "NON ADESSO, CONTINUA LO SHOPPING",
    },
    table: global.prodTable,
    alert: {
      title: "INFO INCOMPLETE",
      message: "Si prega di inserire le informazioni di consegna complete!",
    },
  },
  order: {
    modal: {
      emptyTitle: "ORDINE VUOTO",
      emptyMsg: "现在就去商店下单吧!",
      allOrders: "Tutti gli ordini",
      fillOrder: "Vai nei negozi a completare un ordine ora!",
    },
    page: {
      checkOut: "CASSA",
      orderInfo: "DETTAGLIO ORDINE",
      orderInfo_number: "NUMERO D’ORDINE",
      orderInfo_date: "DATA",
      shipInfo: "DETTAGLIO CONSEGNA",
      prodInfo: "DETTAGLIO SPESA",
      shipPrice: "SPESA CONSEGNA",
      selPayment: "SCEGLI IL METODO DI PAGAMENTO",
      payOnline: "PAGA ONLINE",
      //   payOffline: "PAGA ALLA CONSEGNA",
    },
    table: global.prodTable,
    status: {
      canceled: "CANCELLATO",
      toPay: "DA PAGARE",
      inProgress: "IN PROCESSO",
      reciving: "In Ricezione",
      preparing: "In Preparazione",
      delivering: "In Consegna",
      completed: "COMPLETO",
    },
    alert: {
      title: "L'ordine è scaduto",
      message: "L'ordine è stato automaticamente annullato, si prega di riordinare",
    },
  },
  selfCenter: {
    selfCenter: "Profilo",
    logOut: "Esci",
    modify: "Modifica",
    notYet: "Non c'è",
    name: "Nome",
    account: "Account",
    social: "Social",
    paymentMethod: "Metodo di pagamento",
    address: "Indirizzi",
    language: "Lingue",
  },
  home: {
    welcome: "Bevenuti！",
    locals: "I nostri locali",
    slogan: {
      black: "Spesa mondiale consegnata ",
      white: "a casa tua.",
    },
    adress: {
      tooltip: "Inserisci il tuo indirizzo per raggiungere i negozi:",
      finder: "Usa indirizzo attuale",
    },
  },
  shop: {
    banner: {
      0: "consegna a casa",
      1: "paga alla consegna",
      2: "prime",
    },
    sidebar: {
      discounted: "Scontati",
    },
  },
  prod: {
    price: "prezzo",
    details: "Caratteristiche del prodotto",
    suggestions: "Ti potrebbe interessare",
  },
  citta: {
    PRATO: "PRATO",
    FIRENZE: "FIRENZE",
    ROMA: "ROMA",
    MILANO: "MILANO",
    MONZA: "MONZA",
    AGRIGENTO: "AGRIGENTO",
    ALESSANDRIA: "ALESSANDRIA",
    ANCONA: "ANCONA",
    AOSTA: "AOSTA",
    "ASCOLI PICENO": "ASCOLI PICENO",
    "L'AQUILA": "L'AQUILA",
  },
  components: {
    search: {
      prod: "Cerca prodotti nel negozio",
    },
    prod: {
      expand: "Vedi di più",
    },
    nav: {
      back: "Indietro",
    },
    alerts: {
      outOfRange: "Fuori dall'area di servizio",
      success: "Ok",
    },
  },
};

export default it;
