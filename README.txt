1. КОНЦЕПЦИЯ ПРОЕКТА
Название проекта: (выбрать самому, например: TypeWiser / KeyMaster / NeuroType / AdaptyType)

Краткое описание:
Веб-сервис для обучения слепой печати, который анализирует слабые места пользователя и создает персонализированные тренировки. В отличие от существующих решений (Monkeytype, 10fastfingers), сервис не просто дает случайные слова, а выявляет проблемные буквы и сочетания, помогая пользователю целенаправленно их тренировать.

Основные режимы:

Свободная печать — пользователь печатает любой текст, система анализирует ошибки

Умные тренировки — система генерирует упражнения на основе слабых мест

Прогресс — визуализация улучшений по каждой букве

Целевая аудитория:

Люди, изучающие слепую печать

Программисты (хотят печатать код быстрее)

Студенты, много печатающие тексты

Геймеры, желающие улучшить реакцию и скорость печати

2. ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ
2.1. Режим "Свободная печать" (Free Type)
Описание:
Пользователь может печатать любой текст: вставить свой, скопировать из статьи, писать свои мысли.

Функции:

Текстовое поле для ввода/вставки текста

Область для печати с подсветкой текущего символа

Подсчет статистики в реальном времени (скорость, точность)

Сохранение сессии печати в БД

Анализ каждой нажатой клавиши

Собираемые данные:

Какая буква/символ нажаты

Была ли ошибка (не тот символ)

Время нажатия (мс)

Контекст: слово и позиция в слове

Общее время сессии

2.2. Режим "Анализ слабых мест"
Описание:
После каждой сессии (или по запросу) система показывает пользователю его слабые стороны.

Аналитика для отображения:

text
📊 ТВОЙ ПРОФИЛЬ ПЕЧАТИ

🔴 КРИТИЧЕСКИЕ БУКВЫ (ошибки > 20%):
- "х" — ошибка в 35% случаев, скорость 420 мс (средняя 280 мс)
- "ж" — ошибка в 28% случаев, скорость 390 мс
- "ц" — ошибка в 22% случаев

🟡 ПРОБЛЕМНЫЕ СОЧЕТАНИЯ:
- "ый" — 45% ошибок в словах с этим окончанием
- "пр" — скорость печати на 40% ниже средней
- "ол" — частые пропуски букв

🟢 СИЛЬНЫЕ СТОРОНЫ:
- Гласные буквы — менее 3% ошибок
- Скорость печати английских слов на 15% выше средней
- Пробел и знаки препинания — идеально

📈 ПРОГРЕСС ЗА ПОСЛЕДНЮЮ НЕДЕЛЮ:
- Буква "х": ошибки ↓ с 45% до 35%
- Буква "ф": ошибки ↓ с 30% до 18%
- Общая скорость: ↑ на 5 зн/мин
2.3. Режим "Умные тренировки"
Описание:
Система автоматически генерирует упражнения на основе слабых мест пользователя.

Виды тренировок:

А. Тренировка "Слабое звено"
Генерация слов, содержащих проблемные буквы.

python
# Пример генерации для буквы "х"
Слова: холод, характер, хорошо, хит, хобби, химия, хоровод
Б. Тренировка "Битва комбинаций"
Фокус на проблемных сочетаниях (биграммы и триграммы).

text
Тренировка сочетания "ЖД":
ждать | каждый | надежда | ожидание | между
жд + ать | ка + жд + ый | на + жд + а
В. Тренировка "Реабилитация"
Прогрессивная сложность: от простого к сложному.

text
Уровень 1 (легко): ха, хо, хи, хе
Уровень 2 (средне): халат, холод, хитрый
Уровень 3 (сложно): хорошо, хоровод, характеризовать
Уровень 4 (эксперт): электрофикация, экстраординарный
Г. Тренировка "Исправление ошибок"
Повторная тренировка слов, в которых пользователь чаще всего ошибался.

text
Твое слабое слово: "параллельно"
Ты ошибался в нем 8 раз!
Попробуй снова: _______

Статистика: правильно с 3-й попытки ✓
2.4. Система прогресса и визуализации
Тепловая карта клавиатуры:

