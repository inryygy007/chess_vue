<template>
  <div class="register-box">
    <a-form
      ref="formRef"
      name="custom-validation"
      class="register-form"
      :model="formState"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
      @validate="handleValidate"
      @finishFailed="handleFinishFailed"
    >
      <!-- 用户名 -->
      <a-form-item has-feedback label="用户名" name="name">
        <a-input v-model:value="formState.name" type="text" autocomplete="off" />
      </a-form-item>
      <!-- 密码 -->
      <a-form-item has-feedback label="密码" name="pass">
        <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
      </a-form-item>
      <!-- 重复密码 -->
      <a-form-item has-feedback label="重复密码" name="checkPass">
        <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
      </a-form-item>
      <!-- 游戏 -->
      <a-form-item has-feedback label="邮箱" name="email">
        <a-input v-model:value="formState.email" type="email" autocomplete="off" />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { findName } from "../api/userApi";
const formRef = ref();

const formState = reactive({
  name: "",
  pass: "",
  checkPass: "",
  email: "",
});

let validatePass = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("请输入密码");
  } else {
    if (formState.checkPass !== "") {
      console.log(formRef.value, "不为空");
      formRef.value.validateFields("检查通过");
    }
    return Promise.resolve();
  }
};
let validatePass2 = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("请再次输入密码");
  } else if (value !== formState.pass) {
    return Promise.reject("两个输入不匹配!");
  } else {
    return Promise.resolve();
  }
};
const rules = {
  name: [
    {
      required: true,
      validator: async (_rule, value) => {
        if (value === "") {
          return Promise.reject("请输入用户名");
        } else {
          let data = await findName();
          console.log(data, "数据");
        }
      },
      trigger: "change",
    },
  ],
  pass: [
    {
      required: true,
      validator: validatePass,
      trigger: "change",
    },
  ],
  checkPass: [
    {
      required: true,
      validator: validatePass2,
      trigger: "change",
    },
  ],
  email: [
    {
      required: true,
      validator: async (_rule, value) => {
        if (value === "") {
          return Promise.reject("请输入邮箱");
        } else if (value !== "") {
        }
      },
      trigger: "change",
    },
  ],
};
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};
const handleFinish = (values) => {
  console.log("处理完成");
  console.log(values, formState);
};
const handleFinishFailed = (errors) => {
  console.log("没有处理通过");
  console.log(errors);
};
// 重置表单
const resetForm = () => {
  formRef.value.resetFields();
};
// 处理验证
const handleValidate = (...args) => {
  console.log("处理验证");
  console.log(args);
};
</script>

<style lang="scss" scoped></style>
