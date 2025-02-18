import { INTERCOM_API, isServe } from "@/config/global";
import { boot, Intercom as messenger, shutdown, update } from "@intercom/messenger-js-sdk";

export class Intercom {
  private static loaded = false;
  public static load(wallet: string) {
    if (isServe()) {
      return false;
    }
    if (Intercom.loaded) {
      return Intercom.boot(wallet);
    }
    messenger({
      app_id: INTERCOM_API,
      user_id: wallet,
      PositionsDetailes: `https://grafana9.nolus.network/d/ea14ddcc-73ed-4810-89be-fb5e035edee51/wallet-checker?orgId=1&var-walletAddress=${wallet}`
    });
    Intercom.loaded = true;
  }

  public static update(data = {}) {
    if (Intercom.loaded) {
      update(data);
    }
  }

  public static disconnect() {
    shutdown();
  }

  private static boot(wallet: string) {
    boot({
      app_id: INTERCOM_API,
      user_id: wallet,
      PositionsDetailes: `https://grafana9.nolus.network/d/ea14ddcc-73ed-4810-89be-fb5e035edee51/wallet-checker?orgId=1&var-walletAddress=${wallet}`
    });
  }
}
