export class Result<T = any> {
    constructor(msg: string, data: T) {
        this.msg = msg;
        this.data = data;
    }
    // 提示信息
    msg: string = '';
    // 数据
    data: T;
}
