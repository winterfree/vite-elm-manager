<template>
  <el-card>
    <el-tabs :tab-position="tabPosition" class="demo-tabs">
      <el-tab-pane label="基本设置">
        <div class="title">基本设置</div>
        <el-row gutter="36" style="margin-left: 40px">
          <el-col :span="12">
            <el-form
              ref="ruleFormRef"
              :model="baseSetData"
              :label-position="labelPosition"
              :rules="baseSetRules"
            >
              <el-form-item label="姓名" label-width="330px">
                <el-input v-model="baseSetData.username" :placeholder="adminInfo.user_name" disabled />
              </el-form-item>
              <el-form-item label="注册时间">
                <el-input v-model="baseSetData.createtime" :placeholder="adminInfo.create_time" disabled  />
              </el-form-item>
              <el-form-item label="管理员权限">
                <el-input v-model="baseSetData.admin" :placeholder="adminInfo.admin" disabled  />
              </el-form-item>
              <el-form-item label="管理员id">
                <el-input v-model="baseSetData.id" :placeholder="adminInfo.id" disabled  />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="baseSetData.email" clearable />
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input v-model="baseSetData.desc" type="textarea" :rows="3" clearable />
              </el-form-item>
              <el-form-item label="国家/地区">
                <el-select placeholder="中国">
                  <el-option
                    value="中国"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="所在省市">
                <el-cascader
                  :options="baseSetData.options"
                />
              </el-form-item>
              <el-form-item label="所在街道" clearable>
                <el-input v-model="baseSetData.street" />
              </el-form-item>
              <el-form-item label="联系电话" clearable prop="phone">
                <el-input v-model="baseSetData.phone" placeholder="输入电话号码" :prefix-icon="Phone" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleFormRef')">提交</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <div class="content-right">
              <div class="avatar-title">更换头像</div>
              <el-upload
                class="avatar-uploader"
                :action="baseUrl + '/admin/update/avatar/' + adminInfo.id"
                :show-file-list="false"
                :on-success="uploadImg"
                :before-upload="beforeImgUpload">
                <el-avatar :size="144" v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar" />
                <el-icon class="avatar-uploader-icon" v-else><Plus /></el-icon>
              </el-upload>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="安全设置">
        <el-empty description="description" />
      </el-tab-pane>
      <el-tab-pane label="账号绑定">
        <el-empty description="No Data" />
      </el-tab-pane>
      <el-tab-pane label="新消息通知">
        <el-empty description="description" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import { ElMessage } from 'element-plus'
import env from './../config/env'
import options from './../config/options'
import { Phone, Plus } from '@element-plus/icons-vue'
export default {
  setup () {
    return {
      Phone,
      Plus
    }
  },
  data () {
    return {
      tabPosition: 'left',
      labelPosition: 'top',
      baseSetData: {
        username: '',
        createtime: '',
        admin: '',
        id: '',
        email: 'learningcourseware@163.com',
        desc: '',
        options: options,
        street: '',
        phone: ''
      },
      baseSetRules: {
        phone: [
          { required: true, min: 11, max: 12, message: "请输入正确号码", trigger: "blur" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
            message: "请输入正确的号码"
          }
        ]
      },
      baseUrl: env.baseAPI,
      baseImgPath: env.imgBaseAPI,
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ElMessage({
            message: '提交成功！',
            type: 'success',
          })
        } else {
          ElMessage({
            message: '提交失败！',
            type: 'error',
          })
          return false;
        }
      })
    },
    uploadImg(res, file) {
      if (res.status == 1) {
        this.adminInfo.avatar = res.image_path
      }else{
        this.$message.error('上传图片失败！')
      }
    },
    beforeImgUpload(file) {
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    },
  },
  computed: {
    ...mapState(['adminInfo']),
  },
}
</script>

<style lang="scss" scoped>
@import './../assets/style/mixin.scss';
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.title {
  margin-left: 58px;
  margin-bottom: 12px;
  color: rgba(0,0,0,.85);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
}

.content-right {
  padding-left: 104px;
  .avatar-title {
    height: 22px;
    margin-bottom: 8px;
    color: rgba(0,0,0,.85);
    font-size: 14px;
    line-height: 22px;
  }
  .avatar-uploader {
    width: 144px;
    height: 144px;
    margin-bottom: 12px;
    overflow: hidden;
  }
}
</style>