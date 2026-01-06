import { test, expect } from '@playwright/test';

/**
 * 基本的なナビゲーションとタイトルチェック
 */
test.describe('基本的なナビゲーション', () => {
  test('ページタイトルが正しく表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Playwright デモページ');
  });

  test('h1見出しが正しく表示される', async ({ page }) => {
    await page.goto('/');
    const heading = page.getByRole('heading', { name: 'Playwright テストデモページ', level: 1 });
    await expect(heading).toBeVisible();
  });
});

/**
 * ボタンとクリックイベントのテスト
 */
test.describe('ボタンとクリックイベント', () => {
  test('クリックボタンをクリックするとメッセージが表示される', async ({ page }) => {
    await page.goto('/');

    // getByRoleでボタンを取得
    const clickButton = page.getByRole('button', { name: 'クリックしてください' });
    await clickButton.click();

    // 結果メッセージが表示されることを確認
    const result = page.locator('#clickResult');
    await expect(result).toBeVisible();
    await expect(result).toHaveText('ボタンがクリックされました！');
  });

  test('ダブルクリックボタンをダブルクリックするとメッセージが表示される', async ({ page }) => {
    await page.goto('/');

    // getByRoleでボタンを取得
    const doubleClickButton = page.getByRole('button', { name: 'ダブルクリック' });
    await doubleClickButton.dblclick();

    // 結果メッセージが表示されることを確認
    const result = page.locator('#clickResult');
    await expect(result).toHaveText('ダブルクリックされました！');
  });

  test('無効なボタンは押せない', async ({ page }) => {
    await page.goto('/');

    const disabledBtn = page.getByRole('button', { name: '無効なボタン' });
    await expect(disabledBtn).toBeDisabled();
  });
});

/**
 * フォーム入力のテスト
 */
test.describe('フォーム入力', () => {
  test('テキスト入力フィールドに入力できる', async ({ page }) => {
    await page.goto('/');

    // getByLabelまたはgetByPlaceholderで入力フィールドを取得
    const usernameInput = page.getByPlaceholder('ユーザー名を入力');
    await usernameInput.fill('テストユーザー');
    await expect(usernameInput).toHaveValue('テストユーザー');

    // プレースホルダーで取得
    const emailInput = page.getByPlaceholder('email@example.com');
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  });

  test('数値入力フィールドに入力できる', async ({ page }) => {
    await page.goto('/');

    // getByLabelで取得
    const ageInput = page.getByLabel('年齢:');
    await ageInput.fill('25');
    await expect(ageInput).toHaveValue('25');
  });

  test('セレクトボックスから選択できる', async ({ page }) => {
    await page.goto('/');

    // getByLabelで取得
    const countrySelect = page.getByLabel('国:');
    await countrySelect.selectOption('japan');
    await expect(countrySelect).toHaveValue('japan');
  });

  test('チェックボックスを選択できる', async ({ page }) => {
    await page.goto('/');

    // getByLabelでチェックボックスを取得
    const readingCheckbox = page.getByLabel('読書');
    const musicCheckbox = page.getByLabel('音楽');
    const sportsCheckbox = page.getByLabel('スポーツ');

    await readingCheckbox.check();
    await musicCheckbox.check();

    // チェックされていることを確認
    await expect(readingCheckbox).toBeChecked();
    await expect(musicCheckbox).toBeChecked();
    await expect(sportsCheckbox).not.toBeChecked();
  });

  test('テキストエリアに入力できる', async ({ page }) => {
    await page.goto('/');

    const message = 'これはテストメッセージです。\n複数行のテキストです。';
    const messageTextarea = page.getByLabel('メッセージ:');
    await messageTextarea.fill(message);
    await expect(messageTextarea).toHaveValue(message);
  });

  test('フォーム送信が正しく動作する', async ({ page }) => {
    await page.goto('/');

    // フォームに入力（推奨されるロケーターを使用）
    await page.getByPlaceholder('ユーザー名を入力').fill('山田太郎');
    await page.getByPlaceholder('email@example.com').fill('yamada@example.com');
    await page.getByLabel('年齢:').fill('30');
    await page.getByLabel('国:').selectOption('japan');
    await page.getByLabel('読書').check();
    await page.getByLabel('メッセージ:').fill('テストメッセージ');

    // 送信ボタンをクリック
    await page.getByRole('button', { name: '送信' }).click();

    // 送信結果が表示されることを確認
    const result = page.locator('#formResult');
    await expect(result).toBeVisible();
    await expect(result).toContainText('送信されたデータ');
    await expect(result).toContainText('山田太郎');
  });

  test('リセットボタンでフォームがクリアされる', async ({ page }) => {
    await page.goto('/');

    // フォームに入力
    const usernameInput = page.getByPlaceholder('ユーザー名を入力');
    const emailInput = page.getByPlaceholder('email@example.com');

    await usernameInput.fill('テストユーザー');
    await emailInput.fill('test@example.com');

    // リセットボタンをクリック
    await page.getByRole('button', { name: 'リセット' }).click();

    // フォームがクリアされたことを確認
    await expect(usernameInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
  });
});

/**
 * リンクとナビゲーションのテスト
 */
test.describe('リンクとナビゲーション', () => {
  test('Aboutページへ遷移できる', async ({ page }) => {
    await page.goto('/');

    // getByRoleでリンクを取得
    await page.getByRole('link', { name: 'Aboutページへ' }).click();

    // URLが変わったことを確認
    await expect(page).toHaveURL(/about\.html/);

    // Aboutページの内容を確認
    await expect(page.getByRole('heading', { name: 'About このページについて', level: 1 })).toBeVisible();
  });

  test('Aboutページから戻れる', async ({ page }) => {
    await page.goto('/about.html');

    // 戻るリンクをクリック
    await page.getByRole('link', { name: 'ホームに戻る' }).click();

    // ホームページに戻ったことを確認
    await expect(page).toHaveURL(/index\.html/);
    await expect(page.getByRole('heading', { name: 'Playwright テストデモページ', level: 1 })).toBeVisible();
  });

  test('外部リンクが新しいタブで開く', async ({ page, context }) => {
    await page.goto('/');

    // 新しいページが開かれるのを待つ
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Playwright公式サイト' }).click()
    ]);

    // 新しいタブで正しいURLが開かれたことを確認
    await expect(newPage).toHaveURL(/playwright\.dev/);
  });

  test('アンカーリンクでページ内移動できる', async ({ page }) => {
    await page.goto('/');

    // アンカーリンクをクリック
    await page.getByRole('link', { name: 'セクション4へジャンプ' }).click();

    // セクション4が表示されることを確認
    const section4 = page.locator('#section4');
    await expect(section4).toBeInViewport();
  });
});

