import { Address, BigInt } from "@graphprotocol/graph-ts"

export function uintToAddress(n: BigInt): Address {
  return Address.fromString('0x' + n.toHex().slice(2).padStart(40, '0'))
}
