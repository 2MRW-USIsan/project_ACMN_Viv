import { NextResponse } from 'next/server';
import { mockYamlData } from '@/business/yamlMock';

export const GET = async () => {
  return NextResponse.json(mockYamlData);
};
