import { toManualReleaseDelegate } from 'puerts';
import { EIOEvent, ESetDOType, IOToolkit_BPF } from 'ue';

class IODevice {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }

    BindKey(keyName: string, eventType: EIOEvent, callback: () => void);
    BindKey<T1>(keyName: string, eventType: EIOEvent, callback: (arg1: T1) => void, arg1: T1): void;

    BindKey<T1, T2>(keyName: string, eventType: EIOEvent, callback: (arg1: T1, arg2: T2) => void, arg1: T1, arg2: T2): void;

    BindKey<T1, T2, T3>(
        keyName: string,
        eventType: EIOEvent,
        callback: (arg1: T1, arg2: T2, arg3: T3) => void,
        arg1: T1,
        arg2: T2,
        arg3: T3
    ): void;

    BindKey(keyName: string, eventType: EIOEvent, callback: (...args: any[]) => void, ...args: any[]): void {
        var _callback = callback;

        IOToolkit_BPF.IO_BindKey(
            this.name,
            keyName,
            eventType,
            toManualReleaseDelegate(() => {
                callback(...args);
            })
        );
    }

    /// 输入绑定
    BindAction(actionName: string, eventType: EIOEvent, callback: (key: string) => void);

    BindAction<T1>(actionName: string, eventType: EIOEvent, callback: (key: string, arg1: T1) => void, arg1: T1): void;

    BindAction<T1, T2>(
        actionName: string,
        eventType: EIOEvent,
        callback: (key: string, arg1: T1, arg2: T2) => void,
        arg1: T1,
        arg2: T2
    ): void;

    BindAction<T1, T2, T3>(
        actionName: string,
        eventType: EIOEvent,
        callback: (key: string, arg1: T1, arg2: T2, arg3: T3) => void,
        arg1: T1,
        arg2: T2,
        arg3: T3
    ): void;

    BindAction(actionName: string, eventType: EIOEvent, callback: (key: string, ...args: any[]) => void, ...args: any[]): void {
        IOToolkit_BPF.IO_BindAction(
            this.name,
            actionName,
            eventType,
            toManualReleaseDelegate((_key) => {
                callback(_key, ...args);
            })
        );
    }

    BindAxisKey(axisName: string, callback: (val: number) => void): void;

    BindAxisKey<T1>(axisName: string, callback: (val: number, arg1: T1) => void, arg1: T1): void;

    BindAxisKey<T1, T2>(axisName: string, callback: (val: number, arg1: T1, arg2: T2) => void, arg1: T1, arg2: T2): void;

    BindAxisKey<T1, T2, T3>(
        axisName: string,
        callback: (val: number, arg1: T1, arg2: T2, arg3: T3) => void,
        arg1: T1,
        arg2: T2,
        arg3: T3
    ): void;

    BindAxisKey(axisKey: string, callback: (val: number, ...args: any[]) => void, ...args: any[]): void {
        IOToolkit_BPF.IO_BindAxisKey(
            this.name,
            axisKey,
            toManualReleaseDelegate((_val) => {
                callback(_val, ...args);
            })
        );
    }

    BindAxis(axisName: string, callback: (val: number) => void): void;

    BindAxis<T1>(axisName: string, callback: (val: number, arg1: T1) => void, arg1: T1): void;

    BindAxis<T1, T2>(axisName: string, callback: (val: number, arg1: T1, arg2: T2) => void, arg1: T1, arg2: T2): void;

    BindAxis<T1, T2, T3>(
        axisName: string,
        callback: (val: number, arg1: T1, arg2: T2, arg3: T3) => void,
        arg1: T1,
        arg2: T2,
        arg3: T3
    ): void;

    BindAxis(axisName: string, callback: (val: number, ...args: any[]) => void, ...args: any[]): void {
        IOToolkit_BPF.IO_BindAxis(
            this.name,
            axisName,
            toManualReleaseDelegate((_val) => {
                callback(_val, ...args);
            })
        );
    }

    /// 输出控制
    SetDOOn(oaction: string): void {
        IOToolkit_BPF.IO_SetDOOn(this.name, oaction);
    }

    SetDOOff(oaction: string): void {
        IOToolkit_BPF.IO_SetDOOff(this.name, oaction);
    }

    SetDO(oaction: string, val: number): void {
        IOToolkit_BPF.IO_SetDO(this.name, oaction, val, ESetDOType.OAction);
    }

    SetDOKey(keyName: string, val: number): void {
        IOToolkit_BPF.IO_SetDO(this.name, keyName, val, ESetDOType.OAxis);
    }

    /// 实用函数
    GetKey(keyName: string): boolean {
        return IOToolkit_BPF.IO_GetKey(this.name, keyName);
    }

    GetKeyDown(keyName: string): boolean {
        return IOToolkit_BPF.IO_GetKeyDown(this.name, keyName);
    }

    GetKeyDownDuration(keyName: string): number {
        return IOToolkit_BPF.IO_GetKeyDownDuration(this.name, keyName);
    }

    GetKeyUp(keyName: string): boolean {
        return IOToolkit_BPF.IO_GetKeyUp(this.name, keyName);
    }

    GetAxis(axisName: string): number {
        return IOToolkit_BPF.IO_GetAxis(this.name, axisName);
    }

    GetAxisKey(axisName: string): number {
        return IOToolkit_BPF.IO_GetAxisKey(this.name, axisName);
    }
}

export default IODevice;
