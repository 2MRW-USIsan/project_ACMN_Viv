import { NextResponse } from 'next/server';
import { getOrderSave, createOrUpdateOrderSave } from '@/business/orderSave';

export const GET = async () => {
  const save = getOrderSave();
  return save
    ? NextResponse.json(save)
    : NextResponse.json({ error: 'Not found' }, { status: 404 });
};

export const POST = async (request: Request) => {
  const body = (await request.json()) as unknown;
  if (
    typeof body !== 'object' ||
    body === null ||
    !('data' in body) ||
    typeof (body as Record<string, unknown>).data !== 'string'
  ) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const save = createOrUpdateOrderSave((body as { data: string }).data);
  return NextResponse.json(save);
};