/**
 * 動的コンテンツのテスト
 */
test.describe('動的コンテンツ', () => {
  test('アイテムを追加できる', async ({ page }) => {
    await page.goto('/');

    // 初期状態を確認
    await expect(page.getByText('アイテム数: 0')).toBeVisible();

    // アイテムを追加
    const addButton = page.getByRole('button', { name: 'アイテムを追加' });
    await addButton.click();
    await addButton.click();
    await addButton.click();

    // アイテムが追加されたことを確認
    const items = page.locator('#itemList li');
    await expect(items).toHaveCount(3);
    await expect(page.getByText('アイテム数: 3')).toBeVisible();
  });

  test('アイテムを個別に削除できる', async ({ page }) => {
    await page.goto('/');

    // アイテムを追加
    const addButton = page.getByRole('button', { name: 'アイテムを追加' });
    await addButton.click();
    await addButton.click();

    // 最初のアイテムを削除（getByRoleで削除ボタンを取得）
    await page.locator('#itemList li:first-child').getByRole('button', { name: '削除' }).click();

    // アイテム数が減ったことを確認
    const items = page.locator('#itemList li');
    await expect(items).toHaveCount(1);
    await expect(page.getByText('アイテム数: 1')).toBeVisible();
  });

  test('リストをクリアできる', async ({ page }) => {
    await page.goto('/');

    // アイテムを追加
    const addButton = page.getByRole('button', { name: 'アイテムを追加' });
    await addButton.click();
    await addButton.click();

    // リストをクリア
    await page.getByRole('button', { name: 'リストをクリア' }).click();

    // リストが空になったことを確認
    const items = page.locator('#itemList li');
    await expect(items).toHaveCount(0);
    await expect(page.getByText('アイテム数: 0')).toBeVisible();
  });
});

/**
 * テーブルのテスト
 */
test.describe('テーブルデータ', () => {
  test('テーブルに正しい行数が表示される', async ({ page }) => {
    await page.goto('/');

    const rows = page.locator('#userTable tbody tr');
    await expect(rows).toHaveCount(3);
  });

  test('特定のセルの内容を確認できる', async ({ page }) => {
    await page.goto('/');

    // getByRoleでテーブルのセルを取得
    const table = page.getByRole('table');

    // 1行目のデータを確認（getByTextやgetByRoleを組み合わせる）
    await expect(table.getByRole('cell', { name: '田中太郎' })).toBeVisible();
    await expect(table.getByRole('cell', { name: 'エンジニア' })).toBeVisible();

    // より具体的な確認
    const firstRow = page.locator('#userTable tbody tr:first-child');
    await expect(firstRow.locator('td').nth(0)).toHaveText('1');
    await expect(firstRow.locator('td').nth(1)).toHaveText('田中太郎');
    await expect(firstRow.locator('td').nth(2)).toHaveText('エンジニア');
    await expect(firstRow.locator('td').nth(3)).toHaveText('アクティブ');
  });

  test('特定の条件でフィルタリングできる', async ({ page }) => {
    await page.goto('/');

    // 「アクティブ」状態のユーザーを検索
    const activeUsers = page.locator('#userTable tbody tr:has(td:text("アクティブ"))');
    await expect(activeUsers).toHaveCount(2);
  });
});

