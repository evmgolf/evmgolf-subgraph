import { BigInt } from "@graphprotocol/graph-ts"
import { uintToAddress } from './util'
import {
  Challenges,
  Transfer,
  ReviewChallenge
} from "../generated/Challenges/Challenges"
import { ChallengeEntity } from "../generated/schema"

export function handleChallengeTransfer(event: Transfer): void {
  const id = uintToAddress(event.params.id).toHex()
  let entity = ChallengeEntity.load(id)

  if (entity) {
    entity.owner = event.params.to
  } else {
    entity = new ChallengeEntity(id)
    entity.creator = event.params.to
    entity.owner = event.params.to
    entity.created = event.block.number
  }
  entity.save()
}

export function handleReviewChallenge(event: ReviewChallenge): void {
  const id = uintToAddress(event.params.id).toHex()
  const entity = ChallengeEntity.load(id)
  if (entity) {
    entity.accepted = event.params.accepted
    entity.save()
  }
}
