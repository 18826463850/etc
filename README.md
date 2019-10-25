# 智慧出行ETC项目

## vue-etc Web前端

## 概述

### 编写目的

#### 目的阐述

+  为项目的开发设计的依据与指导。
+  为参与该项目的编程人员提供依据；
+  为修改、维护提供条件；
+  项目负责人将按计划书的要求布置和控制开发工作全过程；
+  项目质量保证组将按此计划书做阶段性和总结性的质量验证和确认。

#### 读者对象

+  项目开发人员，特别是编程人员；
+  软件维护人员；
+  技术管理人员；
+  执行软件质量保证计划的专门人员；
+  参与本项目开发进程各阶段验证、确认以及负责为最后项目验收、鉴定提供相应报告的有关人员。
+  合作各方有关部门的负责人；项目组负责人和全体参加人员。

#### 注意事项

+  权限审查：此文档仅供技术部功能组内部使用。
+  保存备份：此文档允许修改，允许本地备份。
+  该文档采用 markdown 编写规范，建议使用markdownPad查看和修改。



## 安装部署说明

### nginx配置例子

~~~
server {

    listen 80;
    server_name  域名;
    default_type 'text/html';
    
    # 项目代码目录配置
    root   E:\ued\dist;
    
    index index.html;
    
    location / {
        try_files $uri $uri/ @router;
        index index.html;
    }
    
    location @router {
        rewrite ^.*$ /index.html last;
    }
}
~~~
> 参考资料
+ [记录一次vue-cli项目上线到阿里云并配置Nginx服务器的经历](https://blog.csdn.net/qq_33036599/article/details/82789666)
