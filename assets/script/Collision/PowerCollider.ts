import { _decorator, BoxCollider, Component, Node } from "cc";
import { PowerBox } from "../GroundItem/PowerBox";
import { PowerBoxManager } from "../Managers/PowerBoxManager";
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
      () => {
        console.log(
          "Position Index--->>",
          this.node.getComponent(PowerBox).PositionTrack,
          "Name--->",
          this.node.name
        );
        this.PowerBoxMng.JsonPositionArray[
          this.node.getComponent(PowerBox).PositionTrack
        ].placed = false;
        this.node.destroy();
      },
      this
    );
  }

  update(deltaTime: number) {}
}
