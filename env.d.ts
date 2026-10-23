/// <reference types="expo/types" />

// Committed so `tsc` works in CI, where the generated (git-ignored)
// expo-env.d.ts does not exist.
declare module "*.png" {
  import type { ImageSourcePropType } from "react-native";
  const source: ImageSourcePropType;
  export default source;
}
