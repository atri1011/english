"use client";

import { useState, useEffect } from "react";
import { UserApiConfig } from "shared-types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [modelName, setModelName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      // 模拟API调用，此部分将在故事1.6中替换为真实的API请求
      const mockConfig: UserApiConfig = {
        user_id: "mock-user-id",
        api_url: "https://api.mock.com/v1",
        model_name: "gpt-4-mock",
      };
      
      if (mockConfig) {
        setApiUrl(mockConfig.api_url);
        setModelName(mockConfig.model_name);
      }
    };

    fetchConfig();
  }, []);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // 模拟API调用，此部分将在故事1.6中替换为真实的API请求
    try {
      // 假设这是要发送到后端的负载
      const payload = {
        api_url: apiUrl,
        api_key: apiKey,
        model_name: modelName,
      };

      console.log("正在保存设置:", payload);
      
      // 模拟一个成功的API响应
      await new Promise(resolve => setTimeout(resolve, 500));

      setSuccessMessage("设置已成功保存！");
      // 实际应用中，您可能希望在成功后重新获取配置或执行其他操作
    } catch (error) {
      setError("保存失败，请稍后重试。");
      console.error("保存设置失败:", error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-16">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>API 设置</CardTitle>
          <CardDescription>
            在这里配置您的 AI 服务 API 信息，以便应用可以连接到您的 AI 服务。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="api-url">API URL</Label>
              <Input
                id="api-url"
                type="text"
                placeholder="https://api.example.com/v1"
                required
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                您的 AI 服务提供商的 API 端点地址。
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="api-key">API 密钥</Label>
              <Input
                id="api-key"
                type="password"
                required
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                您的 API 密钥将经过安全加密存储，不会被明文显示。
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model-name">模型名称</Label>
              <Input
                id="model-name"
                type="text"
                placeholder="gpt-4"
                required
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                您希望使用的 AI 模型名称，例如 "gpt-4" 或 "claude-3"。
              </p>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            <Button type="submit" className="w-full">
              保存
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}