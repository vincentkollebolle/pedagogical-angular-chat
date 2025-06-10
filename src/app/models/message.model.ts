import {Type} from "../enums/type.enums";

export interface Message {
  pseudo: string,
  message: string,
  type: Type
}
