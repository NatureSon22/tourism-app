import Constants, { ExecutionEnvironment } from "expo-constants";

export const EXPO_SERVICE_NAME = process.env.EXPO_SERVICE_NAME;
export const IS_EXPO_GO =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
export const TEMP_TOKEN_KEY = "@temp_dev_tokens";