text
q [░░]  w [▓▓]  e [▓▓]  r [░░]  t [░░]  y [░░]  u [░░]  i [░░]  o [░░]  p [░░]
a [▓▓]  s [░░]  d [░░]  f [▓▓]  g [░░]  h [░░]  j [░░]  k [░░]  l [░░]  
z [░░]  x [██]  c [░░]  v [░░]  b [░░]  n [░░]  m [░░]

Где: ░░ - нормально, ▓▓ - медленно, ██ - критически (красный)
Графики:

Линейный график скорости по дням/неделям

График точности для каждой проблемной буквы

Сравнение с средними показателями пользователей

2.5. Геймификация
Достижения:

🏆 "Победитель буквы Х" — улучшил результат на 50% по букве "х"

🏆 "Железные пальцы" — 1000 нажатий без ошибок

🏆 "Эксперт сочетаний" — исправил 5 проблемных биграмм

🏆 "Марафонец" — 10 часов печати

Ежедневные челленджи:

"Сегодня тренируем букву Й" (специальная подборка слов)

"Битва скоростей" (достигни цели по скорости за 5 минут)

2.6. Персональный словарь
Описание:
Система собирает слова, которые печатал пользователь, и создает личный словарь.

Функции:

Просмотр своего словаря с частотой использования

Отметка "сложных" слов

Экспорт словаря

Тренировка только на своих словах

2.7. Дополнительные фишки
Импорт из реальной жизни:
Пользователь может загрузить свои тексты (статьи, код, переписки) — система анализирует лексикон и добавляет слова в персональный словарь.

Социальный аспект:

Соревнования с друзьями (кто быстрее исправит свои слабые места)

Общие комнаты для тренировок (синхронная печать одного текста)

ИИ-ассистент:

Предсказание, какие буквы станут проблемными через неделю

Рекомендации по расписанию тренировок

3. ТЕХНИЧЕСКАЯ РЕАЛИЗАЦИЯ
3.1. Стек технологий
Frontend:

React.js / Next.js (для SSR и SEO)

TypeScript (типизация)

TailwindCSS (стилизация)

Chart.js / D3.js (графики)

WebSockets (для реального времени)

React Beautiful DnD (для интерфейсов)

Backend:

Python + FastAPI (асинхронный, быстрый)

PostgreSQL (основная БД)

Redis (кэширование сессий, очереди)

WebSockets (live-обновления)

DevOps:

Docker + docker-compose

GitHub Actions (CI/CD)

Nginx (reverse proxy)

3.2. Структура базы данных
sql
-- Пользователи
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    avg_speed FLOAT DEFAULT 0,
    total_time_typed INTEGER DEFAULT 0,
    preferred_language VARCHAR(10) DEFAULT 'ru'
);

-- Сессии печати
CREATE TABLE typing_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    session_type VARCHAR(20), -- 'free', 'training', 'challenge'
    mode VARCHAR(50), -- 'weakness', 'combination', 'rehab'
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    total_words INTEGER,
    accuracy FLOAT,
    avg_speed FLOAT,
    text_typed TEXT,
    metadata JSONB -- дополнительные данные
);

-- Нажатия клавиш (сырые данные)
CREATE TABLE key_presses (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES typing_sessions(id),
    character CHAR(1),
    is_mistake BOOLEAN,
    time_to_press INTEGER, -- мс от предыдущего нажатия
    position INTEGER, -- позиция в тексте
    word_context VARCHAR(50), -- слово, в котором нажатие
    expected_char CHAR(1),
    pressed_char CHAR(1),
    timestamp TIMESTAMP
);

-- Агрегированная статистика по буквам
CREATE TABLE letter_stats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    character CHAR(1),
    total_presses INTEGER,
    mistake_count INTEGER,
    avg_time FLOAT,
    last_updated TIMESTAMP DEFAULT NOW(),
    trend FLOAT, -- изменение за последнюю неделю
    UNIQUE(user_id, character)
);

-- Статистика по сочетаниям (биграммы)
CREATE TABLE bigram_stats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    bigram VARCHAR(2), -- например 'ол', 'пр'
    total_occurrences INTEGER,
    mistake_count INTEGER,
    avg_time FLOAT,
    last_updated TIMESTAMP,
    UNIQUE(user_id, bigram)
);

