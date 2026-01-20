import { defineConfig } from 'vite'

// 仓库名，如果前面改成别的，这里同步改
const repoName = 'env-plot'

export default defineConfig({
  base: `/${repoName}/`,   // 关键：告诉打包器资源放在 /xxx/ 子路径
  build: {
    outDir: 'dist'         // 默认输出目录
  }
})
