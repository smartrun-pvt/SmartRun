import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

let patched = false;

/**
 * Idempotent Leaflet DomUtil.getPosition safety patch.
 * Prevents `_leaflet_pos` TypeErrors during unmounted element cleanup or async animation frames,
 * while keeping Leaflet JS + CSS out of the initial storefront bundle until a map renders.
 */
export function applyLeafletSafetyPatch(): void {
  if (patched) return;
  patched = true;

  if (typeof window !== 'undefined' && L && L.DomUtil) {
    try {
      const origGetPosition = L.DomUtil.getPosition;
      L.DomUtil.getPosition = function (el: any) {
        if (!el) {
          return new L.Point(0, 0);
        }
        if (origGetPosition) {
          return origGetPosition.call(L.DomUtil, el);
        }
        return el._leaflet_pos || new L.Point(0, 0);
      };
    } catch {
      // ignore
    }
  }
}

export { L };
