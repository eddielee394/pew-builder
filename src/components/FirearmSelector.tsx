import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setFirearm } from '../store/slices/configuratorSlice'
import { firearms } from '../data'

export function FirearmSelector() {
  const selectedFirearm = useAppSelector((s) => s.configurator.selectedFirearm)
  const dispatch = useAppDispatch()

  return (
    <section className="config-section">
      <h3>Firearm</h3>
      <div className="firearm-list">
        {firearms.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`firearm-card ${selectedFirearm?.id === f.id ? 'selected' : ''}`}
            onClick={() => dispatch(setFirearm(f))}
          >
            <span className="firearm-manufacturer">{f.manufacturer}</span>
            <span className="firearm-name">{f.name}</span>
            <span className="firearm-caliber">{f.caliber}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
