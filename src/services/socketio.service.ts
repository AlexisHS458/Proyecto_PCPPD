import { rtcSocket } from "@/socketio";

class SocketIOService {
  connect(): void {
    rtcSocket.on("output:scenario1", listener => {
      console.log(listener);
    });
  }
}

export default new SocketIOService();
