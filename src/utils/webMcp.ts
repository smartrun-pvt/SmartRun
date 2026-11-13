import type {
  ModelContextContainer,
  WebMcpToolDefinition,
  WebMcpToolExecutionResult
} from '../types/webmcp';
import { checkKolkataDeliveryService } from '../data/kolkataAreas';
import { DEMO_TECHNICIANS } from '../data/demoTechnicians';
import { apiUrl } from '../lib/apiBase';

export interface CatalogSummaryProduct {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  subCategory?: string;
  sub_category?: string;
  subcategory?: string;
  price?: number;
  originalPrice?: number;
  original_price?: number;
  mrp?: number;
  discountPercentage?: number;
  discount_percent?: number;
  unit?: string;
  inStock?: boolean;
  in_stock?: boolean;
  description?: string;
}

export interface WebMcpDependencies {
  fetchProducts?: (signal?: AbortSignal) => Promise<CatalogSummaryProduct[]>;
  fetchProductById?: (id: string, signal?: AbortSignal) => Promise<CatalogSummaryProduct | null>;
}

const REQUEST_TIMEOUT_MS = 5000;
const registeredToolsSet = new WeakSet<object>();

function okResult(payload: Record<string, unknown>): WebMcpToolExecutionResult {
  return {
    content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }],
    structuredContent: payload
  };
}

function errorResult(message: string): WebMcpToolExecutionResult {
  return {
    isError: true,
    content: [{ type: 'text', text: JSON.stringify({ error: message }) }],
    structuredContent: { error: message }
  };
}

async function fetchJsonWithTimeout<T>(url: string, externalSignal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const onExternalAbort = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) {
      clearTimeout(timer);
      throw new Error('Request aborted');
    }
    externalSignal.addEventListener('abort', onExternalAbort, { once: true });
  }

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
    if (externalSignal) {
      externalSignal.removeEventListener('abort', onExternalAbort);
    }
  }
}

async function defaultFetchProducts(signal?: AbortSignal): Promise<CatalogSummaryProduct[]> {
  const data = await fetchJsonWithTimeout<{ success?: boolean; products?: CatalogSummaryProduct[] }>(
    apiUrl('/api/products'),
    signal
  );
  return Array.isArray(data?.products) ? data.products : [];
}

async function defaultFetchProductById(
  id: string,
  signal?: AbortSignal
): Promise<CatalogSummaryProduct | null> {
  const data = await fetchJsonWithTimeout<{ success?: boolean; product?: CatalogSummaryProduct }>(
    apiUrl(`/api/products/${encodeURIComponent(id)}`),
    signal
  );
  return data?.product || null;
}

