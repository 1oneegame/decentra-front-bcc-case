"use client";

import { Grid, GridItem } from "@/components/grid";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import NavigationBar from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationBar />
      <section className="container mx-auto px-4 pt-20 pb-8">
        <Grid columns={1} noBorder={["bottom"]} crossPosition={["top-left", "top-right"]}>
          <GridItem className="text-center">
            <TypingAnimation className="text-5xl font-bold text-blue-800 mb-6" duration={100} delay={100}>
              Персонализированные пуш-уведомления
            </TypingAnimation>
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
              Решение, которое анализирует поведение клиентов и генерирует релевантные предложения с точным расчетом выгоды
            </p>
            <div className="bg-red-50 border border-red-200 rounded-none p-4 max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-red-800 mb-4">Проблема</h2>
              <p className="text-red-700 text-lg">
                Сейчас пуш-уведомления идут «одинаковыми для всех»: «Откройте такую-то карту». 
                Они не учитывают реальные привычки человека, не объясняют пользу. 
                Результат — низкий интерес, конверсия и усталость от нерелевантных сообщений.
              </p>
            </div>
          </GridItem>
        </Grid>
        <Grid noBorder={["top"]} crossPosition={["bottom-left", 'bottom-right']}>
          <GridItem className="text-center flex items-start justify-center">
            <InteractiveHoverButton className="shadow-sm" onClick={() => router.push("/analyze")}>Попробовать</InteractiveHoverButton>
          </GridItem>
        </Grid>
      </section>

      <section className="container mx-auto px-4 pb-6">
        <Grid columns={1} noBorder={["bottom"]} crossPosition={["top-left", "top-right"]}>
          <GridItem className="text-center">
            <h2 className="text-4xl font-bold mb-6 text-slate-900">Как работает решение</h2>
          </GridItem>
        </Grid>
        
        <Grid columns={4}  crossPosition="all-corners">
          <GridItem className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-none flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Анализ данных</h3>
            <p className="text-slate-600">
              Анализируем поведение клиентов по данным за 3 месяца: такси, поездки, онлайн-сервисы, остатки
            </p>
          </GridItem>
          
          <GridItem className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-none flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Расчет выгоды</h3>
            <p className="text-slate-600">
              Вычисляем ожидаемую выгоду для клиента по каждому продукту: кешбэк, проценты, экономия комиссий
            </p>
          </GridItem>
          
          <GridItem className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-none flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Выбор продукта</h3>
            <p className="text-slate-600">
              Выбираем самый полезный продукт на основе анализа поведения и потенциальной выгоды
            </p>
          </GridItem>
          
          <GridItem className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-none flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">4</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Персонализация</h3>
            <p className="text-slate-600">
              Генерируем персонализированное пуш-уведомление в корректном тоне с объяснением конкретной пользы
            </p>
          </GridItem>
        </Grid>
      </section>

      <section className="container mx-auto px-4 pb-6">
        <Grid columns={2} crossPosition={['top-center', 'bottom-center', 'top-left', 'top-right', 'bottom-left', 'bottom-right']}>
          <GridItem>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Преимущества для банка</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-slate-700">Увеличение конверсии в 3-5 раз</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-slate-700">Снижение отказов от уведомлений</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-slate-700">Повышение лояльности клиентов</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-slate-700">Рост продаж банковских продуктов</span>
              </li>
            </ul>
          </GridItem>
          
          <GridItem>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Преимущества для клиентов</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-slate-700">Релевантные предложения под их образ жизни</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-slate-700">Понятное объяснение выгоды</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-slate-700">Максимальный кешбэк и экономия</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-slate-700">Отсутствие спама и нерелевантных уведомлений</span>
              </li>
            </ul>
          </GridItem>
        </Grid>
      </section>
    </div>
  );
}
