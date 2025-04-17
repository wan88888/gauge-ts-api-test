# Gauge TypeScript API Testing Framework

这是一个使用Gauge和TypeScript构建的API测试框架，设计用于测试RESTful API。它包含了JSONPlaceholder API的示例测试。

## 特性

- 使用TypeScript编写，提供类型安全
- 基于Gauge框架进行BDD风格测试
- 模块化架构与可重用组件
- 使用Axios的HTTP客户端
- 环境配置支持和灵活的配置管理
- 强大的测试辅助工具和断言库
- 结构化测试报告
- 请求/响应日志记录
- 内置错误处理和重试机制
- 性能跟踪功能

## 系统要求

- Node.js (v14或更高版本)
- Gauge CLI安装 (`npm install -g @getgauge/cli`)

## 项目结构

```
.
├── .env                     # 环境变量
├── specs/                   # Gauge规范
│   └── api/                 # API测试规范
│       ├── posts.spec       # 帖子API测试
│       └── users.spec       # 用户API测试
├── src/                     # 源代码
│   ├── api/                 # API特定代码
│   │   ├── clients/         # 不同端点的API客户端
│   │   ├── helpers/         # API测试辅助工具
│   │   └── models/          # 数据模型
│   └── utils/               # 实用工具和类
│       ├── config.ts        # 配置管理
│       ├── http-client.ts   # HTTP客户端
│       └── logger.ts        # 日志工具
├── tests/                   # Gauge测试实现
│   └── step_implementation.ts # 步骤实现
├── env/                     # Gauge环境配置
├── tsconfig.json            # TypeScript配置
└── package.json             # 项目依赖
```

## 安装

1. 克隆此仓库
2. 安装依赖:

```
npm install
```

## 配置

编辑`.env`文件以配置你的环境变量:

```
API_BASE_URL=https://jsonplaceholder.typicode.com
TIMEOUT=30000
RETRY_ATTEMPTS=3
RETRY_DELAY=1000
LOGGING_ENABLED=true
LOGGING_LEVEL=info
TEST_TIMEOUT=60000
```

## 运行测试

运行所有测试:

```
npm test
```

只运行API测试:

```
npm run test:api
```

运行特定规范文件:

```
gauge run specs/api/posts.spec
```

## 框架特点

### HTTP客户端

- 自动请求/响应日志记录
- 集成错误处理
- 类型安全的请求和响应
- 自定义拦截器支持

### 测试助手

- 验证响应结构的辅助方法
- 生成测试数据的工具
- 重试机制 - 自动重试不稳定的API调用
- 类型安全的数据存储访问

### 断言库

- 丰富的断言功能 
- 详细的错误消息
- 类型安全的断言
- 结构验证工具

## 扩展框架

### 添加新的API客户端

1. 在`src/api/models/`中创建新模型
2. 在`src/api/clients/`中创建新客户端
3. 根据需要在`src/api/helpers/test.helper.ts`中添加辅助方法
4. 根据需要在`src/api/helpers/assertions.ts`中添加断言方法

### 添加新测试

1. 在`specs/api/`中创建新的规范文件
2. 在`tests/step_implementation.ts`中实现步骤

## 最佳实践

- 使用`ApiTestHelper.retry()`来处理不稳定的API调用
- 使用`ApiAssertions`类进行一致的断言
- 使用断言辅助方法提高可读性
- 使用Gauge的数据存储在步骤之间共享数据

## 许可证

MIT 