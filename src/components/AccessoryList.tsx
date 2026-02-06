import { useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { addAccessory, removeAccessory } from '../store/slices/configuratorSlice'
import { checkCompatibility } from '../types'
import { accessories } from '../data'
import type { AccessoryCategory } from '../types'

const CATEGORY_LABELS: Record<AccessoryCategory, string> = {
  optics: 'Optics',
  suppressors: 'Suppressors',
}

function AccessoryCard({
  acc,
  isMounted,
  compatible,
  onAdd,
  onRemove,
}: {
  acc: (typeof accessories)[number]
  isMounted: boolean
  compatible: boolean
  onAdd: () => void
  onRemove: () => void
}) {
  if (!compatible) {
    return (
      <div className="accessory-card disabled" title="Incompatible with this firearm">
        <span className="accessory-name">{acc.name}</span>
        <span className="accessory-manufacturer">{acc.manufacturer}</span>
        <span className="incompatible">Incompatible</span>
      </div>
    )
  }

  return (
    <div className={`accessory-card ${isMounted ? 'mounted' : ''}`}>
      <div className="accessory-info">
        <span className="accessory-name">{acc.name}</span>
        <span className="accessory-manufacturer">{acc.manufacturer}</span>
        <span className="accessory-weight">{acc.weight} oz</span>
      </div>
      {isMounted ? (
        <button type="button" className="btn-remove" onClick={onRemove}>
          Remove
        </button>
      ) : (
        <button type="button" className="btn-add" onClick={onAdd}>
          Add
        </button>
      )}
    </div>
  )
}

export function AccessoryList() {
  const selectedFirearm = useAppSelector((s) => s.configurator.selectedFirearm)
  const mountedAccessories = useAppSelector((s) => s.configurator.mountedAccessories)
  const dispatch = useAppDispatch()

  const mountedIds = new Set(mountedAccessories.map((m) => m.accessory.id))

  const accessoriesByCategory = useMemo(() => {
    const grouped = new Map<AccessoryCategory, (typeof accessories)[number][]>()
    for (const acc of accessories) {
      const list = grouped.get(acc.category) ?? []
      list.push(acc)
      grouped.set(acc.category, list)
    }
    return grouped
  }, [])

  if (!selectedFirearm) {
    return (
      <section className="config-section">
        <h3>Accessories</h3>
        <p className="hint">Select a firearm first</p>
      </section>
    )
  }

  return (
    <section className="config-section">
      <h3>Accessories</h3>
      {accessoriesByCategory.has('optics') && (
        <div className="accessory-category">
          <h4 className="accessory-category-title">{CATEGORY_LABELS.optics}</h4>
          <div className="accessory-list">
            {(accessoriesByCategory.get('optics') ?? []).map((acc) => {
              const result = checkCompatibility(selectedFirearm, acc)
              const isMounted = mountedIds.has(acc.id)
              return (
                <AccessoryCard
                  key={acc.id}
                  acc={acc}
                  isMounted={isMounted}
                  compatible={result.compatible}
                  onAdd={() => {
                    const point = result.validPoints[0]
                    const adapters = result.requiredAdapters[point.id] ?? []
                    dispatch(addAccessory({ accessory: acc, attachmentPoint: point, requiredAdapters: adapters }))
                  }}
                  onRemove={() => dispatch(removeAccessory(acc.id))}
                />
              )
            })}
          </div>
        </div>
      )}
      {accessoriesByCategory.has('suppressors') && (
        <div className="accessory-category">
          <h4 className="accessory-category-title">{CATEGORY_LABELS.suppressors}</h4>
          <div className="accessory-list">
            {(accessoriesByCategory.get('suppressors') ?? []).map((acc) => {
              const result = checkCompatibility(selectedFirearm, acc)
              const isMounted = mountedIds.has(acc.id)
              return (
                <AccessoryCard
                  key={acc.id}
                  acc={acc}
                  isMounted={isMounted}
                  compatible={result.compatible}
                  onAdd={() => {
                    const point = result.validPoints[0]
                    const adapters = result.requiredAdapters[point.id] ?? []
                    dispatch(addAccessory({ accessory: acc, attachmentPoint: point, requiredAdapters: adapters }))
                  }}
                  onRemove={() => dispatch(removeAccessory(acc.id))}
                />
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
