# kex-ui-v3

### 约定 （TODO）
- nodejs 16

### 目录结构

```bash
├── example # 组件库事例
├── packages
│   ├── ui                        # 组件库 
│   └── utils                     # 组件库公共方法
├── pnpm-lock.yaml
├── pnpm-workspace.yaml 
├── README.md
└── package.json
```

###  安装

```bash
pnpm install
```

### 开发

```bash
pnpm build # 首次运行&packages下的项目有更新
pnpm dev 
```

#### git约定

``` <type>(<scope>): <subject> ```
所代表的含义是：
+ type: 必选，本次提交的类型。
+ scope: 可选，表示本次提交影响的范围。
+ subject: 必选，对本次提交简短的描述。

例如：
```
git commit -m "chore: upgrade org.bouncycastle:bcprov-jdk15on from 1.69 to 1.70";
git commit -m "perf: optimize the code on global zookeeper";
git commit -m "docs(readme): fix typo";
```

##### type
type 的值必须是以下列表中的一个：
1. build/chore👷‍♀️: 用于构建系统（包括脚本、配置或工具）和依赖的变化。
2. ci: 用于系统持续集成、持续部署相关的配置文件、脚本文件、配置或者工具。
3. docs📝: 用于标识项目相关文档的更改。
4. feat✨: 用于标识新功能。
5. fix🐛: 用于标识bug修复。
6. perf⚡️: 用于标识性能提升。
7. refactor: 用于标识代码重构，既不添加新功能也不修复错误--例如删除冗余代码、简化代码、重命名变量等。
8. style: 用于标记代码格式化，代码风格调制，修复checkstyle等问题。
9. tets: 用于标记测试相关的更改，修改现有测试或添加新的测试。
10. revert: 用户分支回滚。

##### scope
scope 可以按照模块、包进行划分，具体使用可根据团队制定的规范，例如：
```
git commit -m "feat(logger): support JSONL log output format";
git commit -m "feat(dao): add global controller excepiton handler";
git commit -m "feat(api): add reqeust interceptor"
```

##### subject
对本次提交简短的描述，有以下准则：
+ 首字母小写。
+ 不以句号结尾

