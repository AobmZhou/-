<template>
  <div>
    <el-row style=" padding-top: 10px;font-size: 14px">
      模式选择:
      <el-radio-group v-model="radio">
        <el-radio :label="1" style="color: white">实时</el-radio>
        <el-radio :label="2" style="color: white">历史</el-radio>
      </el-radio-group>
    </el-row>
    <div v-if="radio === 1">

    </div>
    <div v-else  style="font-size: 14px">
      <el-row>
        趋势类型:
        <el-select v-model="form.trend" size="mini"  style="width: 60%">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <div v-if="form.trend === '前一阶段'">
        <el-row>
          时间选择:
          <el-select v-model="form.stage" size="mini" style="width: 60%">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-row>
      </div>
      <div v-else-if="form.trend === '起止时间'">
        <el-row>
          开始时间:
          <el-date-picker
            v-model="form.time.start"
            type="datetime"
            placeholder="选择日期时间"
            size="mini"
            value-format="timestamp"
            style="width: 60%">
          </el-date-picker>
        </el-row>
        <el-row>
          终止时间:
          <el-date-picker
            v-model="form.time.end"
            type="datetime"
            placeholder="选择日期时间"
            value-format="timestamp"
            size="mini"
            style="width: 60%">
          </el-date-picker>
        </el-row>
      </div>
      <div v-else-if="form.trend === '起止月'">
        <el-row>
          选择年月:
          <el-date-picker
            v-model="form.month"
            type="month"
            size="mini"
            style="width: 60%"
            format="yyyy 年 MM 月 dd 日 HH "
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择年月">
          </el-date-picker>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "RtHisTimeSelect",
        data() {

            return {
                deletetime: 7*24*60*60*1000,
                mytime:{
                    starttime:null,
                    endtime:null
                },
                radio: 1,
                options1: [{
                    value: '前一阶段',
                    label: '前一阶段'
                }, {
                    value: '起止时间',
                    label: '起止时间'
                }, {
                    value: '起止月',
                    label: '起止月'
                }],
                options2: [{
                    value: '前5分钟',
                    label: '前5分钟'
                }, {
                    value: '前半小时',
                    label: '前半小时'
                }, {
                    value: '前1小时',
                    label: '前1小时'
                }, {
                    value: '前1天',
                    label: '前1天'
                }, {
                    value: '前1周',
                    label: '前1周'
                }, {
                    value: '前1月',
                    label: '前1月'
                }, {
                    value: '前1季度',
                    label: '前1季度'
                }, {
                    value: '前1年',
                    label: '前1年'
                }],

                form: {
                    trend: '前一阶段',
                    time: {
                        start: new Date().getTime() - 3600 * 1000 * 24 * 7,
                        end: new Date().getTime(),
                    },
                    month: '',
                    stage: '前1周',
                }
            }
        },
        computed:{
            myselect(){
                return this.form.stage;
            },
            myradio() {
                return this.radio;
            }
        },
        watch: {
            myradio() {

                this.$emit('radiostatus', this.radio)
            },

            myselect(){
                //console.log(this.form.stage)
                var mystatus = this.form.stage
                if(mystatus == '前5分钟') {
                    this.deletetime = 5 * 60 * 1000
                }
                else if(mystatus == '前半小时') {
                    this.deletetime = 30 * 60 * 1000
                }
                else if(mystatus ==  '前1小时') {
                    this.deletetime = 60 * 60 * 1000
                }
                else if(mystatus ==  '前1天') {
                    this.deletetime = 24 * 60 * 60 * 1000
                }
                else if(mystatus ==  '前1周') {
                    this.deletetime = 7 * 24 * 60 * 60 * 1000
                }
                else if(mystatus ==  '前1月') {
                    this.deletetime = 30 * 24 * 60 * 60 * 1000
                }
                else if(mystatus ==  '前1季度') {
                    this.deletetime = 90 * 24 * 60 * 60 * 1000
                }
                else if(mystatus ==  '前1年') {
                    this.deletetime = 365 * 24 * 60 * 60 * 1000
                }
               // console.log(this.deletetime)
            }
        },
        methods: {

            handleCheckAllChange(val) {
                this.checkedStatues = val ? statueOptions1 : [];
                this.isIndeterminate = false;
                console.log('here')
            },
            handleCheckedStatuesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.statues.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.statues.length;
                console.log('not here')

            },
            timedata() {
                if (this.radio == 1) {
                    return {model: '实时' , form: this.mytime}

                }
                else {
                    var nowTrend = '';
                    if(this.form.trend == '前一阶段') {
                        nowTrend = '前一阶段';

                        var thistime = new Date().getTime();
                        this.mytime.starttime = thistime - this.deletetime;

                        this.mytime.endtime = thistime
                    }
                    else if(this.form.trend == '起止月'){
                          nowTrend = '起止月';
                          var monthnum = 0;
                          var yearnum = 0;
                          for(var i = 0; i < 4; ++i) {
                              yearnum *= 10
                              yearnum += this.form.month[i] - '0'
                          }

                        var mydate=new Date(this.form.month.replace(/-/g, '/'));
                        var nowtime = new Date(mydate).getTime();

                        this.mytime.starttime = nowtime;
                        monthnum = (this.form.month[5] - '0') * 10 +  (this.form.month[6] - '0')
                        if(monthnum == 12) {
                            yearnum += 1
                            monthnum = 1
                        }
                        else {
                            monthnum += 1
                        }
                        if(monthnum < 10) {
                            monthnum = '0' + monthnum.toString()
                        }
                        else {
                            monthnum = monthnum.toString()
                        }

                        yearnum = yearnum.toString()
                        mydate = yearnum + '-' + monthnum + '-01 00:00:00'
                        //console.log(mydate)
                        mydate=new Date(mydate.replace(/-/g, '/'));
                        nowtime = new Date(mydate).getTime() - 1;

                        this.mytime.endtime = nowtime;
                    }
                    else {
                        nowTrend = '起止时间';
                        this.mytime.starttime = this.form.time.start;
                        this.mytime.endtime = this.form.time.end;
                    }
                    console.log(this.mytime);
                    if(this.mytime.starttime <=  this.mytime.endtime) {
                        return {model: '历史' , trend: nowTrend, form: this.mytime}
                    } else {
                        this.$alert('请确保开始时间早于终止时间', '时间选择错误', {
                          confirmButtonText: '确定',
                          callback: action => {

                          }
                        });
                    }
                }
            },
            // onSubmit() {
            //     // console.log(this.form.trend);
            //     // console.log(this.form.time);
            //     if (this.radio === 1) {
            //         event.$emit("receiveData", {model: '实时' , form: this.form});
            //     }
            //     else {
            //         event.$emit("receiveData", {model: '历史' , form: this.form});
            //     }
            //     // console.log(this.form);
            // },
        },
        mounted() {
            // console.log(this.form);
        }
    }
</script>

<style scoped>
  .el-select-dropdown {
    height: 20px;
  }
  .el-row {
    background-color: #303749;
    height: 100%;
    width: 250px;
    color: white;
    padding-left: 8px;
    margin-bottom: 10px;
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    /*border: 0.5px solid #dcdfe6;*/
  }
</style>

<style>
  .el-time-panel {
    width: 150px;
  }
</style>
