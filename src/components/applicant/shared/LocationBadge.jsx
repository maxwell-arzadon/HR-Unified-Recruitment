/**
 * LocationBadge.jsx
 * Small badge displaying the job location (e.g. Office Based, Remote).
 * Used in job cards and the job detail page header.
 */

export default function LocationBadge({ location }) {
  return (
    <span className="bg-zinc-100 text-zinc-500 text-xs font-medium px-3 py-1 rounded-full">
      {location}
    </span>
  );
}
