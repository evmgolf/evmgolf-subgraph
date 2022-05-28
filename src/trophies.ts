import { BigInt } from "@graphprotocol/graph-ts"
import { uintToAddress } from './util'
import {
  Trophies,
  Transfer,
  Created
} from "../generated/Trophies/Trophies"
import { TrophyEntity } from "../generated/schema"

export function handleTrophyTransfer(event: Transfer): void {
  const id = event.params.id.toString()
  let entity = TrophyEntity.load(id)

  if (entity) {
    if (!entity.creator) {
      entity.creator = event.params.to
      entity.created = event.block.number 
    }
  } else {
    entity = new TrophyEntity(id)
    entity.creator = event.params.to
    entity.created = event.block.number 
  }
  entity.owner = event.params.to 
  entity.save()
}

export function handleTrophyCreated(event: Created): void {
  const id = event.params.id.toString()
  let entity = TrophyEntity.load(id)
  if (!entity) {
    entity = new TrophyEntity(id)
  }
  entity.challenge = event.params.challenge
  entity.program = event.params.program
  entity.size = event.params.size
  entity.gasUsed = event.params.gas
  entity.save()
}
