'use strict';

/**
 * UniPush 2.0 中转云函数
 * 接收 HTTP 请求，调用 uniCloud 推送能力
 * 部署说明：
 * 1. 上传此云函数
 * 2. 在云函数详情页开启“URL化”
 * 3. 获取公网 URL 并填入后端 UNICLOUD_PUSH_URL
 */
exports.main = async (event, context) => {
    // event 为客户端上传的参数
    let body = event.body;
    if (event.isBase64Encoded) {
        body = Buffer.from(body, 'base64').toString('utf8');
    }
    // 如果是 JSON 字符串则解析
    try {
        if (typeof body === 'string') {
            body = JSON.parse(body);
        }
    } catch (e) { }

    const param = body || event;

    const { cid, title, content, payload } = param;

    if (!cid) {
        return { code: 400, msg: 'Missing cid' };
    }

    try {
        // 使用应用的 AppID (从 manifest.json 中获取: __UNI__8E70E14)
        const pushManager = uniCloud.getPushManager({
            appId: "__UNI__8E70E14"
        });

        const res = await pushManager.sendMessage({
            "push_clientid": cid,
            "title": title || "新通知",
            "content": content || "您有一条新消息",
            "payload": payload,
            "force_notification": true,
            "request_id": context.requestId
        });
        return { code: 0, data: res };
    } catch (e) {
        return { code: 500, msg: e.message, stack: e.stack };
    }
};
