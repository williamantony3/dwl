import { team } from "./team.model"

export type Game = {
    away:team,
    gameId:string,
    gameName:string,
    home:team,
    locked:number
}