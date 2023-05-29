import { _decorator, Component, Node, Vec3 } from "cc";
const { ccclass, property } = _decorator;
import Colyseus from "db://colyseus-sdk/colyseus.js";
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
    this.client = new Colyseus.Client(
      `${this.useSSL ? "wss" : "ws"}://${this.hostname}${
        [443, 80].includes(this.port) || this.useSSL ? "" : `:${this.port}`
      }`
    );
    // Connect into the room
    this.connect();
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
          console.log("CHANGES A", change);
          const { field, value } = change;
          switch (field) {
            case "x": {
              this.position.x = value;
              break;
            }
            case "y": {
              this.position.y = value;
              break;
            }
            case "z": {
              this.position.z = value;
              break;
            }
            case "rotationx": {
              this.angle = new Vec3(value, this.angle.y, this.angle.z);
              break;
            }
            case "rotationy": {
              this.angle = new Vec3(this.angle.x, value, this.angle.z);
              break;
            }
            case "rotationz": {
              this.angle = new Vec3(this.angle.x, this.angle.y, value);
              break;
            }
          }
        });
        this.Car.setPosition(this.position);
        this.Car.eulerAngles = this.angle;
      };
      this.room.onStateChange((state) => {
        console.log("onStateChange: ", state);
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
  update(deltaTime: number) {
    this.sendMyUpdateToRoom(
      "moveCar",
      this.Car.getPosition(),
      this.Car.eulerAngles
    );
    this.Car.setPosition(this.position);
    this.Car.eulerAngles = this.angle;
  }
}