-- Слабые места (автоматически обновляется)
CREATE TABLE weaknesses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    target_type VARCHAR(20), -- 'letter', 'bigram', 'word'
    target_value VARCHAR(50), -- буква или сочетание
    mistake_rate FLOAT, -- процент ошибок
    severity VARCHAR(20), -- 'critical', 'medium', 'low'
    detected_at TIMESTAMP,
    last_occurrence TIMESTAMP,
    UNIQUE(user_id, target_type, target_value)
);

-- Персональный словарь
CREATE TABLE personal_dictionary (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    word VARCHAR(100),
    language VARCHAR(10) DEFAULT 'ru',
    times_typed INTEGER DEFAULT 1,
    mistakes_count INTEGER DEFAULT 0,
    last_typed TIMESTAMP,
    is_difficult BOOLEAN DEFAULT FALSE,
    source VARCHAR(50), -- 'free_typing', 'import', 'training'
    UNIQUE(user_id, word, language)
);

-- Тренировочные сессии (генерации)
CREATE TABLE training_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    focus_type VARCHAR(20), -- 'letter', 'bigram', 'word'
    focus_value VARCHAR(50), -- что тренируем
    words_generated TEXT[], -- массив сгенерированных слов
    completed BOOLEAN DEFAULT FALSE,
    results JSONB, -- результаты тренировки
    created_at TIMESTAMP DEFAULT NOW()
);

-- Достижения
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    icon VARCHAR(50)
);

CREATE TABLE user_achievements (
    user_id INTEGER REFERENCES users(id),
    achievement_id INTEGER REFERENCES achievements(id),
    earned_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_id)
);
3.3. Алгоритмы анализа
Анализ сессии печати:
python
def analyze_typing_session(session_id):
    """Анализирует сессию и обновляет статистику пользователя"""
    
    # Получаем все нажатия из сессии
    key_presses = get_key_presses(session_id)
    
    # Анализ по буквам
    letter_stats = {}
    for press in key_presses:
        char = press['character']
        if char not in letter_stats:
            letter_stats[char] = {
                'total': 0, 'mistakes': 0, 'times': []
            }
        
        letter_stats[char]['total'] += 1
        if press['is_mistake']:
            letter_stats[char]['mistakes'] += 1
        letter_stats[char]['times'].append(press['time_to_press'])
    
    # Обновляем статистику в БД
    for char, stats in letter_stats.items():
        if stats['total'] >= 5:  # Минимум для статистики
            update_letter_stats(
                user_id=get_user_by_session(session_id),
                character=char,
                total_presses=stats['total'],
                mistakes=stats['mistakes'],
                avg_time=sum(stats['times'])/len(stats['times'])
            )
    
    # Определяем слабые места
    weaknesses = []
    for char, stats in letter_stats.items():
        if stats['total'] >= 10:
            mistake_rate = (stats['mistakes'] / stats['total']) * 100
            avg_time = sum(stats['times']) / len(stats['times'])
            
            if mistake_rate > 20:
                weaknesses.append({
                    'type': 'letter',
                    'value': char,
                    'rate': mistake_rate,
                    'severity': 'critical'
                })
            elif mistake_rate > 10:
                weaknesses.append({
                    'type': 'letter',
                    'value': char,
                    'rate': mistake_rate,
                    'severity': 'medium'
                })
    
    # Анализ биграмм
    bigrams = analyze_bigrams(key_presses)
    
    return {
        'letter_stats': letter_stats,
        'bigrams': bigrams,
        'weaknesses': weaknesses
    }
Генерация тренировки:
python
def generate_training(user_id, focus_type, focus_value):
    """
    Генерирует тренировку для конкретной буквы или сочетания
    """
    
    if focus_type == 'letter':
        # Простые слова с этой буквой
        easy_words = get_words_by_pattern(f"*{focus_value}*", max_length=5)
        # Средние слова
        medium_words = get_words_by_pattern(f"*{focus_value}*", min_length=6, max_length=8)
        # Сложные слова
        hard_words = get_words_by_pattern(f"*{focus_value}*", min_length=9)
        
        # Слова, где буква встречается несколько раз
        multiple_words = get_words_with_multiple(focus_value, min_count=2)
        
        training = {
            'levels': [
                {'name': 'Разминка', 'words': easy_words[:10]},
                {'name': 'Основная часть', 'words': medium_words[:20]},
                {'name': 'Сложный уровень', 'words': hard_words[:15]},
                {'name': 'Бонус', 'words': multiple_words[:10]}
            ],
            'focus': f"Тренировка буквы '{focus_value}'",
            'total_words': 55
        }
        
    elif focus_type == 'bigram':
        # Ищем слова с этим сочетанием
        words = get_words_with_bigram(focus_value)
        training = {
            'levels': [
                {'name': 'Начало слова', 'words': words_start_with(focus_value)},
                {'name': 'Середина слова', 'words': words_contain_middle(focus_value)},
                {'name': 'Конец слова', 'words': words_end_with(focus_value)}
            ],
            'focus': f"Тренировка сочетания '{focus_value}'"
        }
    
    return training
