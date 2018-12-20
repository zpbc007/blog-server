type MsgType = 'success' | 'info' | 'warn' | 'error';

export class Result<T = any> {
    constructor(msg: string, data: T, msgType: MsgType = 'success') {
        this.msg = msg;
        this.data = data;
        this.msgType = msgType;
    }

    // 提示信息
    msg: string = '';
    // 信息类型
    msgType: MsgType;
    // 数据
    data: T;
}
