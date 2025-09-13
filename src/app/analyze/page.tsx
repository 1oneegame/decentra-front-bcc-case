"use client";

import { Grid, GridItem } from "@/components/grid";
import { cn } from "@/lib/utils";
import { ArrowLeft, FileText, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AnalyzePage() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError("");
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      validateFile(selectedFile);
    }
  };

  const validateFile = (file: File) => {
    const maxSize = 10 * 1024 * 1024;
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (file.size > maxSize) {
      setError("Размер файла не должен превышать 10MB");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setError("Поддерживаются только файлы PDF, DOCX, XLS, XLSX");
      return;
    }

    setFile(file);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setAnalyzing(true);
          simulateAnalysis();
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // const formData = new FormData();
    // formData.append('file', file);

    // const response = await fetch('/api/analyze', {
    //   method: 'POST',
    //   body: formData,
    // }); 
    // тута будет вызов апи
    /*
    if (response.ok) {
      const result = await response.json();
      setAnalyzing(false);
      setAnalysis(result);
    } else {
      throw new Error('Ошибка анализа');
    }
  } catch (error) {
    setUploading(false);
    setAnalyzing(false);
    setError("Ошибка при анализе документа");
  }
    */
  };

  const simulateAnalysis = () => {
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysis({
        score: 87,
        patterns: [
          "Частые поездки на такси (15-20 раз в месяц)",
          "Регулярные покупки в онлайн-магазинах",
          "Высокие остатки на счете (свыше 100k руб)",
          "Активное использование мобильного банкинга"
        ],
        products: [
          "Кредитная карта с кешбэком 5% на такси",
          "Дебетовая карта с повышенным кешбэком",
          "Накопительный счет с повышенной ставкой",
          "Страхование путешествий"
        ],
        notifications: [
          "Экономьте до 2000₽ в месяц с нашей картой для такси!",
          "Откройте накопительный счет и получите до 15% годовых",
          "Ваш кешбэк может быть в 3 раза больше с новой картой"
        ]
      });
    }, 3000);
  };

  useEffect(() => {
    if (analysis) {
      setTimeout(() => {
        window.scrollBy({
          top: 600,
          behavior: 'smooth',
        });
      }, 100);
    }
  }, [analysis]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="container mx-auto px-4 pt-20 pb-2">
        <span className="text-slate-500 flex flex-row items-center text-md cursor-pointer pb-4" onClick={() => router.back()}>
          <ArrowLeft width={24} height={24}/>Перейти назад
        </span>
      </section>
      <section className="container mx-auto px-4 pb-20">
        <Grid columns={1} crossPosition="all-corners">
          <GridItem className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-blue-800">Анализ банковских документов</h1>
            <p className="text-xl text-slate-600 mb-2 max-w-3xl mx-auto">
              Загрузите документы для анализа поведения клиентов и генерации персонализированных уведомлений
            </p>
          </GridItem>
          <GridItem>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-none cursor-pointer transition-colors ${
                      dragActive 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-md flex items-center border border-blue-200 justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-blue-800" />
                      </div>
                      <p className="mb-2 text-lg font-semibold text-slate-900">
                        Нажмите для загрузки или перетащите файл
                      </p>
                      <p className="text-sm text-slate-600">PDF, DOCX, XLS, XLSX (макс. 10MB)</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.xls,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />
                  </label>
                </div>

                {file && (
                  <div className="flex items-center space-x-3 bg-blue-50 border border-blue-200 rounded-none p-4">
                    <FileText className="w-5 h-5 text-blue-800" />
                    <span className="text-sm font-medium text-blue-800">{file.name}</span>
                  </div>
                )}
                {error && (
                  <div className="flex items-center space-x-3 bg-red-50 border border-red-200 rounded-none p-4">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-red-800">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-4 text-xl font-semibold transition-colors shadow-lg rounded-none ${
                    !file || uploading || analyzing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-700 text-white hover:bg-blue-800'
                  }`}
                  disabled={!file || uploading || analyzing}
                >
                  {uploading
                    ? "Загрузка..."
                    : analyzing
                    ? "Анализ..."
                    : "Начать анализ"}
                </button>
              </form>
          </GridItem>
        </Grid>
        <Grid columns={1} crossPosition="all-corners" className={cn('mt-8',
          (uploading || analyzing || !analysis) ? 'hidden' : 'block'
        )}>
          <GridItem>
              {analysis && (
                <div className="mt-8 space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Результаты анализа</h2>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{analysis.score}/100</div>
                    <p className="text-slate-600">Уровень персонализации</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-none p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">Поведенческие паттерны</h3>
                      <ul className="space-y-2">
                        {analysis.patterns?.map((pattern: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-green-700">{pattern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-none p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">Рекомендуемые продукты</h3>
                      <ul className="space-y-2">
                        {analysis.products?.map((product: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-blue-700">{product}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-none p-6">
                      <h3 className="text-lg font-semibold text-purple-800 mb-4">Персонализированные уведомления</h3>
                      <ul className="space-y-2">
                        {analysis.notifications?.map((notification: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-purple-700">{notification}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
          </GridItem>
        </Grid>
      </section>
    </div>
  );
}