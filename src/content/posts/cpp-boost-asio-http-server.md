---
title: 用 C++ 和 Boost.Asio 手写一个 HTTP 服务器
published: 2026-09-10
description: 从零用 C++ 和 Boost.Asio 手写一个能处理静态页面和 API 接口的 HTTP 服务器,串起 HTTP 协议、单例、工厂与异步生命周期。
image: ""
tags: [C++, Boost.Asio, HTTP, 网络编程]
category: 技术
draft: false
---

网络编程学到后面，总要落一个具体项目来收口。我用 C++ 手写了一个能处理静态页面和 API 接口的 HTTP 服务器——项目本身不大，但把 HTTP 协议、单例模式、工厂模式、异步生命周期串成了一条线。这篇顺着它讲清楚「怎么做」和「为什么这么做」。

## 一、Web 服务器到底在做什么

一句话：**监听 → 接收 → 解析请求 → 路由分发 → 返回响应**。

对应到代码里，就是下面这张图的结构：

![项目结构](/assets/images/posts/cpp-boost-asio-http-server/architecture.png)

核心只有几个类：`WebServer`（服务器入口）、`HttpSession`（一次会话）、`HttpParser`（解析请求行）、`Handler` 家族（业务处理）、`HttpResponse`（拼响应报文）。

## 二、骨架：单例 + 异步接受

`WebServer` 全局只需要一个，天然适合单例——构造函数私有化，用一个静态方法拿到唯一实例：

```cpp
WebServer& WebServer::getInstance() {
    static WebServer obj;   // 静态局部对象，线程安全且只构造一次
    return obj;
}
```

监听和接受用 Boost.Asio 的 `acceptor`，接受连接是异步的：

```cpp
void WebServer::doAccept() {
    auto socket = std::make_shared<tcp::socket>(this->io);
    this->acceptor.async_accept(*socket, [this, socket](const boost::system::error_code& ec) {
        if (!ec) {
            auto session = std::make_shared<HttpSession>(socket, webRoot);
            session->do_read();          // 交给会话类去读数据
        }
        doAccept();                       // 继续等下一个连接
    });
    this->io.run();                       // 事件循环不能停
}
```

这里 `io.run()` 是 Asio 的事件循环，把整个 `io_context` 跑起来，注册的异步回调才会被触发。

## 三、会话：一次请求的生命周期

每个连接对应一个 `HttpSession`。这里有个关键点：异步回调是延迟执行的，如果回调执行时对象已经被销毁，就会访问野指针。所以 `HttpSession` 要继承 `std::enable_shared_from_this<HttpSession>`，在回调里 `shared_from_this()` 持有自己的智能指针，保证对象活到回调结束。

```cpp
void HttpSession::do_read() {
    auto self = shared_from_this();       // 关键：持有自身，防止提前析构
    boost::asio::async_read_until(*_socket, *buff, "\r\n\r\n",
        [this, self](const boost::system::error_code& ec, size_t) {
            this->on_read(ec);
        });
}
```

读到 `\r\n\r\n`（HTTP 报文头结束标志）后解析请求行：

```cpp
// HttpParser：一行 "GET /index.html HTTP/1.1" 拆成三部分
iss >> req.method >> req.path >> req.version;
```

## 四、路由 + 工厂：把「做什么」解耦

拿到请求后，无非两类：静态文件（HTML 页面）、API 接口（JSON）。如果直接在会话里写一堆 `if-else` 会越来越难维护，这里用工厂模式：按请求类型创建对应的 handler。

```cpp
// BaseHandler 定义统一接口
class BaseHandler {
public:
    virtual std::string handle(HttpRequest& req) = 0;
};

// 工厂：根据类型创建具体处理器
auto h = HandlerFactory::create(Router::router(req), webRoot);
std::string resp = h->handle(req);
```

`ApiHandler` 处理 `/api/status`、`/api/users` 等接口，返回 JSON；`HtmlHandler` 读静态文件返回页面，顺便做路径校验（防 `../` 目录遍历）。

## 五、响应与静态资源

`HttpResponse::ok` 负责拼出完整的响应报文——状态行 + 响应头（`Content-Type`、`Content-Length`）+ 空行 + 正文，这正是 HTTP 报文的骨架。文件读取和 MIME 判断交给 `FileUtil`，JSON 用 C++11 的 `R"(...)"` 原生字符串直接写，不用转义。

## 六、小结

这个项目把几块知识串起来了：

- **单例模式**：`WebServer` 全局唯一。
- **工厂模式**：按请求类型创建 handler，新增接口只加类不改旧代码。
- **HTTP 协议**：请求报文解析、响应报文构造、状态码语义。
- **异步生命周期**：`enable_shared_from_this` 解决回调悬挂指针。

麻雀虽小五脏俱全，看懂这一个项目，网络编程从理论到落地的那条路就走通了。