export function buildSmartRunWebMcpTools(deps: WebMcpDependencies = {}): WebMcpToolDefinition[] {
  const fetchProducts = deps.fetchProducts || defaultFetchProducts;
  const fetchProductById = deps.fetchProductById || defaultFetchProductById;

  return [
    {
      name: 'search_smartrun_products',
      description:
        'Search SmartRun Kolkata express catalog for electrical supplies (Polycab/Havells/RR Kabel wires, Schneider MCBs, switches, fans, LED lights) and construction materials (UltraTech cement, Tata Tiscon TMT steel, waterproofing, plywood).',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search keyword such as product name, wire gauge, brand, or material type.',
            minLength: 1,
            maxLength: 120
          },
          category: {
            type: 'string',
            description: 'Optional store filter: all, electrical, or construction.',
            enum: ['all', 'electrical', 'construction']
          },
          limit: {
            type: 'integer',
            description: 'Maximum number of matching items to return (1 to 25).',
            minimum: 1,
            maximum: 25
          }
        },
        required: ['query'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: true, idempotentHint: true },
      execute: async (input) => {
        const rawQuery = typeof input?.query === 'string' ? input.query.trim().slice(0, 120) : '';
        if (!rawQuery) {
          return errorResult('Parameter "query" must be a non-empty string.');
        }

        const rawCategory =
          input?.category === 'electrical' || input?.category === 'construction'
            ? input.category
            : 'all';
        const requestedLimit = Number(input?.limit);
        const limit =
          Number.isFinite(requestedLimit) && requestedLimit >= 1
            ? Math.min(Math.floor(requestedLimit), 25)
            : 10;

        try {
          const catalog = await fetchProducts();
          const terms = rawQuery.toLowerCase().split(/\s+/).filter(Boolean);

          const matches = catalog
            .filter((item) => {
              const cat = String(item.category || 'electrical').toLowerCase();
              if (rawCategory !== 'all' && cat !== rawCategory) return false;
              const haystack = [
                item.name,
                item.brand,
                item.subCategory,
                item.sub_category,
                item.subcategory,
                item.description
              ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
              return terms.every((term) => haystack.includes(term));
            })
            .slice(0, limit)
            .map((item) => {
              const isConst = String(item.category || '').toLowerCase() === 'construction';
              return {
                id: String(item.id),
                name: item.name,
                brand: item.brand || 'SmartRun',
                category: isConst ? 'construction' : 'electrical',
                subCategory: item.subCategory || item.sub_category || item.subcategory || 'General',
                priceInr: Number(item.price || 0),
                mrpInr: Number(item.originalPrice || item.original_price || item.mrp || item.price || 0),
                unit: item.unit || '1 pc',
                inStock: (item.inStock ?? item.in_stock) !== false,
                url: `https://www.smartrun.in/${isConst ? 'construction' : 'electrical'}/product/${encodeURIComponent(String(item.id))}`
              };
            });

          return okResult({
            query: rawQuery,
            category: rawCategory,
            count: matches.length,
            currency: 'INR',
            deliveryHub: 'SmartRun Kasba Central Depot (Kolkata 700107)',
            products: matches
          });
        } catch (err: any) {
          return errorResult(`Unable to query catalog: ${err?.message || 'network timeout'}`);
        }
      }
    },
    {
      name: 'get_smartrun_product_details',
      description:
        'Retrieve full specifications, INR pricing, stock availability, and canonical URL for a specific SmartRun product ID.',
      inputSchema: {
        type: 'object',
        properties: {
          productId: {
            type: 'string',
            description: 'Unique product ID returned by search_smartrun_products.',
            minLength: 1,
            maxLength: 100
          }
        },
        required: ['productId'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: true, idempotentHint: true },
      execute: async (input) => {
        const productId = typeof input?.productId === 'string' ? input.productId.trim().slice(0, 100) : '';
        if (!productId || /[/?#]/.test(productId)) {
          return errorResult('Parameter "productId" must be a valid product identifier.');
        }

        try {
          const item = await fetchProductById(productId);
          if (!item) {
            return errorResult(`Product "${productId}" was not found.`);
          }
          const isConst = String(item.category || '').toLowerCase() === 'construction';
          return okResult({
            id: String(item.id),
            name: item.name,
            brand: item.brand || 'SmartRun',
            category: isConst ? 'construction' : 'electrical',
            subCategory: item.subCategory || item.sub_category || item.subcategory || 'General',
            priceInr: Number(item.price || 0),
            mrpInr: Number(item.originalPrice || item.original_price || item.mrp || item.price || 0),
            unit: item.unit || '1 pc',
            inStock: (item.inStock ?? item.in_stock) !== false,
            description: item.description || '',
            url: `https://www.smartrun.in/${isConst ? 'construction' : 'electrical'}/product/${encodeURIComponent(String(item.id))}`
          });
        } catch (err: any) {
          return errorResult(`Unable to retrieve product: ${err?.message || 'request failed'}`);
        }
      }
    },
    {
      name: 'check_kolkata_pincode_delivery',
      description:
        'Verify whether SmartRun 60-minute express delivery covers a 6-digit Kolkata (700001-700160) or Howrah (711101-711106) PIN code and get estimated dispatch hub & delivery time.',
      inputSchema: {
        type: 'object',
        properties: {
          pincode: {
            type: 'string',
            description: '6-digit Indian postal PIN code (e.g., 700107 for Kasba, 700091 for Salt Lake Sector V).',
            pattern: '^\\d{6}$',
            minLength: 6,
            maxLength: 6
          }
        },
        required: ['pincode'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: true, idempotentHint: true },
      execute: (input) => {
        const pin = typeof input?.pincode === 'string' ? input.pincode.trim() : '';
        if (!/^\d{6}$/.test(pin)) {
          return errorResult('Parameter "pincode" must be a 6-digit numeric PIN code.');
        }
        const status = checkKolkataDeliveryService(pin);
        return okResult({
          pincode: pin,
          serviceable: status.isServiceable,
          areaName: status.areaName || null,
          estimatedDeliveryMinutes: status.deliveryMins || null,
          dispatchHub: status.hub || null,
          message: status.message
        });
      }
    },
    {
      name: 'list_kolkata_electricians',
      description:
        'Find licensed and background-verified electrical contractors and wiremen available across Kolkata zones with base inspection rates and emergency availability.',
      inputSchema: {
        type: 'object',
        properties: {
          area: {
            type: 'string',
            description: 'Optional Kolkata locality filter such as Kasba, Salt Lake, New Town, or Ballygunge.',
            maxLength: 80
          },
          skill: {
            type: 'string',
            description: 'Optional specialization keyword such as rewiring, solar, MCB, panel, or fault.',
            maxLength: 80
          },
          emergencyOnly: {
            type: 'boolean',
            description: 'Set true to return only 24x7 emergency support electricians.'
          }
        },
        additionalProperties: false
      },
      annotations: { readOnlyHint: true, idempotentHint: true },
      execute: (input) => {
        const areaFilter = typeof input?.area === 'string' ? input.area.trim().toLowerCase() : '';
        const skillFilter = typeof input?.skill === 'string' ? input.skill.trim().toLowerCase() : '';
        const emergencyOnly = Boolean(input?.emergencyOnly);

        const filtered = DEMO_TECHNICIANS.filter((tech) => {
          if (emergencyOnly && !tech.emergencySupport) return false;
          if (
            areaFilter &&
            !tech.serviceAreas.some((a) => a.toLowerCase().includes(areaFilter))
          ) {
            return false;
          }
          if (skillFilter) {
            const skillText = [
              tech.title,
              tech.primarySector,
              ...tech.subSectors,
              ...tech.skills.map((s) => s.name)
            ]
              .join(' ')
              .toLowerCase();
            if (!skillText.includes(skillFilter)) return false;
          }
          return true;
        }).map((tech) => ({
          id: tech.id,
          name: tech.name,
          title: tech.title,
          experienceYears: tech.experienceYears,
          licenseNumber: tech.licenseNumber,
          issuingAuthority: tech.issuingAuthority,
          startingRateInr: tech.startingRate,
          emergencySupport: tech.emergencySupport,
          serviceAreas: tech.serviceAreas,
          profileUrl: `https://www.smartrun.in/technicians/${tech.id}`
        }));

        return okResult({
          count: filtered.length,
          technicians: filtered
        });
      }
    }
  ];
}

function registerOnContainer(container: ModelContextContainer | undefined, tools: WebMcpToolDefinition[]): boolean {
  if (!container || registeredToolsSet.has(container)) return false;
  registeredToolsSet.add(container);

  if (typeof container.registerTool === 'function') {
    for (const tool of tools) {
      try {
        container.registerTool(tool);
      } catch {
        // Ignore duplicate tool registration if a page script re-ran
      }
    }
    return true;
  }

  if (typeof container.provideContext === 'function') {
    try {
      container.provideContext({ tools });
      return true;
    } catch {
      return false;
    }
  }

  return false;
}

/**
 * Registers SmartRun WebMCP read-only tools with `navigator.modelContext`
 * (and `document.modelContext` if provided by the user agent).
 */
export function registerSmartRunWebMcpTools(deps?: WebMcpDependencies): number {
  if (typeof window === 'undefined') return 0;
  const tools = buildSmartRunWebMcpTools(deps);
  let targetsRegistered = 0;

  try {
    if (registerOnContainer(window.navigator?.modelContext, tools)) {
      targetsRegistered += 1;
    }
  } catch {
    // ignore
  }

  try {
    if (typeof document !== 'undefined' && document.modelContext && document.modelContext !== window.navigator?.modelContext) {
      if (registerOnContainer(document.modelContext, tools)) {
        targetsRegistered += 1;
      }
    }
  } catch {
    // ignore
  }

  return targetsRegistered;
}
