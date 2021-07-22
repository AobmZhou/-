import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const state = {
  equid: "",  //设备id
  etype: "",
  equName: "",  //设备名称
  nodeData: {}, //设备测点UUID对应的测点信息info
  nodeNum: 0, //设备测点info信息个数
  equipmentDetail: {},  //设备测点UUID对应的测点详细信息detail
  detailNum: 0, //设备测点detail信息个数
  //图谱曲线颜色信息
  colorMap: [
    "#00FF00",
    "#EF9A9A",
    "#D81B60",
    "#CE93D8",
    "#B39DDB",
    "#9FA8DA",
    "#90CAF9",
    "#81D4FA",
    "#80DEEA",
    "#80CBC4",
    "#A5D6A7",
    "#C5E1A5",
    "#E6EE9C",
    "#FFF59D",
    "#FFE082",
    "#FFCC80",
    "#FFAB91",
    "#BCAAA4",
    "#EEEEEE",
    "#B0BEC5",
    "#689F38",
    "#0097A7",
    "#8E24AA",
    "#E91E63"
  ],
  // 测点特征值信息
  textMap: [
    "通频",
    "1倍频幅值",
    "2倍频幅值",
    "3倍频幅值",
    "1/2倍频幅值",
    "残振",
    "直流量",
    "间隙电压",
    "1倍频相位",
    "2倍频相位",
    "3倍频相位",
    "1/2倍频相位",
  ],
  showOp: true,
  backMap: [
    'all',
    'one',
    'two',
    'three',
    'half',
    'res',
    'dc',
    'gap',
    'phaseOne',
    'phaseTwo',
    'phaseThree',
    'phaseHalf'
  ],
  //测点type对应特征值list
  features:
    {
      88: [
        {id: 0, label: "峰值", unit: "m/s2"},
        {id: 1, label: "峭度", unit: ""},
        {id: 2, label: "歪度", unit: ""},
      ],
      99: [
        {id: 1, label: "压力", unit: ""},
        {id: 2, label: "温度", unit: ""},
        {id: 3, label: "流量", unit: ""},
        {id: 4, label: "其他", unit: ""},
        {id: 5, label: "撞击", unit: ""},

      ],
      100: [
        {id: 0, label: "峰值", unit: "m/s2"},
        {id: 1, label: "峭度", unit: ""},
        {id: 2, label: "歪度", unit: ""},
      ],
      101: [
        {id: 0, label: "有效值", unit: "mm/s"},
        {id: 1, label: "峭度", unit: ""},
        {id: 2, label: "歪度", unit: ""},
      ],
      111: [
        {id: 0, label: "平均压力", unit: "KPa"},
        {id: 1, label: "机械效率", unit: "%"},
        {id: 2, label: "吸气容积效率", unit: "%"},
        {id: 3, label: "排气容积效率", unit: "%"},
        {id: 4, label: "单缸指示功率", unit: "KW"},
        {id: 5, label: "压缩指数", unit: ""},
        {id: 6, label: "膨胀系数", unit: ""},
        {id: 7, label: "实际压力比", unit: ""},
        {id: 8, label: "峭度", unit: ""},
        {id: 9, label: "歪度", unit: ""}
      ],
      112: [
        {id: 0, label: "沉降量/偏摆量", unit: "um"},
        {id: 1, label: "峰-峰值", unit: "um"},
        {id: 2, label: "峰值", unit: "um"},
        {id: 3, label: "活塞-气缸剩余间隙", unit: "um"},
        {id: 4, label: "一倍频幅值", unit: "um"},
        {id: 5, label: "二倍频幅值", unit: "um"},
      ],
      113: [
        {id: 0, label: "加速度峰值", unit: "mm/s2"},
        {id: 1, label: "加速度高频", unit: "mm/s2"},
        {id: 2, label: "加速度低频", unit: "mm/s2"},
        {id: 3, label: "加速度波形峭度", unit: ""},
        {id: 4, label: "速度有效值", unit: "mm/s"},
        {id: 5, label: "通频gIE值", unit: "gIE"},
      ],
      114: [
        {id: 0, label: "通频有效值", unit: "mm/s"},
        {id: 1, label: "1倍频幅有效值", unit: "mm/s"},
        {id: 2, label: "2倍频有效值", unit: "mm/s"},
        {id: 3, label: "3倍频有效值", unit: "mm/s"},
        {id: 4, label: "1/2倍频有效值", unit: "mm/s"},
        {id: 5, label: "残振有效值", unit: "mm/s"},
      ],
      116: [
        {id: 0, label: "无线振动速度有效值", unit: "mm/s"},
      ],
      117: [
        {id: 0, label: "无线振动位移峰值", unit: "m/s2"},
      ],
      118: [
        {id: 0, label: "无线振动加速度有效峰值", unit: "m/s2"},
      ],
      119: [
        {id: 0, label: "通频", unit: "um"},
        {id: 1, label: "1倍频幅值", unit: "um"},
        {id: 2, label: "2倍频幅值", unit: "um"},
        {id: 3, label: "3倍频幅值", unit: "um"},
        {id: 4, label: "1/2倍频幅值", unit: "um"},
        {id: 5, label: "残振", unit: "um"},
        {id: 6, label: "直流量", unit: "V"},
        {id: 7, label: "间隙电压", unit: "V"},
        {id: 8, label: "1倍频相位", unit: "°"},
        {id: 9, label: "2倍频相位", unit: "°"},
        {id: 10, label: "3倍频相位", unit: "°"},
        {id: 11, label: "1/2倍频相位", unit: "°"}
      ],
      120: [
        {id: 0, label: "通频", unit: "mm/s"},
        {id: 1, label: "1倍频幅值", unit: "mm/s"},
        {id: 2, label: "2倍频幅值", unit: "mm/s"},
        {id: 3, label: "3倍频幅值", unit: "mm/s"},
        {id: 4, label: "1/2倍频幅值", unit: "mm/s"},
        {id: 5, label: "残振", unit: "mm/s"},
        {id: 6, label: "直流量", unit: "V"},
        {id: 7, label: "间隙电压", unit: "V"},
        {id: 8, label: "1倍频相位", unit: "°"},
        {id: 9, label: "2倍频相位", unit: "°"},
        {id: 10, label: "3倍频相位", unit: "°"},
        {id: 11, label: "1/2倍频相位", unit: "°"}
      ],
      121: [
        {id: 0, label: "通频", unit: "m/s2"},
        {id: 1, label: "1倍频幅值", unit: "m/s2"},
        {id: 2, label: "2倍频幅值", unit: "m/s2"},
        {id: 3, label: "3倍频幅值", unit: "m/s2"},
        {id: 4, label: "1/2倍频幅值", unit: "m/s2"},
        {id: 5, label: "残振", unit: "m/s2"},
        {id: 6, label: "直流量", unit: "V"},
        {id: 7, label: "间隙电压", unit: "V"},
        {id: 8, label: "1倍频相位", unit: "°"},
        {id: 9, label: "2倍频相位", unit: "°"},
        {id: 10, label: "3倍频相位", unit: "°"},
        {id: 11, label: "1/2倍频相位", unit: "°"}
      ],
      122: [
        {id: 0, label: "通频", unit: "um"},
        {id: 1, label: "1倍频幅值", unit: "um"},
        {id: 2, label: "2倍频幅值", unit: "um"},
        {id: 3, label: "3倍频幅值", unit: "um"},
        {id: 4, label: "1/2倍频幅值", unit: "um"},
        {id: 5, label: "残振", unit: "um"},
        {id: 6, label: "直流量", unit: "V"},
        {id: 7, label: "间隙电压", unit: "V"},
        {id: 8, label: "1倍频相位", unit: "°"},
        {id: 9, label: "2倍频相位", unit: "°"},
        {id: 10, label: "3倍频相位", unit: "°"},
        {id: 11, label: "1/2倍频相位", unit: "°"}
      ],
      123: [
        {id: 0, label: "通频", unit: "mm/s"},
        {id: 1, label: "1倍频幅值", unit: "mm/s"},
        {id: 2, label: "2倍频幅值", unit: "mm/s"},
        {id: 3, label: "3倍频幅值", unit: "mm/s"},
        {id: 4, label: "1/2倍频幅值", unit: "mm/s"},
        {id: 5, label: "残振", unit: "mm/s"},
        {id: 6, label: "直流量", unit: "V"},
        {id: 7, label: "间隙电压", unit: "V"},
        {id: 8, label: "1倍频相位", unit: "°"},
        {id: 9, label: "2倍频相位", unit: "°"},
        {id: 10, label: "3倍频相位", unit: "°"},
        {id: 11, label: "1/2倍频相位", unit: "°"}
      ],
      124: [
        {id: 0, label: "通频", unit: "m/s2"},
        {id: 1, label: "1倍频幅值", unit: "m/s2"},
        {id: 2, label: "2倍频幅值", unit: "m/s2"},
        {id: 3, label: "3倍频幅值", unit: "m/s2"},
        {id: 4, label: "1/2倍频幅值", unit: "m/s2"},
        {id: 5, label: "残振", unit: "m/s2"},
        {id: 6, label: "直流量", unit: "V"},
        {id: 7, label: "间隙电压", unit: "V"},
        {id: 8, label: "1倍频相位", unit: "°"},
        {id: 9, label: "2倍频相位", unit: "°"},
        {id: 10, label: "3倍频相位", unit: "°"},
        {id: 11, label: "1/2倍频相位", unit: "°"}
      ],
      //动态压力type未知，暂定

    },
  //缸号对应信息
  cylinderNos: {}
};


