import { _decorator, Component, Node, Vec3 } from "cc";
const { ccclass, property } = _decorator;
import Colyseus from "db://colyseus-sdk/colyseus.js";
import { CarControl } from "../Controls/CarControl";
@ccclass("NetworkManager")
export class NetworkManager extends Component {
  @property({ type: Node })
  Car: Node = null;
  @property hostname = "localhost";
  @property port = 2567;
  @property useSSL = false;
  client!: Colyseus.Client;
  room!: Colyseus.Room;
  position: Vec3;
  angle: Vec3;
  start() {
    this.Car.parent.getComponent(CarControl).setNetworkManager(this);
    this.client = new Colyseus.Client(
      `${this.useSSL ? "wss" : "ws"}://${this.hostname}${
        [443, 80].includes(this.port) || this.useSSL ? "" : `:${this.port}`
      }`
    );
    // Connect into the room
    this.connect();
    setTimeout(() => {
      this.sendMyUpdateToRoomForGroundItem(
        "groundItemRandomNumber",
        [1, 2, 3, 4]
      );
    }, 1000);
  }
  async connect() {
    try {
      this.room = await this.client.joinOrCreate("my_room");

      console.log("joined successfully!");
      console.log("user's sessionId:", this.room.sessionId);
      console.log("room Id:", this.room.id);
      // Listening State updates from room server
      this.room.state.Car.onChange = (changes) => {
        this.position = this.Car.getPosition();
        this.angle = this.Car.eulerAngles;
        changes.forEach((change) => {
          console.log("CHANGES----->>", change);

          const { field, value } = change;
          switch (field) {
            case "position": {
              console.log("Call of position from server  ");
              this.position = value;
              break;
            }
            case "eularAngle": {
              console.log("Call of eular angle from server  ");
              this.angle = value;
              break;
            }
            case "weaponThrow": {
              console.log("Call of weaponfrom server  ");

              this.Car.parent.getComponent(CarControl).useWeapon();

              break;
            }
          }
        });
        this.Car.setPosition(this.position);
        this.Car.eulerAngles = this.angle;
      };
      this.room.state.GroundItem.onChange = (changes) => {
        let array = [];
        changes.forEach((change) => {
          const { field, value } = change;
          array = value;
          console.log("GroundChange", array);
          // switch (field) {
          //   case "position": {
          //     console.log("Call of position from server  ");
          //     this.position = value;
          //     break;
          //   }
          //   case "eularAngle": {
          //     console.log("Call of eular angle from server  ");
          //     this.angle = value;
          //     break;
          //   }
          //   case "weaponThrow": {
          //     console.log("Call of weaponfrom server  ");

          //     this.Car.parent.getComponent(CarControl).useWeapon();

          //     break;
          //   }
          // }
        });
      };
      this.room.onStateChange((state) => {
        //  console.log("onStateChange: ", state);
      });

      this.room.onLeave((code) => {
        console.log("onLeave:", code);
      });
    } catch (e) {
      console.error(e);
    }
  }
  public sendMyUpdateToRoom(msg: string, position: Vec3, Angle: Vec3) {
    this.room!.send(msg, { position, Angle });
    // console.log("Sending My Update To Room!");
  }
  public sendMyUpdateToRoomForWeapon(msg: string, weaponthrow: number) {
    console.log("weapon throw call to server");
    this.room!.send(msg, { weaponthrow });
  }
  public sendMyUpdateToRoomForGroundItem(
    msg: string,
    randomNumberArray: number[]
  ) {
    this.room!.send(msg, { randomNumberArray });
  }
  update(deltaTime: number) {}
}
