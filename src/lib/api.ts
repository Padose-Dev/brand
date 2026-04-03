const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `API error: ${res.status}`);
  }

  return res.json();
}

// ── Brand Engine API ──

export interface BrandProfile {
  id: string;
  status: string;
  pipelinePhase: string | null;
  productName: string | null;
  ingredients: string[];
  price: number | null;
  photoUrls: string[];
  sellerName: string | null;
  sellerLocation: string | null;
  category: string | null;
  subcategory: string | null;
  brandName: string | null;
  productTitle: string | null;
  tagline: string | null;
  colorPalette: Record<string, string> | null;
  benefits: string[];
  shortDescription: string | null;
  fullDescription: string | null;
  bulletPoints: string[];
  originStory: string | null;
  whyIStarted: string | null;
  craftProcess: string | null;
  storyHeadline: string | null;
  whatsappFull: string | null;
  whatsappShort: string | null;
  badges: string[];
  searchTags: string[];
  labelPngUrl: string | null;
  labelPdfUrl: string | null;
  logoPngUrl: string | null;
  instagramPostUrl: string | null;
  whatsappStatusUrl: string | null;
  businessCardFrontUrl: string | null;
  templateId: string | null;
  generationTimeMs: number | null;
}

export interface CreateBrandInput {
  productName?: string;
  ingredients: string[];
  price: number;
  photoUrls?: string[];
  sellerName?: string;
  sellerLocation?: string;
  guestSessionId?: string;
}

export interface CheckoutInput {
  tier: 'basic' | 'pro' | 'studio';
  phone: string;
  wantsStore: boolean;
  couponCode?: string;
}

export interface CheckoutResult {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  razorpayKeyId: string;
}

export interface PaymentVerifyInput {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export const api = {
  brand: {
    create: (data: CreateBrandInput) =>
      request<BrandProfile>('/brand-engine/create', { method: 'POST', body: data }),

    get: (id: string) =>
      request<BrandProfile>(`/brand-engine/${id}`),

    update: (id: string, data: Partial<BrandProfile>) =>
      request<BrandProfile>(`/brand-engine/${id}`, { method: 'PATCH', body: data }),

    regenerate: (id: string, fields: string[]) =>
      request<BrandProfile>(`/brand-engine/${id}/regenerate`, { method: 'POST', body: { fields } }),

    checkout: (id: string, data: CheckoutInput) =>
      request<CheckoutResult>(`/brand-engine/${id}/checkout`, { method: 'POST', body: data }),

    verifyPayment: (id: string, data: PaymentVerifyInput) =>
      request<{ order: any; fulfillment: any }>(`/brand-engine/${id}/verify-payment`, { method: 'POST', body: data }),

    getDownloads: (id: string) =>
      request<any>(`/brand-engine/${id}/download`),

    completeRegistration: (id: string, data: { orderId: string; userId: string }) =>
      request<any>(`/brand-engine/${id}/complete-registration`, { method: 'POST', body: data }),
  },
};
