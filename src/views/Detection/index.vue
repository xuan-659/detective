<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-02 17:35:04
-->

<template>
  <div>{{ $t('detection.title') }}</div>
  <div class="detection-container">
    <!-- 文件上传框 -->
    <el-upload
      class="upload-demo w-360 flex-item"
      v-model:file-list="fileList"
      :on-change="handleChange"
      drag
      :action="false"
      ref="uploadRef"
      :auto-upload="false"
      :on-remove="remove"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        {{ $t('detection.dragFile') }} <em>{{ $t('detection.click') }}</em>
      </div>
      <template #tip>
        <div class="el-upload__tip"> {{ $t('detection.uploadMsg') }} </div>
      </template>
    </el-upload>

    <!-- 三个按钮 -->
    <div>
      <el-button class="flex-item" type="success" @click="submit">
        {{ $t('detection.confirm') }}
      </el-button>
      <el-button class="flex-item" type="success" @click="analyse">
        {{ $t('detection.analyse') }}
      </el-button>
      <el-button class="flex-item" type="success" @click="openDialogFormHandler">
        {{ $t('detection.selectMsg') }}
      </el-button>
    </div>
    <!-- 上传成功 -->
    <div v-if="submitFlag" class="flex-item w-360">
      <el-tag class="f-14" type="success"
        >{{ $t('detection.file') }} {{ fileName }} {{ $t('detection.uploadSuccess') }}</el-tag
      >
    </div>

    <!-- 检测成功 -->
    <div v-if="analyseFlag" class="flex-item w-360">
      <el-tag class="f-14" :type="analyseType">{{ analyseText }}</el-tag>
    </div>

    <!-- 查找结果 -->
    <div v-if="selectFlag" class="flex-item w-800">
      <el-collapse>
        <template v-for="(v, index) in selectRes" :key="index">
          <el-collapse-item v-if="v.length !== 0" :title="getTitle(v)">
            <li v-for="s in v" :key="s.id"> 第{{ s.row }}行：{{ s.summary }} </li>
          </el-collapse-item>
        </template>
      </el-collapse>
    </div>
    <!-- 关键词弹框 -->
    <DialogForm
      ref="dialogFormRef"
      :title="$t('detection.seekKeywords')"
      :confirmBtnText="$t('detection.seek')"
      :formFields="formFields"
      :formData="formData"
      @confirm="confirm"
      width="700px"
    ></DialogForm>
  </div>
</template>
<script setup>
  import { useStore } from 'vuex';
  import { ref, reactive } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  const analyseType = ref('success');
  const store = useStore();
  const i18n = useI18n();

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
    if (!beforeUpload(fileList.value[0]?.raw)) return false;
    await store
      .dispatch('upload/upload', { file: fileList.value[0].raw })
      .then(() => {
        fileName.value = fileList.value[0]?.raw.name;
        submitFlag.value = true;
        analyseFlag.value = false;
        selectFlag.value = false;
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
      ElMessage.error(i18n.error('detection.addFile'));
      return false;
    }
    if (file.type != undefined) {
      const isXLS = file.type === 'application/vnd.ms-excel';
      if (isXLS) {
        return true;
      }
      const isXLSX =
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (isXLSX) {
        return true;
      }
      ElMessage.error(i18n.t('detection.formatError'));
      return false;
    } else {
      var name = file.name;
      var first = name.lastIndexOf('.');
      var namelength = name.length; //取到文件名长度
      var filesuffix = name.substring(first + 1, namelength); //截取获得后缀名
      console.log(filesuffix);
      if (filesuffix != 'xlsx' || filesuffix != 'xls') {
        ElMessage.error(i18n.t('detection.formatError'));
        return false;
      } else {
        return true;
      }
    }
  };

  // 分析功能
  const analyseFlag = ref(false);
  const analyseText = ref('');
  const analyseRes = ref(true);
  // TODO 文件完整性不合格校验
  // const analyseRes = false;
  const analyse = () => {
    if (!submitFlag.value) {
      ElMessage.error(i18n.t('detection.emptyError'));
      return false;
    }
    store.dispatch('upload/analyse', fileName.value).then((res) => {
      analyseText.value = res;
      if (res.indexOf('不合格') !== -1) {
        analyseType.value = 'danger';
        analyseText.value += ',请重新上传';
        analyseRes.value = false;
      } else {
        analyseType.value = 'success';
        analyseRes.value = true;
      }
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
        fileName: fileName.value,
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
      return `${i18n.t('detection.weakMatch')}(${v.length})`;
    } else if (v[0].count == 2) {
      return `${i18n.t('detection.generalMatch')}(${v.length})`;
    } else {
      return `${i18n.t('detection.highMatch')}(${v.length})`;
    }
  };

  // 弹框功能
  import DialogForm from '@/components/DialogForm';
  // 表单的数据
  const formFields = reactive([
    {
      prop: 'keyword1',
      label: i18n.t('detection.keyword1'),
    },
    {
      prop: 'keyword2',
      label: i18n.t('detection.keyword2'),
    },
    {
      prop: 'keyword3',
      label: i18n.t('detection.keyword3'),
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
    if (!keyWords.length) {
      ElMessage.error(i18n.t('detection.emptyKeywordsError'));
      return false;
    }
    select(keyWords);
  };
  const dialogFormRef = ref(null);
  const openDialogFormHandler = () => {
    if (!analyseFlag.value) {
      ElMessage.error(i18n.t('detection.analyseFlag'));
      return false;
    }
    if (!analyseRes.value) {
      ElMessage.error(i18n.t('detection.analyseError'));
      return false;
    }
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

  .w-800 {
    width: 800px;
  }
</style>
