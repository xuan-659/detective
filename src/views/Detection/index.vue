<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-01 22:46:15
-->

<template>
  <div>缺陷检测</div>
  <div class="detection-container">
    <!-- 文件上传框 -->
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

    <!-- 三个按钮 -->
    <div>
      <el-button class="flex-item" type="success" @click="submit"> 确认上传 </el-button>
      <el-button class="flex-item" type="success" @click="analyse"> 完整性检测 </el-button>
      <el-button class="flex-item" type="success" @click="openDialogFormHandler">
        查找缺陷用例
      </el-button>
    </div>
    <!-- 上传成功 -->
    <div v-if="submitFlag" class="flex-item w-360">
      <el-tag class="f-14" type="success">文件{{ fileName }}上传成功</el-tag>
    </div>

    <!-- 检测成功 -->
    <div v-if="analyseFlag" class="flex-item w-360">
      <el-tag class="f-14" type="success">{{ analyseText }}</el-tag>
    </div>

    <!-- 查找结果 -->
    <div v-if="selectFlag">
      <el-collapse v-model="activeNames">
        <template v-for="v in selectRes" :key="v[0].id">
          <el-collapse-item v-if="v.length !== 0" :title="getTitle(v)" :name="v[0].id">
            <li v-for="s in v" :key="s.id">
              {{ s.summary }}
            </li>
          </el-collapse-item>
        </template>
      </el-collapse>
    </div>
    <!-- 关键词弹框 -->
    <DialogForm
      ref="dialogFormRef"
      title="关键词查找"
      confirmBtnText="查找"
      :formFields="formFields"
      :formData="formData"
      :rules="rules"
      @confirm="confirm"
      width="700px"
    ></DialogForm>
  </div>
</template>
<script setup>
  import { useStore } from 'vuex';
  import { ref, reactive } from 'vue';
  import { ElMessage } from 'element-plus';
  const store = useStore();

  // 提交功能
  const fileList = ref([]);
  const uploadRef = ref();
  const fileName = ref('');

  const submitFlag = ref(false);

  const handleChange = (uploadFile) => {
    fileList.value = [uploadFile];
    console.log('change', fileList.value[0].raw);
  };

  async function submit() {
    beforeUpload(fileList.value[0]?.raw);
    await store
      .dispatch('upload/upload', { file: fileList.value[0].raw })
      .then(() => {
        fileName.value = fileList.value[0]?.raw.name;
        submitFlag.value = true;
        // console.log(fileList.value[0]?.raw.name)
        uploadRef.value.clearFiles();
        fileList.value.pop();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  // 分析功能
  const analyseFlag = ref(false);
  const analyseText = ref('');
  const analyse = () => {
    store.dispatch('upload/analyse', fileName.value).then((res) => {
      analyseText.value = res;
      analyseFlag.value = true;
    });
  };

  // 查找功能
  const selectFlag = ref(false);
  const selectRes = ref([[], [], []]);
  const select = (keyWords) => {
    console.log('keyWords', keyWords);
    store
      .dispatch('upload/selectMsg', {
        fileName: '45-A4-功能测试Bug缺陷报告清单.xls',
        keyWords,
      })
      .then((res) => {
        selectFlag.value = true;
        console.log('匹配信息', res);
        for (let v of res) {
          selectRes.value[3 - v.count].push(v);
        }
        console.log(selectRes.value);
      });
  };

  const getTitle = (v) => {
    if (v[0].count == 1) {
      return '弱匹配(1)';
    } else if (v[0].count == 2) {
      return '一般匹配(2)';
    } else {
      return '高度匹配(3)';
    }
  };

  // 弹框功能
  import DialogForm from '@/components/DialogForm';
  // 表单的数据
  const formFields = reactive([
    {
      prop: 'keyword1',
      label: '关键词1',
    },
    {
      prop: 'keyword2',
      label: '关键词2',
    },
    {
      prop: 'keyword3',
      label: '关键词3',
    },
  ]);
  //定义表单数据
  const formData = reactive({
    keyword1: '',
    keyword2: '',
    keyword3: '',
  });

  const confirm = (formdata) => {
    let keyWords = [];
    for (let v of Object.values(formdata)) {
      if (v && v != '') {
        keyWords.push(v);
      }
    }

    select(keyWords);
  };
  const dialogFormRef = ref(null);
  const openDialogFormHandler = () => {
    console.log(dialogFormRef);
    dialogFormRef.value.openDialog();
  };

  // 关键词查找结果
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

  .f-14 {
    font-size: 14px;
  }
</style>
