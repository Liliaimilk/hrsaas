<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="dashboard-container">
        <!-- 头部内容 -->
        <el-card class="header-card">
          <div>
            <div class="fl headL">
              <!-- 全屏 -->
              <div class="headImg">
                <img :imageerror="defaultImg" :src="avatar">
              </div>
              <div class="headInfoTip">
                <p class="firstChild">早安，{{ name }}，祝你开心每一天！</p>
                <p class="lastChild">早安，{{ name }}，祝你开心每一天！</p>
              </div>
            </div>
            <div class="fr" />
          </div>
        </el-card>
        <!-- 主要内容 -->
        <el-row type="flex" justify="space-between">
          <!-- 左侧内容 -->
          <el-col :span="13" style="padding-right:26px">
            <!-- 工作日历 -->
            <el-card class="box-card">
              <div slot="header" class="header">
                <span>工作日历</span>
              </div>
              <!-- 放置日历组件 -->
              <el-row type="flex" justify="end">
                <el-select
                  v-model="currentYear"
                  size="small"
                  style="width:130px;margin-right:10px;"
                  @change="dateChange"
                >
                  <el-option
                    v-for="item in year"
                    :key="item"
                    :value="item"
                    :label="item"
                  >{{ item }}</el-option>
                </el-select>
                <el-select
                  v-model="currentMonth"
                  size="mini"
                  style="width:90px"
                  @change="dateChange"
                >
                  <el-option
                    v-for="item in month"
                    :key="item"
                    :value="item"
                    :label="item"
                  />
                </el-select>
              </el-row>

              <!-- 日历 -->
              <el-calendar v-model="currentDate">
                <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法 -->
                <template
                  slot="dateCell"
                  slot-scope="{date,data}"
                >
                  <div class="data_content">
                    <div v-if="!isRest(data.type,date)">
                      <!-- 将日期转换为日期数字 -->
                      {{ data.day.split('-')[2].startsWith('0') ? data.day.split('-')[2].substr(1) : data.day.split('-')[2] }}
                    </div>
                    <div v-else style="color:red;">
                      休息
                    </div>
                  </div>

                </template>
              </el-calendar>
            </el-card>
            <!-- 公告 -->
            <el-card class="box-card">
              <div class="advContent">
                <div class="title"> 公告</div>
                <div class="contentItem">
                  <ul class="noticeList">
                    <li>
                      <div class="item">
                        <img src="@/assets/common/img.jpeg" alt="">
                        <div>
                          <p><span class="col">朱继柳</span> 发布了 第1期“传智大讲堂”互动讨论获奖名单公布</p>
                          <p>2018-07-21 15:21:38</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="item">
                        <img src="@/assets/common/img.jpeg" alt="">
                        <div>
                          <p><span class="col">朱继柳</span> 发布了 第2期“传智大讲堂”互动讨论获奖名单公布</p>
                          <p>2018-07-21 15:21:38</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="item">
                        <img src="@/assets/common/img.jpeg" alt="">
                        <div>
                          <p><span class="col">朱继柳</span> 发布了 第3期“传智大讲堂”互动讨论获奖名单公布</p>
                          <p>2018-07-21 15:21:38</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </el-card>
          </el-col>
          <!-- 右侧内容 -->
          <el-col :span="11">
            <el-card class="box-card">
              <div class="header headTit">
                <span>流程申请</span>
              </div>
              <div class="sideNav">
                <el-button class="sideBtn">加班离职</el-button>
                <el-button class="sideBtn">请假调休</el-button>
                <el-button class="sideBtn">审批列表</el-button>
                <el-button class="sideBtn">我的信息</el-button>
              </div>
            </el-card>

            <!-- 绩效指数 -->
            <el-card class="box-card">
              <div slot="header" class="header">
                <span>绩效指数</span>
              </div>
              <!-- 放置雷达图 -->
              <radar />
            </el-card>
            <!-- 帮助连接 -->
            <el-card class="box-card">
              <div class="header headTit">
                <span>帮助链接</span>
              </div>
              <div class="sideLink">
                <el-row>
                  <el-col :span="8">
                    <a href="#">
                      <span class="icon iconGuide" />
                      <p>入门指南</p>
                    </a>
                  </el-col>
                  <el-col :span="8">
                    <a href="#">
                      <span class="icon iconHelp" />
                      <p>在线帮助手册</p>
                    </a>
                  </el-col>
                  <el-col :span="8">
                    <a href="#">
                      <span class="icon iconTechnology" />
                      <p>联系技术支持</p>
                    </a>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import excel from '@/components/UploadExcel'