/**
 * モーダルダイアログのテスト
 */
test.describe('モーダルダイアログ', () => {
  test('モーダルを開いて閉じることができる', async ({ page }) => {
    await page.goto('/');

    const modal = page.locator('#modal');

    // 初期状態でモーダルは非表示
    await expect(modal).not.toHaveClass(/show/);

    // モーダルを開く
    await page.getByRole('button', { name: 'モーダルを開く' }).click();
    await expect(modal).toHaveClass(/show/);
    await expect(modal).toBeVisible();

    // モーダルの内容を確認
    await expect(page.locator('.modal-content').getByRole('heading', { name: 'モーダルダイアログ' })).toBeVisible();

    // モーダルを閉じる
    await page.locator('.modal-content').getByRole('button', { name: '閉じる' }).click();
    await expect(modal).not.toHaveClass(/show/);
  });
});

/**
 * 待機とタイミングのテスト
 */
test.describe('待機とタイミング', () => {
  test('遅延後にメッセージが表示される', async ({ page }) => {
    await page.goto('/');

    const result = page.locator('#delayedResult');
    const button = page.getByRole('button', { name: '3秒後にメッセージ表示' });

    // ボタンをクリック
    await button.click();

    // 読み込み中メッセージを確認
    await expect(result).toHaveText('読み込み中...');
    await expect(button).toBeDisabled();

    // 3秒後のメッセージを待つ
    await expect(result).toHaveText('3秒経過しました！データが表示されました。', { timeout: 5000 });
    await expect(button).toBeEnabled();
  });
});

/**
 * ロケーター戦略のデモ
 */
test.describe('様々なロケーター戦略', () => {
  test('推奨: getByRoleでの要素選択', async ({ page }) => {
    await page.goto('/');

    // ロール（役割）で要素を検索 - 最も推奨される方法
    const heading = page.getByRole('heading', { name: '1. ボタンとクリックイベント' });
    await expect(heading).toBeVisible();

    const button = page.getByRole('button', { name: 'クリックしてください' });
    await expect(button).toBeVisible();

    // リンクをロールで検索
    const link = page.getByRole('link', { name: 'Aboutページへ' });
    await expect(link).toBeVisible();
  });

  test('推奨: getByLabelでフォーム要素を選択', async ({ page }) => {
    await page.goto('/');

    // ラベルでフォーム要素を検索 - フォームに推奨
    const usernameInput = page.getByLabel('ユーザー名:');
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill('ラベルテスト');
    await expect(usernameInput).toHaveValue('ラベルテスト');

    // チェックボックスもラベルで検索できる
    const checkbox = page.getByLabel('読書');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test('推奨: getByPlaceholderでの入力フィールド選択', async ({ page }) => {
    await page.goto('/');

    // プレースホルダーで検索 - ラベルがない場合に有効
    const usernameInput = page.getByPlaceholder('ユーザー名を入力');
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill('プレースホルダーテスト');
    await expect(usernameInput).toHaveValue('プレースホルダーテスト');
  });

  test('推奨: getByTextでテキストコンテンツを検索', async ({ page }) => {
    await page.goto('/');

    // テキストコンテンツで検索
    const subtitle = page.getByText('様々なテスト要素のサンプル');
    await expect(subtitle).toBeVisible();

    // 部分一致も可能
    const section = page.getByText('ボタンとクリックイベント');
    await expect(section).toBeVisible();
  });

  test('非推奨: CSS セレクター（必要な場合のみ使用）', async ({ page }) => {
    await page.goto('/');

    // IDでの選択 - 特定の要素の状態確認などに限定して使用
    await expect(page.locator('#clickBtn')).toBeVisible();

    // クラスでの選択 - できるだけ避ける
    await expect(page.locator('.container')).toBeVisible();

    // CSS セレクター - 最後の手段として使用
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('ロケーターの優先順位（推奨順）', async ({ page }) => {
    await page.goto('/');

    // 1. getByRole - 最優先（アクセシビリティ重視）
    await expect(page.getByRole('button', { name: 'クリックしてください' })).toBeVisible();

    // 2. getByLabel - フォーム要素に推奨
    await expect(page.getByLabel('ユーザー名:')).toBeVisible();

    // 3. getByPlaceholder - プレースホルダーがある場合
    await expect(page.getByPlaceholder('ユーザー名を入力')).toBeVisible();

    // 4. getByText - テキストコンテンツが明確な場合
    await expect(page.getByText('様々なテスト要素のサンプル')).toBeVisible();

    // 5. getByTestId - data-testid属性がある場合（テスト専用）
    // await expect(page.getByTestId('my-element')).toBeVisible();

    // 6. CSS/XPathセレクター - 他に方法がない場合のみ
    // await expect(page.locator('#unique-id')).toBeVisible();
  });
});
