# 🤖 Claude Code Agents

Коллекция из 10 специализированных агентов для Claude Code, которые повысят вашу продуктивность в разработке.

---

## 📋 Список агентов

| # | Агент | Назначение |
|---|-------|------------|
| 1 | [Code Reviewer](./01-code-reviewer.md) | Анализ качества кода, поиск багов |
| 2 | [Test Generator](./02-test-generator.md) | Генерация unit/integration тестов |
| 3 | [API Documentation](./03-api-documentation.md) | Создание документации API |
| 4 | [Security Scanner](./04-security-scanner.md) | Поиск уязвимостей в коде |
| 5 | [Refactoring](./05-refactoring.md) | Рефакторинг и улучшение кода |
| 6 | [Git Commit](./06-git-commit.md) | Генерация commit-сообщений |
| 7 | [Database Migration](./07-database-migration.md) | Создание и анализ миграций БД |
| 8 | [i18n Localization](./08-i18n-localization.md) | Локализация на разные языки |
| 9 | [Performance Profiler](./09-performance-profiler.md) | Оптимизация производительности |
| 10 | [DevOps Deploy](./10-devops-deploy.md) | CI/CD и Docker конфигурации |

---

## 🚀 Установка

### Метод 1: Использование с пользовательскими инструкциями

1. Откройте Claude Code
2. Добавьте содержимое файла агента в ваш `.claude/settings.json`:

```json
{
  "instructions": [
    "path/to/agents/01-code-reviewer.md"
  ]
}
```

### Метод 2: Прямое использование

Скопируйте System Prompt из нужного агента и вставьте в начале сессии:

```
Ты — эксперт по анализу качества кода (Code Reviewer Agent)...
```

### Метод 3: Создание alias

Добавьте в ваш `.bashrc` или `.zshrc`:

```bash
alias claude-review='claude --system "$(cat ~/agents/01-code-reviewer.md)"'
alias claude-test='claude --system "$(cat ~/agents/02-test-generator.md)"'
alias claude-docs='claude --system "$(cat ~/agents/03-api-documentation.md)"'
alias claude-security='claude --system "$(cat ~/agents/04-security-scanner.md)"'
alias claude-refactor='claude --system "$(cat ~/agents/05-refactoring.md)"'
alias claude-commit='claude --system "$(cat ~/agents/06-git-commit.md)"'
alias claude-db='claude --system "$(cat ~/agents/07-database-migration.md)"'
alias claude-i18n='claude --system "$(cat ~/agents/08-i18n-localization.md)"'
alias claude-perf='claude --system "$(cat ~/agents/09-performance-profiler.md)"'
alias claude-devops='claude --system "$(cat ~/agents/10-devops-deploy.md)"'
```

---

## 📖 Примеры использования

### Code Reviewer
```bash
claude-review "Проверь src/services/UserService.ts на соответствие best practices"
```

### Test Generator
```bash
claude-test "Напиши unit-тесты для функции calculateDiscount в utils/pricing.ts"
```

### API Documentation
```bash
claude-docs "Создай OpenAPI спецификацию для всех endpoints в src/app/api"
```

### Security Scanner
```bash
claude-security "Найди SQL-инъекции и XSS уязвимости в проекте"
```

### Refactoring
```bash
claude-refactor "Отрефактори PaymentService используя SOLID принципы"
```

### Git Commit
```bash
claude-commit "Проанализируй staged изменения и создай commit-сообщение"
```

### Database Migration
```bash
claude-db "Создай Prisma миграцию для добавления таблицы orders"
```

### i18n Localization
```bash
claude-i18n "Извлеки строки для перевода и создай файлы для en, ru, de"
```

### Performance Profiler
```bash
claude-perf "Найди N+1 запросы и предложи оптимизации"
```

### DevOps Deploy
```bash
claude-devops "Создай Dockerfile и docker-compose.yml для Next.js приложения"
```

---

## 🛠️ Кастомизация

Каждый агент можно настроить под ваши потребности:

### Добавление правил проекта

Отредактируйте System Prompt агента, добавив:

```markdown
## Правила проекта:
- Использовать TypeScript strict mode
- Следовать style guide компании
- Обязательные тесты для всех новых функций
```

### Интеграция с инструментами

Добавьте в агента информацию о ваших инструментах:

```markdown
## Инструменты проекта:
- ESLint конфигурация: .eslintrc.custom.js
- Тесты: Vitest + React Testing Library
- CI/CD: GitHub Actions
```

---

## 📊 Сравнение агентов

| Агент | Входные данные | Выходные данные | Время выполнения |
|-------|----------------|-----------------|------------------|
| Code Reviewer | Файлы кода | Отчёт + рекомендации | ~1-2 мин |
| Test Generator | Исходный код | Тестовые файлы | ~2-3 мин |
| API Documentation | API роуты | OpenAPI + README | ~3-5 мин |
| Security Scanner | Весь проект | Отчёт по безопасности | ~2-5 мин |
| Refactoring | Файлы кода | Отрефакторенный код | ~5-10 мин |
| Git Commit | git diff | Commit сообщение | ~30 сек |
| Database Migration | Schema описание | SQL/Prisma миграции | ~1-3 мин |
| i18n Localization | UI компоненты | JSON файлы локализации | ~3-5 мин |
| Performance Profiler | Код + метрики | Рекомендации | ~2-5 мин |
| DevOps Deploy | Описание проекта | Docker/K8s конфиги | ~5-10 мин |

---

## 🤝 Вклад в проект

Хотите улучшить агентов?

1. Форкните репозиторий
2. Создайте ветку: `git checkout -b feature/new-agent`
3. Внесите изменения
4. Создайте Pull Request

---

## 📝 Лицензия

MIT License — используйте свободно в личных и коммерческих проектах.

---

## 💡 Советы

### Комбинирование агентов

Используйте несколько агентов последовательно:

```bash
# 1. Проверка безопасности
claude-security "Проверь проект"

# 2. Рефакторинг найденных проблем
claude-refactor "Исправь найденные security issues"

# 3. Добавление тестов
claude-test "Напиши тесты для отрефакторенного кода"

# 4. Создание коммита
claude-commit "Создай commit для всех изменений"
```

### Автоматизация

Создайте скрипт для частых задач:

```bash
#!/bin/bash
# pre-commit-check.sh

echo "🔍 Running security scan..."
claude-security "Quick security check"

echo "🧪 Generating tests..."
claude-test "Generate tests for changed files"

echo "📝 Creating commit message..."
claude-commit "Analyze staged changes"
```

---

**Создано с ❤️ для разработчиков**
