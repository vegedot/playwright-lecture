# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **pnpm** (version 10.24.0) as specified in package.json. Always use `pnpm` for dependency management:
- `pnpm install` - Install dependencies
- `pnpm add <package>` - Add a dependency
- `pnpm add -D <package>` - Add a dev dependency

## Project Overview

This is a Playwright lecture/tutorial repository that provides a comprehensive demo environment for learning and teaching Playwright testing. The project includes:
- A static demo website with various interactive elements (public/ directory)
- Comprehensive example tests demonstrating Playwright features (tests/ directory)
- Automated test server configuration

## Common Commands

### Running Tests

- `pnpm test` - Run all tests in headless mode
- `pnpm test:ui` - Open Playwright UI mode for interactive testing
- `pnpm test:debug` - Run tests in debug mode with step-through
- `pnpm test:headed` - Run tests in headed mode (visible browser)
- `pnpm test:chromium` - Run tests only in Chromium
- `pnpm test:firefox` - Run tests only in Firefox
- `pnpm test:webkit` - Run tests only in WebKit/Safari

### Running Single Tests

```bash
pnpm test tests/example.spec.ts  # Run specific test file
pnpm test -g "タイトル"           # Run tests matching pattern
pnpm test:debug tests/example.spec.ts  # Debug specific file
```

### Test Reports and Code Generation

- `pnpm report` - View HTML test report
- `pnpm codegen` - Launch Playwright code generator for creating new tests
- `pnpm serve` - Manually serve the demo website on http://localhost:8080

## Project Structure

```
playwright-lecture/
├── public/              # Demo website files
│   ├── index.html      # Main demo page with 7 test sections
│   └── about.html      # About page for navigation tests
├── tests/              # Playwright test files
│   └── example.spec.ts # Comprehensive example tests
├── playwright.config.ts # Playwright configuration
└── package.json        # Dependencies and scripts
```

## Demo Website Features (public/index.html)

The demo page includes 7 sections designed for testing different Playwright features:

1. **ボタンとクリックイベント** - Button interactions (click, double-click, disabled state)
2. **フォーム入力** - Form elements (text inputs, select, checkbox, textarea)
3. **リンクとナビゲーション** - Links (internal, external, anchor)
4. **動的コンテンツ** - Dynamic content (add/remove list items)
5. **テーブルデータ** - Table data with multiple rows
6. **モーダルダイアログ** - Modal open/close functionality
7. **待機とタイミング** - Async operations with delays

## Test Organization (tests/example.spec.ts)

Tests are organized into describe blocks by feature category:
- 基本的なナビゲーション - Basic navigation and page titles
- ボタンとクリックイベント - Button click interactions
- フォーム入力 - Form input testing
- リンクとナビゲーション - Link and navigation testing
- 動的コンテンツ - Dynamic content manipulation
- テーブルデータ - Table data verification
- モーダルダイアログ - Modal dialog interactions
- 待機とタイミング - Async operations and timeouts
- 様々なロケーター戦略 - Different locator strategies

## Playwright Configuration

- **Base URL**: http://localhost:8080
- **Test Directory**: ./tests
- **Browsers**: Chromium, Firefox, WebKit (all enabled)
- **Web Server**: Automatically starts http-server before tests
- **Reporters**: HTML report (view with `pnpm report`)
- **Parallel Execution**: Enabled by default

## Adding New Tests

When creating new tests for demonstration purposes:
1. Add new interactive elements to public/index.html if needed
2. Create tests in tests/ directory using the example.spec.ts as a reference
3. Use descriptive Japanese test names for clarity in lectures
4. Group related tests using test.describe() blocks
5. Include comments explaining the test steps for educational purposes
