// Minimal Shopify Storefront API client for the cart.
// Set REACT_APP_SHOPIFY_STORE_DOMAIN (e.g. royal-t.myshopify.com) and
// REACT_APP_SHOPIFY_STOREFRONT_TOKEN in .env, and each bar's
// `shopifyVariantId` in src/data/barsData.js. Until then the shop shows "Coming soon".
// The Storefront token is designed to be public, so it is safe in the browser.

const API_VERSION = '2024-10';
const domain = process.env.REACT_APP_SHOPIFY_STORE_DOMAIN;
const token = process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN;

export const shopifyEnabled = Boolean(domain && token);

export interface CartLine {
  id: string;
  quantity: number;
  merchandiseId: string;
  productTitle: string;
  variantTitle: string;
  price: number;
  currency: string;
  image?: string;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  currency: string;
  lines: CartLine[];
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            image { url }
            product { title }
          }
        }
      }
    }
  }
`;

async function storefront<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  if (!shopifyEnabled) throw new Error('Shopify is not configured');
  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token as string,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(json.errors?.[0]?.message || `Shopify request failed (${res.status})`);
  return json.data as T;
}

function toCart(raw: any): Cart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    subtotal: Number(raw.cost.subtotalAmount.amount),
    currency: raw.cost.subtotalAmount.currencyCode,
    lines: raw.lines.edges.map(({ node }: any) => ({
      id: node.id,
      quantity: node.quantity,
      merchandiseId: node.merchandise.id,
      productTitle: node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      price: Number(node.merchandise.price.amount),
      currency: node.merchandise.price.currencyCode,
      image: node.merchandise.image?.url,
    })),
  };
}

function checkErrors(payload: any) {
  const err = payload?.userErrors?.[0];
  if (err) throw new Error(err.message);
  return toCart(payload.cart);
}

export async function fetchCart(cartId: string): Promise<Cart | null> {
  const data = await storefront<{ cart: unknown }>(`query($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`, { id: cartId });
  return data.cart ? toCart(data.cart) : null;
}

export async function createCart(merchandiseId: string, quantity: number): Promise<Cart> {
  const data = await storefront<{ cartCreate: unknown }>(
    `mutation($lines: [CartLineInput!]) { cartCreate(input: { lines: $lines }) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { lines: [{ merchandiseId, quantity }] }
  );
  return checkErrors(data.cartCreate);
}

export async function addLines(cartId: string, merchandiseId: string, quantity: number): Promise<Cart> {
  const data = await storefront<{ cartLinesAdd: unknown }>(
    `mutation($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { cartId, lines: [{ merchandiseId, quantity }] }
  );
  return checkErrors(data.cartLinesAdd);
}

export async function updateLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await storefront<{ cartLinesUpdate: unknown }>(
    `mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { cartId, lines: [{ id: lineId, quantity }] }
  );
  return checkErrors(data.cartLinesUpdate);
}

export async function removeLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await storefront<{ cartLinesRemove: unknown }>(
    `mutation($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { cartId, lineIds: [lineId] }
  );
  return checkErrors(data.cartLinesRemove);
}

export const formatMoney = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
