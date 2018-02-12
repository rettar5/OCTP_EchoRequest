import { OdnTweetData, OdnTweets } from "../../../odnTweets"
import { OdnPlugins, OdnPluginResultData } from "../../../odnPlugins";
import {Log, OdnUtils} from "../../../odnUtils";

export class EchoRequest {
  constructor(private tweetData: OdnTweetData, private fullName: string) {}

  /**
   * プラグインのメイン処理を実行
   *
   * @param {(isProcessed?: boolean) => void} finish
   */
  run(finish: (isProcessed?: boolean) => void) {
    const tweets = new OdnTweets(this.tweetData.accountData);
    tweets.text = "@" + this.tweetData.user.screenName + " Echo Reply";
    tweets.targetTweetId = this.tweetData.idStr;

    // ツイートを投稿
    tweets.postTweet((isSuccess) => {
      tweets.likeTweet();
      finish();
    });
  }

  /**
   * プラグインを実行するかどうか判定
   *
   * @param {OdnTweetData} tweetData
   * @returns {boolean}
   */
  static isValid(tweetData: OdnTweetData): boolean {
    return tweetData.isReplyToMe() && tweetData.command.match(/^(echo)$/gi) && tweetData.action.match(/^(request)$/gi) ? true : false;
  }
}
