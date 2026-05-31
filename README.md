# 表白网站

这是一个零依赖的静态表白网站，可以直接部署到 GitHub Pages、Netlify、Cloudflare Pages 或任意静态托管服务。

## 修改内容

- 改名字和信件内容：编辑 `script.js` 顶部的 `confession`，当前对象是“笑笑”。
- 改标题和分享描述：编辑 `index.html` 里的 `<title>`、`description` 和 `og:*`。
- 改首屏图片：替换 `assets/hero.png`，文件名保持不变即可。

## 本地预览

直接双击打开 `index.html` 就可以预览。也可以在这个目录启动任意静态服务器。

## 公开发布

### GitHub Pages

1. 新建一个 GitHub 仓库，把本目录所有文件上传到仓库根目录。
2. 打开仓库的 `Settings` -> `Pages`。
3. `Build and deployment` 选择 `Deploy from a branch`。
4. `Branch` 选择 `main` 和 `/root`，保存。
5. 等待 GitHub 生成公开网址，通常是 `https://你的用户名.github.io/仓库名/`。

### Netlify

1. 打开 Netlify，新建站点。
2. 选择从 GitHub 导入这个仓库，或直接拖拽整个文件夹上传。
3. 构建命令留空，发布目录填 `.`。

### Cloudflare Pages

1. 新建 Pages 项目并连接仓库。
2. Framework preset 选择 `None`。
3. Build command 留空，Output directory 填 `.`。
