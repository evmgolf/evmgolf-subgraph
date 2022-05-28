import { BigInt } from "@graphprotocol/graph-ts"
import { uintToAddress } from './util'
import {
  Programs,
  Transfer
} from "../generated/Programs/Programs"
import { ProgramEntity } from "../generated/schema"

export function handleProgramTransfer(event: Transfer): void {
  const id = uintToAddress(event.params.id)
  let entity = ProgramEntity.load(id.toHex())

  if (entity) {
    entity.owner = event.params.to
  } else {
    entity = new ProgramEntity(id.toHex())
    entity.creator = event.params.to
    entity.owner = entity.creator
    entity.created = event.block.number
  }
  entity.save()
}
