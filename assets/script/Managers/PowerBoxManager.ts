import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PowerBoxManager")
export class PowerBoxManager {
  private static _instance: PowerBoxManager = null;
  JsonPositionArray = [];
  CurrentCarPowerBox = null;
  static getInstance(): PowerBoxManager {
    if (!PowerBoxManager._instance) {
      PowerBoxManager._instance = new PowerBoxManager();
    }
    return PowerBoxManager._instance;
  }
}
