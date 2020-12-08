import { BigInt } from "@graphprotocol/graph-ts"
import { Sentinel, Transfer, Burn } from "../generated/Sentinel/Sentinel"
import { _Transfer, _Burn } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let entity = _Transfer.load(event.params.value.toHex())

  if (entity == null) {
    entity = new _Transfer(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}

export function handleBurn(event: Burn): void {
  let entity = _Burn.load(event.params.value.toHex())

  if (entity == null) {
    entity = new _Burn(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.from = event.params.from
  entity.value = event.params.value
  entity.save()
}
