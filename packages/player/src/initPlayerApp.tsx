import React, { useEffect, useState } from 'react';

import App from './App';
import { initLogStream } from './hooks/useLogStream';
import { startAdvancedThemeWatcher } from './services/advancedThemeDirService';
import { applyAdvancedThemeFromSettingsIfAny } from './services/advancedThemeService';
import { initBridgeHandler } from './services/bridge/bridgeHandler';
import { registerBuiltInCoreSettings } from './services/coreSettings';
import { initDiscordHandler } from './services/discordHandler';
import { initDiscoveryService } from './services/discoveryService';
import { initHttpApiHandler } from './services/httpApi';
import {
  applyLanguageFromSettings,
  initLanguageWatcher,
} from './services/languageService';
import { loadMarketplaceThemes } from './services/marketplaceThemeDirService';
import { initMcpHandler } from './services/mcp';
import { initMpdHandler } from './services/mpd';
import { hydratePluginsFromRegistry } from './services/plugins/pluginBootstrap';
import { ytdlpEnsureInstalled } from './services/tauri/commands';
import { initializeFavoritesStore } from './stores/favoritesStore';
import { initializePlaylistStore } from './stores/playlistStore';
import { initializeProvidersStore } from './stores/providersStore';
import { initializeQueueStore } from './stores/queueStore';
import { initializeSettingsStore } from './stores/settingsStore';
import { initializeShortcutsStore } from './stores/shortcutsStore';
import { hydrateThemeStore } from './stores/themeStore';
import { useUpdaterStore } from './stores/updaterStore';

const SplashScreen: React.FC<{
  onFinished: () => void;
}> = ({ onFinished }) => {
  const [status, setStatus] = useState('Iniciando Nuclear...');
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    const runInit = async () => {
      try {
        setStatus('Cargando configuraciones base...');
        setProgress(15);
        await initializeSettingsStore();

        setStatus('Cargando proveedores de música...');
        setProgress(30);
        await initializeProvidersStore();
        await initializeShortcutsStore();

        setStatus('Cargando listas y favoritos...');
        setProgress(45);
        await initializeQueueStore();
        await initializeFavoritesStore();
        await initializePlaylistStore();
        await registerBuiltInCoreSettings();

        setStatus('Inicializando servicios locales...');
        setProgress(60);
        await initDiscoveryService();
        await initMcpHandler();
        await initMpdHandler();
        await initHttpApiHandler();
        await initBridgeHandler();
        await initDiscordHandler();

        setStatus('Aplicando preferencias de idioma...');
        setProgress(75);
        await applyLanguageFromSettings();
        await initLanguageWatcher();

        setStatus('Cargando temas e interfaz...');
        setProgress(90);
        await startAdvancedThemeWatcher();
        await loadMarketplaceThemes();
        await hydrateThemeStore();
        await applyAdvancedThemeFromSettingsIfAny();

        setStatus('Cargando extensiones y plugins...');
        setProgress(98);
        void hydratePluginsFromRegistry();
        void useUpdaterStore.getState().checkForUpdate();
        void ytdlpEnsureInstalled();

        setProgress(100);
        await new Promise((resolve) => setTimeout(resolve, 600));
        onFinished();
      } catch (err) {
        console.error(err);
        setStatus('Error al inicializar la aplicación');
      }
    };

    runInit();
  }, [onFinished]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0e0e10] font-sans text-[#f1f1f3] transition-all duration-500 select-none">
      <style>{`
        @keyframes equalizer-bar {
          0%, 100% { height: 6px; }
          50% { height: 26px; }
        }
        .animate-eq-1 { animation: equalizer-bar 0.8s ease-in-out infinite alternate; }
        .animate-eq-2 { animation: equalizer-bar 0.5s ease-in-out infinite alternate; }
        .animate-eq-3 { animation: equalizer-bar 0.7s ease-in-out infinite alternate; }
        .animate-eq-4 { animation: equalizer-bar 0.6s ease-in-out infinite alternate; }
        .animate-eq-5 { animation: equalizer-bar 0.9s ease-in-out infinite alternate; }
      `}</style>

      {/* Contenedor Minimalista Oscuro */}
      <div className="mx-4 flex w-full max-w-sm flex-col items-center gap-6 transition-all duration-300">
        {/* Encabezado y Logo */}
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="font-heading animate-pulse text-4xl font-extrabold tracking-[0.2em] text-[#22c55e]">
            NUCLEAR
          </h1>
          <span className="font-mono text-[9px] tracking-[0.35em] text-white/40">
            REPRODUCTOR DE AUDIO DIGITAL
          </span>
        </div>

        {/* Animación del Ecualizador Realista */}
        <div className="my-2 flex h-8 items-end gap-1.5">
          <div
            className="animate-eq-1 w-1.5 rounded-full bg-[#22c55e]"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="animate-eq-2 w-1.5 rounded-full bg-[#22c55e]"
            style={{ animationDelay: '0.3s' }}
          ></div>
          <div
            className="animate-eq-3 w-1.5 rounded-full bg-[#22c55e]"
            style={{ animationDelay: '0.0s' }}
          ></div>
          <div
            className="animate-eq-4 w-1.5 rounded-full bg-[#22c55e]"
            style={{ animationDelay: '0.4s' }}
          ></div>
          <div
            className="animate-eq-5 w-1.5 rounded-full bg-[#22c55e]"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>

        {/* Barra de Progreso Lineal Ultra Delgada */}
        <div className="relative h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#22c55e] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Estado actual de carga */}
        <div className="flex h-4 animate-pulse items-center justify-center text-center text-[11px] font-medium tracking-wider text-white/60">
          {status}
        </div>

        {/* Pie de versión */}
        <div className="absolute bottom-8 font-mono text-[9px] tracking-widest text-white/20">
          v1.40.0 • CARGANDO RECURSOS
        </div>
      </div>
    </div>
  );
};

export const initPlayerApp = async (
  root: ReturnType<typeof import('react-dom/client').createRoot>,
) => {
  initLogStream();

  root.render(
    <React.StrictMode>
      <SplashScreen
        onFinished={() => {
          root.render(
            <React.StrictMode>
              <App />
            </React.StrictMode>,
          );
        }}
      />
    </React.StrictMode>,
  );
};
