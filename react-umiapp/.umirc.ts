import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: 'weapon',
      name: "Weapon",
      routes: [
        {
          path: 'rifle',
          name: "Rifle",
          component: "./weapon/Rifle",
        },
        {
          path: 'pistol',
          name: "Pistol",
          component: "./weapon/Pistol",
        },
        {
          path: 'cannon',
          name: "Cannon",
          component: "./weapon/Cannon",
        }
      ]
    },
    {
      path: 'monster',
      name: "Monster",
      routes: [
        {
          path: 'zombie',
          name: "Zombie",
          component: './monster/Zombie',
        },
        {
          path: 'spider',
          name: "Spider",
          component: './monster/Spider',
        },
        {
          path: 'demon',
          name: "Demon",
          component: './monster/Demon',
        }
      ]
    },

  ],
  fastRefresh: {},
  layout: {
    siderWidth: 200,
    title: "DOOM SLAYER",
    logo: "/doom.ico"
  },
  //开启国际化
  locale: {},

  //配置dva数据流
  dva: {
    immer: true,
    hmr: false,
  },
  // //配置msfu，配置后自动开启webpack5和dynamicImport
  mfsu: {},
  //配置webpack5
  webpack5: {},

  //路由组件按需加载和代码分割
  dynamicImport: {
    loading: "@/Loading"
  },

  //favicon本地文件需放置在public文件夹中
  favicon: 'doom.ico',
  //不包含路由按需加载，仅代码分割
  // dynamicImportSyntax: {},

  headScripts: [`console.log("RIP AND TEAR!");`],

  //代理
  proxy: {
    '/api': {
      'target': 'http://localhost:9999/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
  },
});
