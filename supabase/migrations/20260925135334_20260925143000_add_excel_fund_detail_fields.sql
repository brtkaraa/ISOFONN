ALTER TABLE funds
  ADD COLUMN IF NOT EXISTS application_system text,
  ADD COLUMN IF NOT EXISTS application_method text,
  ADD COLUMN IF NOT EXISTS supported_expenses text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS excluded_expenses text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS notes text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS source_links text[] NOT NULL DEFAULT '{}';