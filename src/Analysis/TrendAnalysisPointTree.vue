

<template>
  <div>
    <el-form-item label="类型选择:">
      <el-select v-model="treeSelect" placeholder="请选择类型" @change="treeChange">
        <el-option label="多通道单特征值" value="0"></el-option>
        <el-option label="单通道多特征值" value="1"></el-option>
      </el-select>
    </el-form-item>
    <div class="trend-analysis-point-tree" v-show="treeSelect == 0">
      <el-tree :data="pointTree1" show-checkbox node-key="id" :default-expanded-keys="['振动-位移']"
               @check="pointTree1Checked"
               accordion ref="pointFeatureTree1" :render-content="renderContent"></el-tree>
    </div>
    <div class="trend-analysis-point-tree" v-show="treeSelect == 1">
      <el-tree :data="pointTree2" accordion show-checkbox node-key="id" :default-expanded-keys="['振动-位移']"
               @check="pointTree2Checked" ref="pointFeatureTree2"></el-tree>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TrendAnalysisPointTree",
    data() {
      return {
        treeSelect: "0",
        featureSelect: [0, 0, 0],
        
        points: [],
        pointTree1: [],
        pointTree2: [],
        cflag: 0,
        lastChoosePoints: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          disabled: function (data, node) {
            if (node.store.getCheckedKeys(true).length >= 8) {
              return node.store.getCheckedKeys(true).indexOf(data.id) < 0
            }
          }
        },
      };
    },

    mounted() {
      if (this.nodeData[this.equid] != undefined) {
        this.setPointTree(this.equid);
      }
    },

    computed: {
      nodeData() {
        return this.$store.state.nodeData;
      },
      equid() {
        return this.$store.state.equid;
      },
      nodeNum() {
        return this.$store.state.nodeNum;
      },
      equipmentDetail() {
        return this.$store.state.equipmentDetail;
      }
    },

    watch: {
      equid: {
        handler(newEquid) {
          // console.log(newEquid)
          this.$nextTick(() => this.setPointTree(newEquid));

          // console.log(this.pointTree1);
        }
      },
      nodeNum: {
        handler() {
          this.setPointTree(this.equid);
          // console.log(this.pointTree1);
        }
      }
    },

    methods: {
      setPointTree(equid) {
        let that = this;
        let newEquid = equid;
        // console.log(this.equipmentDetail)
        setTimeout(function () {

          let _data = that.equipmentDetail[newEquid];
          // console.log(_data);
          if (_data == undefined)
            return;
          that.points = [];
          for (const i in _data) {
            if (_data[i].dataType == 1 || _data[i].dataType == 2 || _data[i].dataType == 0) {
              that.points.push(_data[i]);
            }
          }
          // console.log(that.pointTree1,'-------iii---------')
          that.setPointTree1();
          that.setPointTree2();
          that.$nextTick(() => {
            for (const i in that.pointTree1) {
              if (that.pointTree1[i].children.length > 1) {
                that.$refs.pointFeatureTree1.setCheckedKeys([that.pointTree1[i].children[0].id, that.pointTree1[i].children[1].id]);
                that.lastChoosePoints = [that.pointTree1[i].children[1]];
                break;
              }
            }
            for (const i in that.pointTree2) {
              if (that.pointTree2[i].children.length > 0) {
                // console.log(i)
                let tempList = [];
                this.cflag = that.pointTree2[i].children[0].pid;

                for (const j in that.pointTree2[i].children[0].children) {
                  tempList.push(that.pointTree2[i].children[0].children[j].id);
                  if (j > 5) {
                    break;
                  }
                }
                that.$refs.pointFeatureTree2.setCheckedKeys(tempList);

                break;
              }
            }
            if (that.treeSelect == "0") {
              that.pointTree1Checked();
            } else {
              that.pointTree2Checked();
            }
            that.$emit('firstdo');

          });

        }, 1000);
      },

      setPointTree1() {
        this.pointTree1 = [];
        // console.log('-------iii---------')
        let tmpDisplacement = {
          id: '振动-位移',
          label: '振动-位移',
          children: []
        };
        let tmpAcceleration = {
          id: '振动-加速度',
          label: '振动-加速度',
          children: []
        };
        let tmpSpeed = {
          id: '振动-速度',
          label: '振动-速度',
          children: []
        };
        let tmp2 = {
          id: '特征-位移',
          label: '特征',
          disabled: true,
          type: 113,
        };
        let tmp3 = {
          id: '特征-加速度',
          label: '特征',
          disabled: true,
          type: 113,
        };
        let tmp4 = {
          id: '特征-速度',
          label: '特征',
          disabled: true,
          type: 113,
        };
        tmpDisplacement['children'].push(tmp2);
        tmpAcceleration['children'].push(tmp3);
        tmpSpeed['children'].push(tmp4);
        // console.log('-------iii---------')
        let that = this;
        let flag1 = 0, flag2 = 0, flag3 = 0;
        for (const i in this.points) {
          let tmp1 = {
            id: that.points[i].pointId,
            label: that.points[i].pointName,
            pointUuid: that.points[i].pointUuid,
            dataType: that.points[i].dataType,
          };
          if (that.points[i].dataType == 0) {
            tmpDisplacement['children'].push(tmp1);
            if (flag1 == 0) {
              tmpDisplacement['children'][0].type = that.points[i].type;
              flag1 = 1;
            }
          } else if (that.points[i].dataType == 1) {
            tmpAcceleration['children'].push(tmp1);
            if (flag2 == 0) {
              tmpAcceleration['children'][0].type = that.points[i].type;
              flag2 = 1;
            }
          } else if (that.points[i].dataType == 2) {
            tmpSpeed['children'].push(tmp1);
            if (flag3 == 0) {
              tmpSpeed['children'][0].type = that.points[i].type;
              flag3 = 1;
            }
          }
        }
        // console.log('-------iii---------')
        if (tmpDisplacement.children.length > 1)
          this.pointTree1.push(tmpDisplacement);
        if (tmpAcceleration.children.length > 1)
          this.pointTree1.push(tmpAcceleration);
        if (tmpSpeed.children.length > 1)
          this.pointTree1.push(tmpSpeed);
      },

      setPointTree2() {
        this.pointTree2 = [];
        let tmpDisplacement = {
          id: '振动-位移',
          label: '振动-位移',
          xid: '振动-位移',
          disabled: true,
          children: []
        };
        let tmpAcceleration = {
          id: '振动-加速度',
          label: '振动-加速度',
          xid: '振动-加速度',
          disabled: true,
          children: []
        };
        let tmpSpeed = {
          id: '振动-速度',
          label: '振动-速度',
          xid: '振动-速度',
          disabled: true,
          children: []
        };
        for (const i in this.points) {
          let tmp1 = {
            id: this.points[i].pointId,
            pointUuid: this.points[i].pointUuid,
            label: this.points[i].pointName,
            xid: this.points[i].pointId,
            children: [],
            pid: this.points[i].pointId,
          };
          let type = this.points[i].type;
          if (type != 113 && type != 114) {
            // console.log(this.points[i].pointName)
          }
          for (const j in this.$store.state.features[type]) {
            let tmp2 = {
              id: tmp1['id'] + j.toString(),
              pointUuid: tmp1['pointUuid'],
              label: this.$store.state.features[type][j].label,
              xid: j.toString(),
              pid: tmp1['id']
            };
            tmp1['children'].push(tmp2);
          }
          if (this.points[i].dataType == 0) {
            tmpDisplacement['children'].push(tmp1);
          } else if (this.points[i].dataType == 1) {
            tmpAcceleration['children'].push(tmp1);
          } else if (this.points[i].dataType == 2) {
            tmpSpeed['children'].push(tmp1);
          }
        }
        if (tmpDisplacement.children.length > 0)
          this.pointTree2.push(tmpDisplacement);
        if (tmpAcceleration.children.length > 0)
          this.pointTree2.push(tmpAcceleration);
        if (tmpSpeed.children.length > 0)
          this.pointTree2.push(tmpSpeed);
        // console.log(this.pointTree2);
      },

      pointTree1Checked(data) {
        let checkedNodes = this.$refs.pointFeatureTree1.getCheckedNodes() || [];
        if (data) {
          console.log('pointTree1', this.pointTree1);
          console.log('mydata', data);
          let NowChose = [];
          if (data.id == '振动-位移') {
            // console.log('点击全选');
            for(var item = 0; item < this.pointTree1.length; item++) {
              if(this.pointTree1[item].id == '振动-位移') {
                  for (var i = 0; i < this.pointTree1[item].children.length && i < 9; i++) {//本来是最多选8个测点，由于特征的存在，故这里为9
                      NowChose.push(this.pointTree1[item].children[i].id);
                  }
                  break;
              }
            }
            
            this.$refs.pointFeatureTree1.setCheckedKeys(NowChose);
          } else if (data.id == '振动-加速度') {
            // console.log('点击全选');
            for(var item = 0; item < this.pointTree1.length; item++) {
              if(this.pointTree1[item].id == '振动-加速度') {
                  for (var i = 0; i < this.pointTree1[item].children.length && i < 9; i++) {//本来是最多选8个测点，由于特征的存在，故这里为9
                      NowChose.push(this.pointTree1[item].children[i].id);
                  }
                  break;
              }
            }
            // for (var i = 0; i < this.pointTree1[1].children.length && i < 9; i++) {
            //   NowChose.push(this.pointTree1[1].children[i].id);
            // }
            this.$refs.pointFeatureTree1.setCheckedKeys(NowChose);
          } else if (data.id == '振动-速度') {
            for(var item = 0; item < this.pointTree1.length; item++) {
              if(this.pointTree1[item].id == '振动-速度') {
                  for (var i = 0; i < this.pointTree1[item].children.length && i < 9; i++) {//本来是最多选8个测点，由于特征的存在，故这里为9
                      NowChose.push(this.pointTree1[item].children[i].id);
                  }
                  break;
              }
            }
            // console.log('点击全选');
            // for (var i = 0; i < this.pointTree1[2].children.length && i < 9; i++) {
            //   NowChose.push(this.pointTree1[2].children[i].id);
            // }
            this.$refs.pointFeatureTree1.setCheckedKeys(NowChose);
          }  else if (this.lastChoosePoints.length == 0 || data.dataType != this.lastChoosePoints[0].dataType) {
            // console.log('单选');
            
            var tmpstring  = '';
            if(data.dataType == 0) {
              tmpstring = '振动-位移';
            } else if(data.dataType == 1) {
              tmpstring = '振动-加速度';
            } else if(data.dataType == 2) {
              tmpstring = '振动-速度';
            }
            for(var item = 0; item < this.pointTree1.length; item++) {
              if(tmpstring == this.pointTree1[item].id) {
                NowChose = [this.pointTree1[item].children[0].id, data.id];
                // console.log('单选', this.pointTree1[item].children[0].id, data.id);
                break;
              }
            }
            
            // NowChose = [this.pointTree1[data.dataType].children[0].id, data.id];
            this.$refs.pointFeatureTree1.setCheckedKeys(NowChose);
          }
          checkedNodes = this.$refs.pointFeatureTree1.getCheckedNodes();
          console.log('checkedNodes', checkedNodes);
          this.lastChoosePoints = [];
          for (const i in checkedNodes) {
            if (checkedNodes[i].id != '振动-位移' && checkedNodes[i].id != '振动-加速度' &&
              checkedNodes[i].id != '振动-速度' && checkedNodes[i].id.indexOf('特征') == -1) {
              this.lastChoosePoints.push(checkedNodes[i])
            }
          }
        }

        let returnTreeData = {};
        returnTreeData['treeSelect'] = this.treeSelect;
        returnTreeData['checkedNodes'] = this.$refs.pointFeatureTree1.getHalfCheckedNodes();
        checkedNodes = checkedNodes.filter((item) => {
          return item.id.indexOf('特征') == -1;
        });
        for (let i = 0; i < checkedNodes.length; i++) {
          if (checkedNodes[i].label == "特征")
            continue;
          returnTreeData['featureSelect'] = this.featureSelect[checkedNodes[i].dataType]; //最好要改
          returnTreeData['checkedNodes'].push(checkedNodes[i]);
        }
        if (returnTreeData['checkedNodes'].length > 1) {
          returnTreeData.featureSelect = this.featureSelect[returnTreeData['checkedNodes'][1].dataType];
        }

        console.log("getPointFeatureTree2Data", returnTreeData);
        this.$emit('getPointFeatureTree2Data', returnTreeData);
      },

      pointTree2Checked(data) {

        let checkedNodes = this.$refs.pointFeatureTree2.getCheckedNodes();
        let halfCheckedNodes = this.$refs.pointFeatureTree2.getHalfCheckedNodes();
        console.log(checkedNodes, 'daxin')
        // if (halfCheckedNodes.length > 2 || checkedNodes.length > 7) {
        //   this.$refs.pointFeatureTree2.setCheckedNodes([data]);
        // }
        if (data != undefined) {
          var newc = []
          var flag = -1;
          for (var i = 0; i < checkedNodes.length; ++i) {
            if (checkedNodes[i].id == data.id) {
              flag = i;
              break;
            }
          }
          if (flag != -1) {
            if (data.pid != this.cflag) {
              newc.push(data.id);
              this.cflag = data.pid;
              this.$refs.pointFeatureTree2.setCheckedKeys(newc)
            }
          }
        }
        checkedNodes = this.$refs.pointFeatureTree2.getCheckedNodes();
        halfCheckedNodes = this.$refs.pointFeatureTree2.getHalfCheckedNodes();
        var cc = [];
        let returnTreeData = {};
        console.log("打印奇怪的东西",checkedNodes);
        if (checkedNodes.length > 0) {
          if (checkedNodes[0].id.indexOf('振动') != -1) {
            for (var i = 1; i < checkedNodes.length; ++i) {
              cc.push(checkedNodes[i])
            }
            returnTreeData['type'] = checkedNodes[0].label;
            checkedNodes = cc;

          }
        }

        returnTreeData['treeSelect'] = this.treeSelect;
        returnTreeData['checkedNodes'] = [];
        for (let i = 0; i < halfCheckedNodes.length; i++) {
          if (halfCheckedNodes[i].id.indexOf("振动") != -1) {
            returnTreeData['type'] = halfCheckedNodes[i].label;
            continue;
          }
          returnTreeData['checkedNodes'].push(halfCheckedNodes[i]);
          returnTreeData['checkedNodes'][0].type = returnTreeData['type'];
        }
        for (let i = 0; i < checkedNodes.length; i++) {
          if (checkedNodes[i].id.indexOf("振动") != -1) {
            returnTreeData['type'] = checkedNodes[i].label;
            continue;
          }
          returnTreeData['checkedNodes'].push(checkedNodes[i]);
          returnTreeData['checkedNodes'][0].type = returnTreeData['type'];
        }
        // console.log(returnTreeData);
        this.$emit('getPointFeatureTree2Data', returnTreeData);
      },

      treeChange(value) {
        this.$nextTick(() => {
          if (value == "0") {
            this.pointTree1Checked();
          } else if (value == "1") {
            this.pointTree2Checked();
          }
        });
      },

      renderContent(h, {node, data, store}) {
        if (node.label == '特征') {
          // console.log(data.type)
          let dataType = 0;
          let tempTypeSelect = this.$store.state.features[data.type];
          // let tempTypeSelect = [];
          // console.log(node)
          if (node.data.id == '特征-位移') {
            dataType = 0;
          } else if (node.data.id == '特征-加速度') {
            dataType = 1;
          } else if (node.data.id == '特征-速度') {
            dataType = 2;
          }
          return h(
            "div", [
              h(
                "span", {
                  style: {
                    fontSize: '13px',
                    color: '#ffffff',
                    marginRight: '5px'
                  },
                }, "特征"
              ), h(
                "el-select", {
                  class: "el-select--mini el-input--mini",
                  style: {
                    width: '55%'
                  },
                  on: {
                    input: (value) => {
                      this.$set(this.featureSelect, dataType, value);
                      this.pointTree1Checked();
                    }
                  },
                  props: {
                    value: this.featureSelect[dataType]
                  }
                }, [
                  tempTypeSelect.map(item => {
                    return h(
                      "el-option", {
                        style: {
                          lineHeight: '18px',
                          fontSize: '13px',
                          height: '18px'
                        },
                        props: {
                          value: item.id,
                          label: item.label
                        }
                      }
                    );
                  })
                ]
              )
            ]
          );
        } else {
          return h(
            "span", {
              style: {
                fontSize: '13px',
                color: '#ffffff'
              },
            }, node.label
          );
        }
      }
    },
  }
</script>

<style lang="scss">
  .trend-analysis-point-tree {
    height: 250px;
    overflow: auto;
    background-color: #3C455B;
    margin-bottom: 7px;

    .el-select {
      width: 70%;
    }

    .el-tree {
      background: #3C455B;

      .el-input {
        font-size: 12px;
      }

      .el-tree-node > .el-tree-node__content {
        background-color: #3C455B !important;
      }

      .el-tree-node.is-current > .el-tree-node__content {
        background-color: #3C455B !important;
      }

      .el-tree-node__content {
        height: 60%;
      }

      .el-tree-node__content > .el-tree-node__expand-icon {
        padding: 2px;
      }

      .el-checkbox {
        font-size: 13px;
      }

      .el-tree-node__label {
        font-size: 13px;
        color: white;
      }

      .el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner {
        background-color: #409EFF;
        border-color: #409EFF;
      }
    }

  }
</style>
