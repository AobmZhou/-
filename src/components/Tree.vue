<template>
  <div class="treebox">
    <el-tree
	  :filter-node-method="filterNode"
      :data="data"
      node-key="id"
      ref="mytree"
      :highlight-current="true"
      :default-expanded-keys="idArr"
      :render-content="renderContent2"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
export default {
  name: "Tree",

  data() {
    return {
      idArr: [],
      data: [],
      cnt: 0,
      mylen: 0,
      nowtree: [],
	  filterText: '',
    };
  },
  created() {
    this.getNodeId();
  },
  watch: {
    $route(data) {
      console.log("rout", data.path);
    },
	filterText(val) {
	    this.$refs.tree.filter(val);
	},
  },
  methods: {
    getNodeId() {
      this.cnt = 0;
      this.$http
        .get("/node/info")
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.nowtree = [];
            this.mylen = res.data.data.length;
            for (var i = 0; i < res.data.data.length; i++) {
              this.getEquipment(res.data.data[i].nodeId);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getEquipment(nodeId) {
      let that = this;
      this.$http.get("/equipment/node/" + nodeId + "/info").then((res) => {
        if (res.data.code == 200) {
          var nowdata = res.data.data;
          var treenode = [];
          var equlist = {};
          for (var i = 0; i < nowdata.length; ++i) {
            var noweq = nowdata[i];
            var have_group = -1;
            var groupId = noweq.groupId;

            for (var j = 0; j < treenode.length; ++j) {
              if (groupId == treenode[j].id) {
                have_group = j;
                break;
              }
            }
            if (have_group == -1) {
              have_group = treenode.length;
              treenode.push({
                id: groupId,
                label: noweq.groupName,
                children: [],
              });
            }
            //group
            var companyId = noweq.companyId;
            var have_com = -1;
            for (var j = 0; j < treenode[have_group].children.length; ++j) {
              if (companyId == treenode[have_group].children[j].id) {
                have_com = j;
                break;
              }
            }
            if (have_com == -1) {
              have_com = treenode[have_group].children.length;
              treenode[have_group].children.push({
                id: companyId,
                label: noweq.companyName,
                children: [],
              });
            }
            //company
            var factoryId = noweq.factoryId;
            var have_fact = -1;
            for (
              var j = 0;
              j < treenode[have_group].children[have_com].children.length;
              ++j
            ) {
              if (
                factoryId ==
                treenode[have_group].children[have_com].children[j].id
              ) {
                have_fact = j;
                break;
              }
            }
            if (have_fact == -1) {
              have_fact =
                treenode[have_group].children[have_com].children.length;
              treenode[have_group].children[have_com].children.push({
                id: factoryId,
                label: noweq.factoryName,
                children: [],
              });
            }
            //factory
            var unitId = noweq.unitId;
            var have_uuit = -1;
            //  console.log(treenode[have_group].children[have_com].children[have_fact])
            for (
              var j = 0;
              j <
              treenode[have_group].children[have_com].children[have_fact]
                .children.length;
              ++j
            ) {
              if (
                unitId ==
                treenode[have_group].children[have_com].children[have_fact]
                  .children[j].id
              ) {
                have_uuit = j;
                break;
              }
            }
            if (have_uuit == -1) {
              have_uuit =
                treenode[have_group].children[have_com].children[have_fact]
                  .children.length;
              treenode[have_group].children[have_com].children[
                have_fact
              ].children.push({
                id: unitId,
                label: noweq.unitName,
                children: [],
              });
            }
            //unit

            let tmp1 = {};
            if (noweq.alarmStatus == 1) {
              tmp1["icon"] = "iconfont icon-jinggao red"; //危险
              tmp1["title"] = noweq.alarmAlias;
            }
            if (noweq.alarmStatus == 2) {
              tmp1["icon"] = "iconfont icon-jinggao yellow"; //警报
              tmp1["title"] = noweq.alarmAlias;
            }
            if (noweq.alarmStatus == 3) {
              tmp1["icon"] = "el-icon-s-claim normal"; //正常
              tmp1["title"] = noweq.alarmAlias;
            }
            if (noweq.alarmStatus == 4) {
              tmp1["icon"] = "el-icon-warning tingji"; //停车
              tmp1["title"] = noweq.alarmAlias;
            }
            if (noweq.alarmStatus == 5) {
              tmp1["icon"] = "el-icon-error duanwang"; //断网
              tmp1["title"] = noweq.alarmAlias;
            }
            treenode[have_group].children[have_com].children[
              have_fact
            ].children[have_uuit].children.push({
              id: noweq.equipmentUuid,
              label: noweq.equipmentName,
              icon: tmp1.icon,
              title: tmp1.title,
              companyname: noweq.companyName,
              factoryname: noweq.factoryName,
            });
            this.$set(equlist, noweq.equipmentId, noweq.equipmentUuid);
          }
          this.$store.state.equlist = equlist;

          this.cnt += 1;
          for (var i = 0; i < treenode.length; ++i) {
            this.nowtree.push(treenode[i]);
          }

          if (this.cnt == this.mylen) {
            this.data = this.nowtree;

            this.data.forEach((m) => {
              this.idArr.push(m.id);
            }); //遍历进行二级展开

            var defaultid = this.nowtree[0].children[0].children[0].children[0]
              .children[0].id;
            if (this.$route.query.equipmentUuid) {
              defaultid = this.$route.query.equipmentUuid;
            }
            this.$router.push({ query: { equipmentUuid: defaultid } });
            this.$store.dispatch("saveEquipmentInfo", defaultid);
            this.$store.dispatch("saveEquipmentDetail", defaultid);
            this.$store.state.companyname = this.nowtree[0].children[0].children[0].children[0].children[0].companyname;
            this.$store.state.factoryname = this.nowtree[0].children[0].children[0].children[0].children[0].factoryname;
            this.$nextTick(() => this.$refs.mytree.setCurrentKey(defaultid));
          }
        }
      });
    },
    handleNodeClick(data) {
      console.log("数据", data);
      if (data.children == undefined) {
        this.$router.push({ query: { equipmentUuid: data.id } });
        this.$store.dispatch("saveEquipmentInfo", data.id);
        this.$store.dispatch("saveEquipmentDetail", data.id);
        if (data.companyname != undefined) {
          this.$store.state.companyname = data.companyname;
          this.$store.state.factoryname = data.factoryname;
        } else {
          this.$store.state.companyname = "";
          this.$store.state.factoryname = "";
        }
      }
    },
    renderContent2(i, { node, data, store }) {
      console.warn("123", data.icon, data.title);
      return i("span", [
        i("span", {
          class: data.icon,
          style: {
            display: "inline-block",
          },
        }),
        i(
          "span",
          {
            domProps: { title: data.title },
            style: {
              marginLeft: "5px",
              fontSize: "13px",
              color: "#ffffff",
            },
          },
          node.label
        ),
      ]);
    },
  },
};
</script>

<style lang="scss">
.red {
  color: red;
}
.yellow {
  color: yellow;
}
.normal {
  color: white;
}
.duanwang {
  color: #a6a9ad;
}
.tingji {
  color: #a6a9ad;
}
.treebox {
  .el-tree {
    height: 100%;
    font-family: "微软雅黑";
    background-color: #303749;
  }

  .el-collapse-item {
    background-color: #303749 !important;
  }

  .el-tree-node__label {
    font-size: 14px;
    color: #ffffff;
  }

  .el-tree-node > .el-tree-node__content {
    background-color: #303749 !important;
  }

  .el-tree-node.is-current > .el-tree-node__content {
    background-color: #359186 !important;
  }

  .el-select-dropdown__item {
    height: 25px;
    /*line-height: 20px;*/
  }
}
</style>
