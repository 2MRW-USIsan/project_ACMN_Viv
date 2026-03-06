import { createSwaggerSpec } from "next-swagger-doc";
import { NextResponse } from "next/server";

export async function GET() {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "TODO App API",
        version: "1.0.0",
        description: "CRUD API for the minimal TODO application",
      },
      tags: [{ name: "Todos", description: "Todo operations" }],
    },
  });
  return NextResponse.json(spec);
}