3.4. API Endpoints
text
API Structure:

POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile

POST   /api/sessions/start
POST   /api/sessions/end/{session_id}
POST   /api/sessions/{session_id}/keypress

GET    /api/stats/user/{user_id}
GET    /api/stats/letters/{user_id}
GET    /api/stats/bigrams/{user_id}
GET    /api/stats/weaknesses/{user_id}

GET    /api/training/generate
POST   /api/training/complete/{training_id}

GET    /api/dictionary/{user_id}
POST   /api/dictionary/words
POST   /api/dictionary/import

GET    /api/achievements/{user_id}
GET    /api/progress/chart/{user_id}?type=letter&value=х

WebSocket:
ws://api/typing/{session_id} - реальное время печати
4. ДИЗАЙН ИНТЕРФЕЙСА
4.1. Главный экран печати
text
┌─────────────────────────────────────────────┐
│  🎯 TypeWiser                     👤 Профиль │
├─────────────────────────────────────────────┤
│  [ Свободная печать | Тренировки | Прогресс ]│
├─────────────────────────────────────────────┤
│                                             │
│  Вот текст, который ты печатаешь.          │
│  Каждая буква подсвечивается по мере        │
│  набора. Ошибки показываются красным.       │
│  Очень удобно и наглядно!                   │
│                                             │
│  Ты можешь печатать свой текст              │
│  или использовать готовые примеры.          │
│                                             │
│  [ Текущее слово: пользовательский ]        │
│  [ Набранный текст: пол                      ]
│                                             │
├─────────────────────────────────────────────┤
│  Скорость: 240 зн/мин  │  Точность: 95%    │
│  Время: 01:24          │  Ошибок: 3        │
└─────────────────────────────────────────────┘
4.2. Экран анализа
text
┌─────────────────────────────────────────────┐
│  📊 Твой профиль печати                     │
├─────────────────────────────────────────────┤
│                                             │
│  🔴 КРИТИЧЕСКИЕ БУКВЫ                       │
│  ┌─────────────────────────────────────┐   │
│  │  х  │ 35% ошибок │ 420 мс │ ██████  │   │
│  │  ж  │ 28% ошибок │ 390 мс │ ████    │   │
│  │  ц  │ 22% ошибок │ 360 мс │ ███     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  🟡 ПРОБЛЕМНЫЕ СОЧЕТАНИЯ                    │
│  • "ый" — 45% ошибок                        │
│  • "пр" — на 40% медленнее                  │
│                                             │
│  🟢 СИЛЬНЫЕ СТОРОНЫ                         │
│  • Гласные — менее 3% ошибок                │
│  • Английские слова — скорость выше на 15%  │
│                                             │
│  [ Начать тренировку слабых мест ]          │
└─────────────────────────────────────────────┘
4.3. Экран тренировки
text
┌─────────────────────────────────────────────┐
│  🏋️ Тренировка: Буква "Х"                    │
├─────────────────────────────────────────────┤
│                                             │
│  Уровень 1/4: Разминка                      │
│  ───────────────────────────────────────── │
│                                             │
│  ха   хо   хи   хе   хм   хэ                │
│  [██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 20%     │
│                                             │
│  Текущее слово: ХОРОШО                       │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │            хорош_                    │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Прогресс: ████░░░░░░░░ 4/10 слов           │
│  Точность: 92%          Ошибок: 1           │
│                                             │
│  [ Пропустить ]        [ Закончить ]        │
└─────────────────────────────────────────────┘
