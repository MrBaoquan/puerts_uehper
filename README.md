# 基于 puerts-unreal 的上层开发框架

## 使用步骤

1. 安装插件 PuerTS
   将 Puerts 插件文件夹放入项目的 Plugins 目录下
2. 安装插件 UEHper
   git clone https://github.com/mrbaoquan/UEHper.git Plugins/UEHper
3. 安装 puerts_uehper
   git clone https://github.com/mrbaoquan/puerts_uehper.git TypeScript/puerts_uehper
4. 初始化操作
   `node TypeScript/puerts_uehper/enable_uehper.js`

    若编译阶段失败，尝试修改后重新编译
    `npx tsc --build ./tsconfig.json`

5. 打开 UE 工程

6. 设置 GameMode 为 TS_GameMode

## 项目设置

1. 禁用 Async Loading Thread Enabled
2. 打包设置中，Addtional Non-Asset Directories to Copy 中添加 Content/JavaScript
