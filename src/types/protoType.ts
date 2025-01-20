export type Proto = {
  settings: {
    poses:Pose;
    variations?: Variations;
  };
  admin: Admin;
  time: number;
  properties: Properties;
};

export type Variations = {
  [key: string]: {
    annotation: any[];
    img_bucket: string;
  };
}

export type Pose = {
  faces: number;
  sides: number;
  vertical: number;
}

export type Admin = {
  valid: boolean;
  log: Array<{
    changes: string | null;
    users?: any[];
  }>;
}

export type Properties = {
  sub: string | null;
  length: number | null;
  characteristic?: string;
  speciality?: string[];
  finer: string;
  broader?: string;
}