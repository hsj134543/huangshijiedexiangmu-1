<template>
  <div class="app-container">
    <div class="do">
      <el-button type="primary" @click="uploadDialog=true">点击上传</el-button>
      <el-input v-model="input" placeholder="请输入搜索内容" @change="changeTableData"></el-input>
    </div>
    <el-dialog title="点击上传" :visible.sync="uploadDialog" width="30%" >
      <el-upload
        drag
        action="http://47.105.182.216:2500/index/upload/upload"
        :headers="headers"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :limit="1"
        accept=".zip"
        :before-remove="beforeRemove"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div slot="tip" class="el-upload__tip">只能上传zip文件，上传文件并转化</div>
      </el-upload>
      <el-upload
        drag
        action="http://47.105.182.216:2500/index/upload/optimize"
        :headers="headers"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :limit="1"
        accept=".zip"
        :before-remove="beforeRemove"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div slot="tip" class="el-upload__tip">只能上传zip文件,上传文件并优化</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="uploadDialog = false">取 消</el-button> -->
        <el-button type="primary" @click="uploadDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <UploadTable
      :table-data="tableData"
      :total="tableTotal"
      :isSearch="isSearchType"
      @tableParams="getparams"
    />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import UploadTable from "./upload-table";
import { getUserFileList } from "@/api/main";
export default {
  components: {
    UploadTable
  },
  data() {
    return {
      fileList: [],
      headers: {
        token: Cookies.get("vue_admin_template_token")
      },
      uploadDialog: false,
      isSearchType: false,
      tableData: [],
      tableTotal: 0,
      input: ""
    };
  },
  methods: {
    handleRemove(file, fileList) {},

    handlePreview(file) {},

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleSuccess(res, file, fileList) {
      if (res.code) {
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
      this.fileList = [];
    },

    getTable(params) {
      getUserFileList(params)
        .then(res => {
          // 获取漏洞列表
          console.log("getUserFileList", res.data); // for debug
          this.tableData = res.data.data;
          this.tableTotal = res.data.total;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },

    changeTableData() {
      this.isSearchType = !this.isSearchType;
      this.getTable({ ...this.params, keyword: this.input, page: 1 });
    },

    getparams(val) {
      this.params = val;
      this.getTable({ ...this.params, keyword: this.input });
    }
  }
};
</script>

<style lang="scss" scoped>
.app {
  &-container {
    margin: 30px;
    .do {
      display: flex;
      justify-content: space-between;
      width: 90%;
      /deep/.el-input {
        width: 12%;
      }
    }
  }
}
</style>

