import { NextResponse } from 'next/server';
import { deleteOrderSave } from '@/business/orderSave';

const DEFAULT_ID = 'default';

export const DELETE = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  if (id !== DEFAULT_ID) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  deleteOrderSave();
  return new NextResponse(null, { status: 204 });
};
