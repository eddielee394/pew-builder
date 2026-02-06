import { useAppSelector } from '../store/hooks'

export function BuildSummary() {
  const selectedFirearm = useAppSelector((s) => s.configurator.selectedFirearm)
  const mountedAccessories = useAppSelector((s) => s.configurator.mountedAccessories)

  if (!selectedFirearm) return null

  const baseWeight = selectedFirearm.baseWeight
  const accessoryWeight = mountedAccessories.reduce((sum, m) => sum + m.accessory.weight, 0)
  const totalWeight = baseWeight + accessoryWeight

  return (
    <section className="build-summary">
      <h3>Build Summary</h3>
      <div className="summary-grid">
        <div className="summary-item">
          <span className="label">Total weight</span>
          <span className="value">{(totalWeight / 16).toFixed(2)} lbs</span>
        </div>
        <div className="summary-item">
          <span className="label">Base</span>
          <span className="value">{(baseWeight / 16).toFixed(2)} lbs</span>
        </div>
        <div className="summary-item">
          <span className="label">Accessories</span>
          <span className="value">{(accessoryWeight / 16).toFixed(2)} lbs</span>
        </div>
      </div>
    </section>
  )
}
