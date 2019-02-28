# scaffold

> 基于vue的手机UI框架

## Build Setup

``` bash
# install dependencies
npm install

# build a skeleton screen in dev_dist or test_dist or prod_dist directory
npm run skeletondev / npm run skeletontest / npm run skeleton

# serve with hot reload at localhost:8090
npm run dev

# build for production with minification in dev_dist or test_dist or prod_dist directory
npm run builddev / npm run buildtest / npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 目录结构

```
├── build/
├── config/
├── src/                                  // 业务代码目录
│   └── assets/styles/                    // 静态资源/样式
│   │   └── base/
│   │   │   └── _variables.less           // 定义变量
│   │   └── iconfonts/                    // 字体库
│   └── common/                           // 配置例如远程图片服务器根域名等 可自定义
│   └── components/                       // 自制公共组件
│   └── mixins/                           // 混入对象 可合并进vue实例的对象 包含任何组件选项
│   └── router/                           // 配置路由
│   └── service/                          // 请求后端接口配置、拦截器
│   └── store/                            // vue的状态管理模块
│   └── tools/                            // 工具类 包含常用方法
│   └── views/                            // 页面组件
│   └── App.vue                           // 根组件
│   └── main.js                           // 入口 vue实例化
├── static/                               // 业务代码外静态资源 打包后会合并进项目
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .postcssrc.js
├── README.md
├── index.html
├── package-lock.json
└── package.json
```