import { describe, test, expect } from 'vitest';
import { buildSmartRunWebMcpTools, registerSmartRunWebMcpTools } from './webMcp';

const sampleProducts = [
  {
    id: 'p-polycab-15',
    name: 'Polycab FR 1.5 sqmm House Wire (90m)',
    brand: 'Polycab',
    category: 'electrical',
    subCategory: 'Wiring',
    price: 1650,
    originalPrice: 2100,
    unit: '90m coil',
    inStock: true
  },
  {
    id: 'p-ultratech-50',
    name: 'UltraTech Super Cement 50kg Bag',
    brand: 'UltraTech',
    category: 'construction',
    subCategory: 'Cement & Concrete',
    price: 390,
    originalPrice: 430,
    unit: '50kg bag',
    inStock: true
  }
];

describe('SmartRun WebMCP tools', () => {
  test('buildSmartRunWebMcpTools registers 4 read-only tools with valid JSON Schema definitions', () => {
    const tools = buildSmartRunWebMcpTools({
      fetchProducts: async () => sampleProducts,
      fetchProductById: async (id) => sampleProducts.find((p) => p.id === id) || null
    });

    expect(tools.length).toBe(4);
    for (const tool of tools) {
      expect(Boolean(tool.name && tool.description.length > 20)).toBe(true);
      expect(tool.inputSchema.type).toBe('object');
      expect(tool.annotations?.readOnlyHint).toBe(true);
      expect(typeof tool.execute).toBe('function');
    }
  });

  test('search_smartrun_products filters by query and category and rejects empty queries', async () => {
    const tools = buildSmartRunWebMcpTools({
      fetchProducts: async () => sampleProducts
    });
    const searchTool = tools.find((t) => t.name === 'search_smartrun_products')!;

    const emptyRes = await searchTool.execute({ query: '   ' });
    expect(emptyRes.isError).toBe(true);

    const wireRes = await searchTool.execute({ query: 'polycab', category: 'electrical', limit: 5 });
    expect(wireRes.isError).toBeUndefined();
    const structured = wireRes.structuredContent as any;
    expect(structured.count).toBe(1);
    expect(structured.products[0].id).toBe('p-polycab-15');
    expect(structured.products[0].url).toBe('https://www.smartrun.in/electrical/product/p-polycab-15');
  });

  test('get_smartrun_product_details rejects path traversal IDs and returns matched item', async () => {
    const tools = buildSmartRunWebMcpTools({
      fetchProductById: async (id) => sampleProducts.find((p) => p.id === id) || null
    });
    const detailTool = tools.find((t) => t.name === 'get_smartrun_product_details')!;

    const traversalRes = await detailTool.execute({ productId: '../secret/key' });
    expect(traversalRes.isError).toBe(true);

    const validRes = await detailTool.execute({ productId: 'p-ultratech-50' });
    expect(validRes.isError).toBeUndefined();
    expect((validRes.structuredContent as any).priceInr).toBe(390);
  });

  test('check_kolkata_pincode_delivery validates 6-digit PINs and identifies Kolkata/non-Kolkata areas', async () => {
    const tools = buildSmartRunWebMcpTools();
    const pinTool = tools.find((t) => t.name === 'check_kolkata_pincode_delivery')!;

    const invalidRes = await pinTool.execute({ pincode: '7001' });
    expect(invalidRes.isError).toBe(true);

    const kolkataRes = await pinTool.execute({ pincode: '700091' });
    expect((kolkataRes.structuredContent as any).serviceable).toBe(true);
    expect(String((kolkataRes.structuredContent as any).areaName)).toMatch(/Salt Lake/i);

    const delhiRes = await pinTool.execute({ pincode: '110001' });
    expect((delhiRes.structuredContent as any).serviceable).toBe(false);
  });

  test('list_kolkata_electricians filters by area and emergency flag', async () => {
    const tools = buildSmartRunWebMcpTools();
    const techTool = tools.find((t) => t.name === 'list_kolkata_electricians')!;

    const res = await techTool.execute({ area: 'Salt Lake', emergencyOnly: true });
    const structured = res.structuredContent as any;
    expect(structured.count).toBeGreaterThanOrEqual(1);
    expect(structured.technicians.every((t: any) => t.emergencySupport === true)).toBe(true);
  });

  test('registerSmartRunWebMcpTools safely no-ops outside browser and registers once when modelContext exists', () => {
    const countOutside = registerSmartRunWebMcpTools();
    expect(countOutside).toBe(0);

    const registeredNames: string[] = [];
    const mockContext = {
      registerTool(def: { name: string }) {
        registeredNames.push(def.name);
      }
    };
    const hadWindow = 'window' in globalThis;
    const prevWindow = (globalThis as any).window;
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: { navigator: { modelContext: mockContext } }
    });
    try {
      const firstCount = registerSmartRunWebMcpTools();
      const secondCount = registerSmartRunWebMcpTools();
      expect(firstCount).toBe(1);
      expect(secondCount).toBe(0);
      expect(registeredNames).toEqual([
        'search_smartrun_products',
        'get_smartrun_product_details',
        'check_kolkata_pincode_delivery',
        'list_kolkata_electricians'
      ]);
    } finally {
      if (hadWindow) {
        Object.defineProperty(globalThis, 'window', {
          configurable: true,
          value: prevWindow
        });
      } else {
        delete (globalThis as any).window;
      }
    }
  });
});