import { mapGetters } from 'vuex'
import Radar from './components/radar.vue'
export default {
  name: 'Dashboard',
  components: {
    Radar
  },
  data() {
    return {
      defaultImg: '@/assets/common/head.jpg',
      year: [],
      month: [],
      currentYear: null,
      currentMonth: null,
      currentDate: null
    }
  },
  computed: {
    ...mapGetters([
      'name', 'avatar'
    ])
  },
  created() {
    this.currentYear = new Date().getFullYear()
    this.year = Array.from(Array(10), (val, ind) => this.currentYear + ind - 5)
    this.currentMonth = new Date().getMonth() + 1
    this.month = Array.from(Array(12), (val, ind) => ind + 1)
  },
  methods: {

    // 筛选休息日
    isRest(type, value) {
      // type返回的是data.type会返回当前页面的prev-month，current-month，next-month这三个字符串名字
      // 遍历月份单元格有多少个就返回多少次总次数，并区分上月，当月，下月的次数
      // 所以利用其返回月份状态的次数设置区分样式
      // console.log(type, '203')
      if (type === 'current-month') {
        return value.getDay() === 6 || value.getDay() === 0
      }
      return
    },
    // 好
    dateChange() {
      const year = this.currentYear
      const month = this.currentMonth
      this.currentDate = new Date(`${year}-${month}-1`)
      console.log(this.currentDate)
    }
  }
}
</script>

<style lang='scss'>
.dashboard {
  &-container {
    margin: 30px;
  }
  // &-text {
    // font-size: 18px;
    // line-height: 46px;
  // }
}
.dashboard-container {
  margin: 10px;
  li {
    list-style: none;
  }
  .headImg {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #999;
          img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .headInfoTip {
    padding: 25px 0 0;
    margin-left: 120px;
    p {
      padding: 0 0 15px;
      margin: 0;
      &.firstChild {
        font-size: 24px;
      }
      &.lastChild {
        font-size: 20px;
        color: #7f8c8d;
      }
    }
  }
}

.box-card {
  padding: 5px 10px;
  margin-top: 20px;
  .header {
    span {
      color: #2c3e50;
      font-size: 24px;
    }
    .item {
      color: #97a8be;
      float: right;
      padding: 3px 0;
    }
  }
  .headTit {
    span {
      border-bottom: 4px solid #8a97f8;
      padding-bottom: 10px;
    }
  }
}
.header-card{
  position: relative;
  .header {
    position: absolute;
    right: 20px;
    top: 15px;
    z-index: 1;
  }
}

.advContent {
  background: #fff;
  border-radius: 5px 5px 0px 0px;
  .title {
    font-size: 16px;
    padding: 20px;
    font-weight: bold;
    border-bottom: solid 1px #ccc;
  }
  .contentItem {
    padding: 0 30px;
    min-height: 350px;
    .item {
      display: flex;
      padding:18px 0 10px;
      border-bottom: solid 1px #ccc;
      .col {
        color: #8a97f8;
      }
      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 10px;
      }
      p{
        padding: 0 0 8px;
      }
    }
  }
}
.noticeList {
  margin: 0;
  padding: 0;
}
.sideNav,
.sideLink {
  padding: 30px 0 12px;
  .sideBtn {
    padding: 16px 26px;
    font-size:16px;
    margin: 10px 5px;
  }
}
.sideLink {
  text-align: center;
  .icon {
    display: inline-block;
    width: 76px;
    height: 76px;
    background: url('./../../assets/common/icon.png') no-repeat;
  }
  .iconGuide {
    background-position: 0 0;
  }
  .iconHelp {
    background-position: -224px 0;
  }
  .iconTechnology {
    background-position: -460px 0;
  }
}
.el-calendar{
  width: 500px;
  height: 400px;
}
.el-calendar-table__row td,.el-calendar-table tr td:first-child,.el-calendar-table__row td.prev{
  border:none;
 }
.el-calendar__header {
   display: none
}
.el-calendar-table .el-calendar-day{
  // line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.el-calendar-table td.is-today{
  border-radius: 10px;
  background-color: blue;
  color: red;
  opacity: 0.7;
}
</style>
