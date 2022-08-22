export interface NgrxStepper {
  uid: string;
  steps: {
    [key: string]: NgrxStep
  };
}

export interface NgrxStep {
  uid: string;
  value: any;
  dirty: boolean;
  valid: boolean;
  label: string;
  errors: any;
}
