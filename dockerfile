# 构建阶段
FROM node:20-alpine AS build

WORKDIR /client-app


# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 清理npm缓存并安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 部署阶段
FROM nginx:alpine


# 将构建阶段生成的静态文件复制到 Nginx 的默认静态文件目录
COPY --from=build /client-app/dist /usr/share/nginx/html
