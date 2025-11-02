export interface CameraPosition {
  x: number;
  y: number;
  z: number;
}

export interface CameraRotation {
  x: number;
  y: number;
  z: number;
}

export interface CameraState {
  position: CameraPosition;
  rotation: CameraRotation;
}
