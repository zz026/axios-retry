<template>
  <el-button @click="handleSuccess">success get</el-button>
  <el-button @click="handleError">error put</el-button>
  <el-button @click="handleRetryPost">retry post</el-button>
</template>

<script>
import request from '@/utils/request';
import { ElNotification } from 'element-plus';

export default {
  name: 'TestRequest',
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
          ElNotification({
            title: '请求成功',
            message: JSON.stringify(res),
            type: 'success'
          });
        });
    };

    const handleError = () => {
      request
        .put('/test/error', {
          id: 1,
          timestamp: Date.now()
        })
        .then((res) => {
          ElNotification({
            title: '请求成功',
            message: JSON.stringify(res),
            type: 'success'
          });
        });
    };

    const handleRetryPost = () => {
      request
        .post('/test/retrypost', {
          id: 22222,
          timestamp: Date.now()
        })
        .then((res) => {
          ElNotification({
            title: '请求成功',
            message: JSON.stringify(res),
            type: 'success'
          });
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
