# 概要
sushi-botは寿司の注文を受付し、出前用のメニューを選択し住所を入力することで一連の受付を完了させる<br>
LINEで動作するbotです。

# 本番環境

bot ID: __@505ywxbh__

QR code: <br>[![Image from Gyazo](https://i.gyazo.com/be1785a71cd2cbb3f859dc06d0ae7079.png)](https://gyazo.com/be1785a71cd2cbb3f859dc06d0ae7079)

テスト用住所： __大阪府大阪市□□区××4-5-6__

# 制作背景

1. 利用率が普及してきたデリバリーサービスを、SNS利用率が圧倒的に高いLINEで手軽に済ませることができます。
2. iOS・Androidアプリ、と比べアプリをインストールしメールアドレス、住所を入力するといった流れを省くことが可能。
 
# デモ動画

注文受付、メニュー選択、住所入力の一連の流れです。<br><br>
[![Image from Gyazo](https://i.gyazo.com/a869707aff852e60002337a57c02e4f3.gif)](https://gyazo.com/a869707aff852e60002337a57c02e4f3)

# 工夫したポイント

・LINE DEvelopmentsを用いてLINE上にアカウントの基盤を構築した。<br>
・環境変数を設定することで、LINEのAPIを取得でくること。<br>
・Dialogflowを用いて特定の単語を含む文脈であれば返信を行う。<br><br>※参考画像<br>
[![Image from Gyazo](https://i.gyazo.com/8ff65f3c36155356513de36f4867e75f.png)](https://gyazo.com/8ff65f3c36155356513de36f4867e75f)<br>「特上」という単語を含んでいれば返信が可能です。<br>
[![Image from Gyazo](https://i.gyazo.com/0ed5679940dfd99d9df2557c22775234.png)](https://gyazo.com/0ed5679940dfd99d9df2557c22775234)

# 開発環境

### LINE Developers
[![Image from Gyazo](https://i.gyazo.com/b36ece151e9f3a06109097a858bb5260.jpg)](https://gyazo.com/b36ece151e9f3a06109097a858bb5260)

・主に、プロバイダーの作成やbotの設定などに利用しました。<br>
LINEのチャットbotを作成する上では必須のツールです。<br>
自身のLINEアカウントでログイン可能です。

### Dialogflow
[![Image from Gyazo](https://i.gyazo.com/d00a0500bf0fbd358a39c4a2c915a91c.png)](https://gyazo.com/d00a0500bf0fbd358a39c4a2c915a91c)

工夫したポイントの記載通り、ユーザーの発言が何を意図しているのか特定するために利用しました。<br>
本アプリでは、出前用メニューである「特上」「上」「並」の単語を含む文脈を送信した場合、<br>
注文を受け付けます。

### Heroku
[![Image from Gyazo](https://i.gyazo.com/65a33bb996f86e7edd7dfda31b906549.png)](https://gyazo.com/65a33bb996f86e7edd7dfda31b906549)

本アプリのデプロイ先として利用しました。

### 使用言語
JavaScript

# 課題や今後実装したい機能

1. LINE PAYと連携を行うことでキャッシュレス決算を実装
2. Google Mapなど地図アプリ連携することで住所入力を簡略化
