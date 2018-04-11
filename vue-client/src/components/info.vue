<template>
  <div class="info-page">
    <h2> Name of Place</h2>
    <el-row>
      <el-col :span="12">
        <h3>Introduction</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </el-col>
      <el-col :span="12" class="review-container">
        <h3>Reviews</h3>
        <div class="review-box">
          <ul>
            <li v-for="(o, index) in 5">
              <review-card></review-card>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <h3>Check-in</h3>
      <el-tabs v-model="activeName">
        <el-tab-pane label="Your Friends" name="first">
          <el-row>
            <el-col :span="4" v-for="(o, index) in 5" :key="o" :offset="index > 0 ? 1 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" class="image">
                <div style="padding: 14px;">
                  <span>Yummy hamburger</span>
                  <div class="bottom clearfix">
                    <time class="time">12/2</time>
                    <el-button type="text" class="button">Operating button</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Everyone" name="second">
          <el-row>
            <el-col :span="4" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 1 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" class="image">
                <div style="padding: 14px;">
                  <span>Yummy hamburger</span>
                  <div class="bottom clearfix">
                    <time class="time">12/2</time>
                    <el-button type="text" class="button">Operating button</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <h3>Direction</h3>
    <span>This is the best direct instruction.</span>
    <el-button type="text" @click="dialogVisible = true">click to see another instructions</el-button>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>This is a message</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data () {
    return {
      activeName: 'first',
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
    this.$confirm('Are you sure to close this dialog?')
      .then(_ => {
        done();
      })
      .catch(_ => {});
    }
  }
}
</script>
<style>
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
.el-col-offset-1 {
    margin-left: 2.16667%;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
