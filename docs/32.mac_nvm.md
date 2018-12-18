# macos 上安装nvm

nvm是node的版本管理工具，可以让node在多个版本中进行切换。在开发中经常会遇到多个项目依赖多个不同版本的node环境，此时就需要nvm来快速切换node版本。

### 1. 卸载全局安装的npm包

查看当前全局安装的npm包

```shell
$ npm ls -g --depth=0
```

输出：

```
/usr/local/lib
├── @nestjs/cli@5.3.0
├── @vue/cli@3.0.0-beta.6
├── ava@0.25.0
├── cnpm@6.0.0
├── component@0.16.3
├── create-react-app@1.5.2
├── eslint@4.19.1
├── eslint_d@5.3.0
├── grunt-cli@0.1.11
├── http-server@0.11.1
├── inspect-process@0.5.0
├── nodemon@1.17.4
├── npm@6.4.1
├── pm2@2.10.3
├── supervisor@0.12.0
├── ts-node@6.0.1
├── typescript@3.1.1
├── wepy-cli@1.7.3
```

删除全局安装的包

```shell
$ npm uninstall -g xxx
```

### 2. 卸载全局安装的yarn包

查看当前全局安装的yarn包

```shell
$ yarn global list
```

输出:

```shell
yarn global v1.12.3
info "@nestjs/cli@5.7.1" has binaries:
   - nest
info "@tarojs/cli@0.0.71" has binaries:
   - taro
info "karma-cli@1.0.1" has binaries:
   - karma
info "mocha@5.2.0" has binaries:
   - mocha
   - _mocha
info "sass@1.15.2" has binaries:
   - sass
info "stylus@0.54.5" has binaries:
   - stylus
info "typescript@3.2.2" has binaries:
   - tsc
   - tsserver
info "webpack@4.16.0" has binaries:
   - webpack
info "webpack-cli@3.0.8" has binaries:
   - webpack-cli
info "wepy-cli@1.7.3" has binaries:
   - wepy
✨  Done in 1.02s.
```

删除全局安装的包
```shell
$ yarn global remove xxx
```

### 3. 删除当前安装的yarn/node

由于yarn依赖于node所以先卸载所有版本的yarn

```shell
$ brew uninstall --force yarn
```

再卸载所有版本的node

```shell
$ brew uninstall --force node
```

查看卸载是否成功

```shell
$ node -v
    command not found
$ yarn -v
    command not found
$ npm -v
    command not found
```

### 4. 安装nvm

1. clone npm git repo in root dir
    
    ```shell
    $ cd ~/
    $ git clone https://github.com/creationix/nvm.git .nvm
    ```
2. 下载最新的nvm

    ```shell
    $ cd ~/.nvm
    $ git checkout v0.33.11
    ```
3. 生效

    ```shell
    $ source ./nvm.sh
    ```

    在 ~/.bashrc, ~/.profile, 或者 ~/.zshrc 文件中添加以下命令

    ```bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
    ```

### 5. 安装yarn

    ```shell
    $ brew install yarn --without-node
    ```

### 6. 注意

不要使用homebrew安装nvm，官方文档明确指出 Homebrew installation is not supported。