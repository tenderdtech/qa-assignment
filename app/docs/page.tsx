"use client";

import { useEffect } from "react";

export default function SwaggerUI() {
  useEffect(() => {
    // Load Swagger UI
    const script = document.createElement("script");
    script.src = "https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js";
    script.onload = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css";
      document.head.appendChild(link);
      
      // Initialize Swagger UI
      // @ts-expect-error - Swagger UI is loaded dynamically
      window.SwaggerUIBundle({
        url: "/api/docs",
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [
          // @ts-expect-error - Swagger UI presets
          window.SwaggerUIBundle.presets.apis,
          // @ts-expect-error - Swagger UI standalone preset
          window.SwaggerUIBundle.SwaggerUIStandalonePreset,
        ],
        plugins: [
          // @ts-expect-error - Swagger UI plugins
          window.SwaggerUIBundle.plugins.DownloadUrl,
        ],
        theme: "light",
        supportedSubmitMethods: ["get", "post", "put", "delete", "patch"],
      });
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector(
        'script[src*="swagger-ui-dist"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
      const existingLink = document.querySelector(
        'link[href*="swagger-ui-dist"]'
      );
      if (existingLink) {
        existingLink.remove();
      }
      const customStyle = document.querySelector("style");
      if (customStyle) {
        customStyle.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Equipment Status Tracker API Documentation
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Interactive API documentation and testing interface
            </p>
          </div>
        </div>
      </div>

      <div
        id="swagger-ui"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white"
        style={{ minHeight: "600px" }}
      >
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading API documentation...</p>
        </div>
      </div>
    </div>
  );
}
