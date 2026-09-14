/*
# Create developer portal announcements

1. New Tables
- `portal_announcements` stores the shared announcements shown on the ZiCON Developer Portal dashboard.
- `id` is a generated UUID primary key.
- `title` is the announcement headline.
- `description` is the supporting copy.
- `published_label` is the human-readable age label shown in the dashboard.
- `icon` identifies the small visual treatment used by the portal.
- `sort_order` controls display order.
- `created_at` records when the row was added.

2. Security
- Row level security is enabled.
- The portal is a single-tenant, public dashboard with no sign-in screen, so anon and authenticated users may read the shared announcements.
- Insert, update, and delete are allowed for the same shared dashboard surface so future portal management actions can use the table.

3. Important Notes
- Seed rows are inserted only when missing so this migration is safe to re-run.
- No existing tables or user data are modified.
*/

CREATE TABLE IF NOT EXISTS portal_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  published_label text NOT NULL,
  icon text NOT NULL DEFAULT 'document',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE portal_announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read portal announcements" ON portal_announcements;
CREATE POLICY "Public can read portal announcements"
  ON portal_announcements FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public can add portal announcements" ON portal_announcements;
CREATE POLICY "Public can add portal announcements"
  ON portal_announcements FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update portal announcements" ON portal_announcements;
CREATE POLICY "Public can update portal announcements"
  ON portal_announcements FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can delete portal announcements" ON portal_announcements;
CREATE POLICY "Public can delete portal announcements"
  ON portal_announcements FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS portal_announcements_sort_order_idx
  ON portal_announcements (sort_order, created_at DESC);

INSERT INTO portal_announcements (title, description, published_label, icon, sort_order)
SELECT seed.title, seed.description, seed.published_label, seed.icon, seed.sort_order
FROM (VALUES
  ('ZiCON Bolt v2.0 is now live!', 'New features and smarter AI assistance.', '2 days ago', 'bolt', 1),
  ('Platform Maintenance', 'Scheduled maintenance on Aug 30, 02:00 AM PKT', '4 days ago', 'lock', 2),
  ('New Documentation', 'Updated guides for deployment and scaling.', '1 week ago', 'document', 3)
) AS seed(title, description, published_label, icon, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM portal_announcements existing WHERE existing.title = seed.title
);