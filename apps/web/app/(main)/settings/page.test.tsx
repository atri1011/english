import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsPage from './page';

// 由于页面使用了 `useEffect` 来获取数据，我们需要模拟它
// 在这个测试中，我们假设 API 请求是成功的
jest.mock('@ai-sentence-app/shared-types', () => ({
  UserApiConfig: {
    user_id: 'string',
    api_url: 'string',
    model_name: 'string',
  },
}));

describe('SettingsPage', () => {
  beforeEach(() => {
    // 重置所有模拟
    jest.clearAllMocks();

    // 模拟 useEffect 中的 fetch
    global.fetch = jest.fn((url) => {
      if (url.toString().includes("/api/user/config")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            api_url: 'https://api.test.com/v1',
            model_name: 'gpt-4-test',
          }),
        })
      }
      return Promise.reject(new Error('Unknown fetch call'));
    }) as jest.Mock;
  });

  it('renders the settings form correctly', () => {
    render(<SettingsPage />);
    expect(screen.getByLabelText(/API URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/API 密钥/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/模型名称/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /保存/i })).toBeInTheDocument();
  });

  it('pre-fills the form with existing user config', async () => {
    render(<SettingsPage />);

    // 等待 useEffect 中的异步操作完成
    await waitFor(() => {
      expect(screen.getByLabelText(/API URL/i)).toHaveValue('https://api.mock.com/v1');
    });
    await waitFor(() => {
        expect(screen.getByLabelText(/模型名称/i)).toHaveValue('gpt-4-mock');
    });
    
    // API密钥字段不应被预填充
    expect(screen.getByLabelText(/API 密钥/i)).toHaveValue('');
  });

  it('allows user to input new values', () => {
    render(<SettingsPage />);
    const apiUrlInput = screen.getByLabelText(/API URL/i);
    const apiKeyInput = screen.getByLabelText(/API 密钥/i);
    const modelNameInput = screen.getByLabelText(/模型名称/i);

    fireEvent.change(apiUrlInput, { target: { value: 'https://api.new.com/v1' } });
    fireEvent.change(apiKeyInput, { target: { value: 'new-secret-key' } });
    fireEvent.change(modelNameInput, { target: { value: 'claude-3-opus' } });

    expect(apiUrlInput).toHaveValue('https://api.new.com/v1');
    expect(apiKeyInput).toHaveValue('new-secret-key');
    expect(modelNameInput).toHaveValue('claude-3-opus');
  });

  it('shows a success message after saving', async () => {
    render(<SettingsPage />);
    const saveButton = screen.getByRole('button', { name: /保存/i });

    // 填写所有必填字段
    const apiUrlInput = screen.getByLabelText(/API URL/i);
    const apiKeyInput = screen.getByLabelText(/API 密钥/i);
    const modelNameInput = screen.getByLabelText(/模型名称/i);

    fireEvent.change(apiUrlInput, { target: { value: 'https://api.test.com/v1' } });
    fireEvent.change(apiKeyInput, { target: { value: 'test-api-key' } });
    fireEvent.change(modelNameInput, { target: { value: 'gpt-4' } });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('设置已成功保存！')).toBeInTheDocument();
    });
  });
});