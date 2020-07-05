<template>
  <div class="dashboard-container">
    <div class="do">
      <el-button type="primary" @click="openAddBugDialog">添加漏洞</el-button>
      <el-input v-model="input" placeholder="请输入搜索内容" @change="changeTableData"></el-input>
    </div>
    <!-- 漏洞列表 -->
    <DashBoardTable
      :table-data="tableData"
      :total="tableTotal"
      :isSearch="isSearchType"
      @tableParams="getparams"
    />

    <el-dialog title="添加漏洞" :visible.sync="addBugDialog" width="30%" :before-close="handleClose">
      <el-form ref="addBugForm" :model="addBugForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="addBugForm.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="addBugForm.description" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="方案">
          <el-input v-model="addBugForm.repair_plan" type="textarea" autosize />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBugDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAddBug">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DashBoardTable from "./dashboard-table";
import { getBugList, addBug, checkName } from "@/api/main";
import qs from "qs";

export default {
  name: "Dashboard",
  components: {
    DashBoardTable
  },
  data() {
    return {
      tableData: [],
      tableTotal: 0,
      isSearchType: false,
      params: {},
      addBugDialog: false,
      addBugForm: {
        name: "",
        description: "",
        repair_plan: ""
      },
      input: ""
    };
  },
  methods: {
    openAddBugDialog() {
      this.addBugDialog = true;
    },

    handleAddBug() {
      // 添加漏洞
      checkName(
        qs.stringify({
          name: this.addBugForm.name
        })
      )
        .then(res => {
          // console.log('checkName', res.data) // for debug
          addBug(qs.stringify(this.addBugForm))
            .then(res => {
              // console.log('addBug', res.data) // for debug
              this.$message.success("添加成功");
              location.reload();
            })
            .catch(err => {
              this.$message.error(err);
            });
        })
        .catch(err => {
          this.$message.error(err);
        });
    },

    handleClose() {
      // 关闭添加漏洞弹窗
      this.addBugForm = {
        name: "",
        description: "",
        repair_plan: ""
      };
      this.addBugDialog = false;
    },

    getTable(params) {
      getBugList(params)
        .then(res => {
          // 获取漏洞列表
          // console.log("getBugList", res.data); // for debug
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
.dashboard {
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
