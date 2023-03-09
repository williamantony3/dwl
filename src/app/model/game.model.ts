import { team } from "./team.model"
import { teamResponse } from "./teamResponse.model"

export type Game = {
    away:teamResponse,
    gameId:string,
    gameName:string,
    home:teamResponse,
    locked:number
}