const getters = {
  getNowcylinderNos: (state) => {
    return state.cylinderNos[state.equid];
  }
};

const mutations = {
  //修改当前设备UUID
  setequid: (state, equid) => {
    state.equid = equid;
  },
  //修改当前设备名称
  setequName: (state, equidName) => {
    state.equName = equidName;
  },
  //设置无特征值测点单位
  setFeature: (state, feature) => {
    state.features[99] = feature;
  },
  //添加对应设备UUID测点信息info
  setnodeData: (state, info) => {
    state.nodeNum++;
    Vue.set(state.nodeData, info[0], info[1]);
  },
  //添加对应设备UUID测点信息detail
  setEquipmentDetail: (state, detail) => {
    state.detailNum++;
    Vue.set(state.equipmentDetail, detail[0], detail[1]);
  },

  setCylinderNo: (state, cylinderData) => {
    Vue.set(state.cylinderNos, cylinderData[0], cylinderData[1]);
  },
};


const actions = {
  //从端口获取测点Info信息
  saveEquipmentInfo(content, equid) {
    content.commit('setequid', equid);
    if (state.nodeData[equid] === undefined) {
      axios.get("/point/" + equid + "/info").then(res => {
        if (res.data.code === 200) {
          // console.warn(res.data.data);
          let info = [];
          info[0] = equid;
          info[1] = res.data.data;
          axios.get("/point/" + equid + "/detail").then(res2 => {
            let tdata = res2.data.data;
            //console.log('tdata', tdata)
            //查询无特征值测点单位
            let feature = [
              {id: 1, label: "压力", unit: ""},
              {id: 2, label: "温度", unit: ""},
              {id: 3, label: "流量", unit: ""},
              {id: 4, label: "其他", unit: ""},
              {id: 5, label: "撞击", unit: ""},
            ];
            for (let item of tdata) {
              //压力
              if (item.channelType == 3) {
                feature[0].unit = item.unit;
              }
              //温度
              if (item.channelType == 4) {
                feature[1].unit = item.unit;
              }
              //流量
              if (item.channelType == 5) {
                feature[2].unit = item.unit;
              }
              //其他
              if (item.channelType == 6) {
                feature[3].unit = item.unit;
              }
              //撞击
              if (item.channelType == 7) {
                feature[4].unit = item.unit;
              }
            }
            content.commit("setFeature", feature);


            for (var i = 0; i < info[1].length; ++i) {
              for (let item of tdata) {
                if (item.pointUuid == info[1][i].pointUuid) {
                  //    console.log(item,  info[1][i])
                  info[1][i].type = item.type;
                  break;
                }
              }
            }
            content.commit('setequName', res.data.data[0].equipmentName);
            content.commit('setnodeData', info);
          })


        }
      })
    } else {
      content.commit('setequName', content.state.nodeData[equid][0].equipmentName);
    }
  },

  //从端口获取测点detail信息
  saveEquipmentDetail(content, equid) {
    if (state.equipmentDetail[equid] === undefined) {
      axios.get("/point/" + equid + "/detail").then(res => {
        if (res.data.code === 200) {
          // console.warn(res.data.data);
          let data = res.data.data;
          //console.log('zhege data', data)
          let S = new Set();
          data.forEach(item => S.add(item.cylinderNo));
          let cylinder = Array.from(S);
          cylinder.sort((a, b) => a - b);
          cylinder = cylinder.filter(item => item !== 0 && item !== 1000).map(item => {
            return {id: item, label: item.toString() + "缸"};
          });
          cylinder.unshift({id: -1, label: "全部"});

          content.commit('setEquipmentDetail', [equid, data]);
          content.commit('setCylinderNo', [equid, cylinder]);


        }
      })
    }
  },

  //所有端口数据获取
  getPortData(content, url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve(res);
      }).catch(e => reject(e));
    });
  },

  //从端口获取离线测点Info信息
  saveOfflineEquipmentInfo(content, equid) {
    content.commit('setequid', equid)
    if (content.state.nodeData[equid] === undefined){
      axios.get("/point/" + equid + "/info").then(res => {
        if (res.data.code === 200) {
          let infoData = res.data.data
          console.log('store saveOfflineEquipmentInfo请求数据', infoData)
          content.commit('setequName', infoData[0].equipmentName)
          content.commit('setnodeData', [equid, infoData])
        }
      })
    } else {
      content.commit('setequName', content.state.nodeData[equid][0].equipmentName);
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
