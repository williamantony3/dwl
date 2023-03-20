import { team } from "./team.model"
import { teamResponse } from "./teamResponse.model"

export type gameResponse = {
    segmentId: string
    away:teamResponse,
    gameId:string,
    gameName:string,
    home:teamResponse,
    locked:number,
    winner?:string
}