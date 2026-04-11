import { NextResponse } from 'next/server';
import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '@/server/routers/_app';

export async function GET() {
    const openApiDocument = generateOpenApiDocument(appRouter, {
        title: 'Rescume API',
        version: '1.0.0',
        baseUrl: 'http://localhost:3000/api', // Update for production
        tags: ['resume'],
    });

    return NextResponse.json(openApiDocument);
}
