# 妈妈健康幸福祝福网页

这是一个零依赖静态网页，主题是“祝妈妈健康幸福”。

## 本地预览

直接打开 `index.html` 即可预览。

## 修改内容

- 页面标题和分享描述：编辑 `index.html`。
- 祝福信内容：编辑 `script.js` 顶部的 `blessing.paragraphs`。
- 首屏图片：替换 `assets/hero.png`。

## EdgeOne Pages 部署

首次使用需要登录：

```powershell
npm install -g edgeone
edgeone login
```

部署：

```powershell
edgeone pages deploy . -n mom-health-happiness
```

如果使用中国站账号，登录时请选择 China。
