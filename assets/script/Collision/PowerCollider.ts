import { _decorator, BoxCollider, Component, Node } from "cc";
import { PowerBox } from "../GroundItem/PowerBox";
import { PowerBoxManager } from "../Managers/PowerBoxManager";
import { Car } from "../Car/Car";
const { ccclass, property } = _decorator;

@ccclass("PowerCollider")
export class PowerCollider extends Component {
  PowerBoxTrigger: BoxCollider = null;
  PowerBoxMng: PowerBoxManager = null;
  start() {
    this.PowerBoxMng = PowerBoxManager.getInstance();
    this.PowerBoxTrigger = this.node.getComponent(BoxCollider);
    this.PowerBoxTrigger.on(
      "onTriggerEnter",
      (EventType) => {
        if (
          this.PowerBoxMng.CurrentCarPowerBox == null &&
          EventType.otherCollider.name == "RootNode<BoxCollider>"
        ) {
          this.node.destroy();
          this.PowerBoxMng.CurrentCarPowerBox =
            this.node.getComponent(PowerBox).PowerBoxInfo;
          this.PowerBoxMng.JsonPositionArray[
            this.node.getComponent(PowerBox).PositionTrack
          ].placed = false;
        } else {
          console.log("ALreay Have Weapons");
        }
      },

      this
    );
  }

  update(deltaTime: number) {}
}
