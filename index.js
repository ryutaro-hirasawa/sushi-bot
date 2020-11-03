// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const dialogflow = require("dialogflow");

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// Dialogflowのクライアントインスタンスを作成
const session_client = new dialogflow.SessionsClient({
    project_id: process.env.GOOGLE_PROJECT_ID,
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
    }
});

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type == "message" && event.message.type == "text"){
            if (event.message.text == "こんにちは"){
                // replyMessage()で返信し、そのプロミスをevents_processedに追加。
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "へいらっしゃい！！平澤寿司です！"
                }));
            }
            if (event.message.text == "住所"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "〒123-456 大阪府大阪市○○区△△１−２−３"
                }));
            }
            if (event.message.text == "電話番号"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "123-456-7890です。繋がらなければ留守電をお願いします！"
                }));
            }
            if (event.message.text == "営業時間"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "17:00~22:00です。毎週月曜日と年末年始はお休みです。"
                }));
            }
            if (event.message.text == "大阪府大阪市□□区××4-5-6"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "まいど！今から30分以内にお届けします！"
                }));
            }
            if (event.message.text == "注文キャンセル"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "あっしは残念です…お客さんにうちの味がわかっていただけないのが…"
                }));
            }
            if (event.message.text == "不味い"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "おととい来やがれ！"
                }));
            }
            events_processed.push(
                session_client.detectIntent({
                    session: session_client.sessionPath(process.env.GOOGLE_PROJECT_ID, event.source.userId),
                    queryInput: {
                        text: {
                            text: event.message.text,
                            languageCode: "ja",
                        }
                    }
                }).then((responses) => {
                    if (responses[0].queryResult && responses[0].queryResult.action == "handle-delivery-order"){
                        let message_text
                        if (responses[0].queryResult.parameters.fields.menu.stringValue){
                            message_text = `毎度！${responses[0].queryResult.parameters.fields.menu.stringValue}ね。どちらにお届けしましょ？`;
                        } else {
                            message_text = `毎度！出前のメニューは「特上」「上」「並」の3種類になっとりますけどどちらにしましょっか？`;
                        }
                        return bot.replyMessage(event.replyToken, {
                            type: "text",
                            text: message_text
                        });
                    }
                })
            );
        }
    });

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});
