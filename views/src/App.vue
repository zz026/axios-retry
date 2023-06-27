<template>
  <el-button @click="handleSuccess">success get</el-button>
  <el-button @click="handleError">error put</el-button>
  <el-button @click="handleRetryPost">retry post</el-button>
</template>

<script>
import request from '../utils/request';
import { ElMessage } from 'element-plus';

export default {
  name: 'App',
  setup() {
    const handleSuccess = () => {
      request
        .get('/test/success', {
          params: {
            id: 1,
            timestamp: Date.now()
          }
        })
        .then((res) => {
          console.log('r', res);
          ElMessage.success('请求成功');
        });
    };

    const handleError = () => {
      request
        .put('/test/error', {
          id: 1,
          timestamp: Date.now()
        })
        .then((res) => {
          console.log('r', res);
          ElMessage.success('请求成功');
        });
    };

    const handleRetryPost = () => {
      request
        .post('/test/retrypost', {
          id: 22222,
          timestamp: Date.now()
        })
        .then((res) => {
          console.log('r', res);
          ElMessage.success('请求成功');
        });
    };

    return {
      handleSuccess,
      handleError,
      handleRetryPost
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
