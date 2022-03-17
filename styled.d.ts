import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    inactiveColor: string;
    accentColor: string;
  }
}
