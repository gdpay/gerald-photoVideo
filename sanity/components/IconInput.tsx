import { set, unset, type StringInputProps } from 'sanity';
import { ICONS, ICON_NAMES } from '../../src/lib/icons';

// Studio input that shows every available icon; click one to select it, click it again to clear.
export function IconInput({ value, onChange, readOnly }: StringInputProps) {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))',
          gap: 6,
        }}
      >
        {ICON_NAMES.map((name) => {
          const Icon = ICONS[name];
          const selected = value === name;
          return (
            <button
              key={name}
              type="button"
              title={name}
              aria-label={name}
              aria-pressed={selected}
              disabled={readOnly}
              onClick={() => onChange(selected ? unset() : set(name))}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 44,
                borderRadius: 6,
                cursor: readOnly ? 'default' : 'pointer',
                color: 'inherit',
                border: selected
                  ? '2px solid var(--card-focus-ring-color, #2276fc)'
                  : '1px solid var(--card-border-color, rgba(128, 128, 128, 0.35))',
                background: selected ? 'var(--card-bg2-color, rgba(34, 118, 252, 0.12))' : 'transparent',
              }}
            >
              <Icon size={20} strokeWidth={1.75} />
            </button>
          );
        })}
      </div>
      <p style={{ margin: '8px 0 0', fontSize: 13, opacity: 0.7 }}>
        {value ? `Selected: ${value}` : 'No icon selected; the website uses its default.'}
      </p>
    </div>
  );
}
