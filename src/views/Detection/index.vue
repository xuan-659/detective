<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-05-30 23:34:28
-->

<template>
  <div>缺陷检测</div>
  <div class="detection-container">
    <!-- <div class="w-360">上传文件</div> -->
    <el-upload
      class="upload-demo w-360 flex-item"
      v-model:file-list="fileList"
      :on-change="handleChange"
      drag
      action="Fake Action"
      ref="uploadRef"
      :auto-upload="false"
      :on-remove="remove"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text"> 拖动文件或 <em>点击上传</em> </div>
      <template #tip>
        <div class="el-upload__tip"> 请上传待检测的excel文件 </div>
      </template>
    </el-upload>
    <el-button class="flex-item" type="success" @click="submit" :loading="loading">
      确认上传
    </el-button>
    <el-button class="flex-item" type="success" @click="ala" :loading="loading"> 分析 </el-button>
    <el-button class="flex-item" type="success" @click="sel" :loading="loading"> 来测 </el-button>
  </div>
</template>
<script setup>
  import { useStore } from 'vuex';
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  const loading = ref();
  const store = useStore();
  const fileList = ref([]);
  const uploadRef = ref();

  const ala = () => {
    store.dispatch('upload/analyse', '45-A4-功能测试Bug缺陷报告清单.xls').then();
  };

  const sel = () => {
    store
      .dispatch('upload/selectMsg', {
        fileName: '45-A4-功能测试Bug缺陷报告清单.xls',
        keyWords: ['新增资产', '你好', '登录'],
      })
      .then();
  };

  const handleChange = (uploadFile) => {
    fileList.value = [uploadFile];
    console.log('change', fileList.value[0].raw);
  };

  const remove = () => {
    fileList.value.pop();
  };

  // 文件上传校验
  const beforeUpload = (file) => {
    console.log(file);
    // 文件为空
    if (!file) {
      ElMessage.error('请添加文件');
      return false;
    }
  };

  async function submit() {
    beforeUpload(fileList.value[0]?.raw);
    loading.value = true;
    await store
      .dispatch('upload/upload', { file: fileList.value[0].raw })
      .then(() => {
        loading.value = false;
        uploadRef.value.clearFiles();
        fileList.value.pop();
      })
      .catch((err) => {
        console.log(err);
        loading.value = false;
      });
  }
</script>
<style lang="scss" scoped>
  .detection-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .el-icon--upload {
    font-size: 67px;
    color: var(--el-text-color-placeholder);
    margin-bottom: 16px;
    line-height: 50px;
  }

  .upload-demo {
    height: 250px;
  }

  .upload-demo::v-deep .el-upload-dragger {
    padding: 40px;
  }

  .w-360 {
    width: 360px;
  }

  .flex-item {
    margin: 5px;
  }
</style>
