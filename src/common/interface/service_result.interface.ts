export interface ServiceResult<T> {
    msg: string;
    result: boolean;
    data: T;
}

export function createServiceResult<T = any>(result: boolean, msg?: string, data?: T): ServiceResult<T> {
    return {
        result,
        msg,
        data,
    };
}
