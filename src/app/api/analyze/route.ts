import { NextRequest, NextResponse } from 'next/server';

interface MLPrediction {
  product: string;
  confidence: number;
  expected_benefit: number;
  cluster: number;
  push_notification: string;
}

interface ExternalAPIResponse {
  client_code: string;
  ml_prediction: MLPrediction;
  timing_optimization: any;
  features_used: any;
}

interface RequestData {
  client_code: string;
  data: any;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestData = await request.json();
    
    if (!body.client_code || !body.data) {
      return NextResponse.json(
        { error: 'Отсутствуют обязательные поля: client_code, data' },
        { status: 400 }
      );
    }
    
    const externalAPIUrl = process.env.EXTERNAL_API_URL || 'http://localhost:8000';
    const timeout = 10000;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(`${externalAPIUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Внешний API вернул ошибку: ${response.status} ${response.statusText}`);
      }
      
      const externalData: ExternalAPIResponse = await response.json();
      
      const processedData = {
        ...externalData,
        processed_at: new Date().toISOString(),
        status: 'processed'
      };
      
      return NextResponse.json(processedData);
      
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error) {
        if (fetchError.name === 'AbortError') {
          throw new Error('Превышено время ожидания ответа от внешнего API');
        }
        throw new Error(`Ошибка при обращении к внешнему API: ${fetchError.message}`);
      }
      throw new Error('Неизвестная ошибка при обращении к внешнему API');
    }
    
  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Ошибка обработки данных' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'API для анализа данных готов к работе' },
    { status: 200 }
  );
}
