import { isUndefined } from 'lodash-es';

import type {
  MetadataProvider,
  ProviderDescriptor,
  ProviderKind,
  ProvidersHost,
} from '@nuclearplayer/plugin-sdk';

import { useProvidersStore } from '../stores/providersStore';
import { setupStreamingPairingSync } from './streamingPairingSync';

const createProvidersHost = (): ProvidersHost => {
  const byKind = new Map<ProviderKind, Map<string, ProviderDescriptor>>();
  const byId = new Map<string, ProviderDescriptor>();
  const subscribers = new Set<() => void>();

  const notify = () => {
    for (const listener of subscribers) {
      listener();
    }
  };

  const firstOfKind = (kind: ProviderKind): ProviderDescriptor | undefined =>
    byKind.get(kind)?.values().next().value;

  const isRegistered = (providerId: string | undefined): boolean =>
    !isUndefined(providerId) && byId.has(providerId);

  const pairedStreamingProviderIdFor = (
    metadataProviderId: string | undefined,
  ): string | undefined => {
    const metadataProvider = metadataProviderId
      ? (byId.get(metadataProviderId) as MetadataProvider)
      : undefined;
    const pairedId = metadataProvider?.streamingProviderId;
    return isRegistered(pairedId) ? pairedId : undefined;
  };

  useProvidersStore.subscribe(() => notify());

  return {
    register<T extends ProviderDescriptor>(provider: T): string {
      const kindMap = byKind.get(provider.kind) ?? new Map();
      kindMap.set(provider.id, provider);
      byKind.set(provider.kind, kindMap);
      byId.set(provider.id, provider);

      const store = useProvidersStore.getState();
      // Activate the first registered provider if no selection is persisted.
      // A persisted id that isn't registered yet is preserved: the matching
      // provider may still register later.
      if (!store.getActive(provider.kind)) {
        store.setActive(provider.kind, provider.id);
      }

      notify();
      return provider.id;
    },

    unregister(providerId: string): boolean {
      const current = byId.get(providerId);
      if (!current) {
        return false;
      }
      byId.delete(providerId);
      const kindMap = byKind.get(current.kind);
      kindMap?.delete(providerId);
      if (kindMap?.size === 0) {
        byKind.delete(current.kind);
      }

      notify();
      return true;
    },

    list<K extends ProviderKind = ProviderKind>(kind?: K) {
      if (kind) {
        const map = byKind.get(kind as ProviderKind);
        return (map ? Array.from(map.values()) : []) as ProviderDescriptor<K>[];
      }
      const all: ProviderDescriptor[] = [];
      for (const map of byKind.values()) {
        for (const value of map.values()) {
          all.push(value);
        }
      }
      return all as ProviderDescriptor<K>[];
    },

    get<T extends ProviderDescriptor>(
      providerId: string | undefined,
      kind: ProviderKind,
    ) {
      if (!providerId) {
        return undefined;
      }
      const provider = byId.get(providerId);
      if (!provider || provider.kind !== kind) {
        return undefined;
      }
      return provider as T;
    },

    clear() {
      byKind.clear();
      byId.clear();
      useProvidersStore.getState().clearAllActive();
      notify();
    },

    getActive(kind: ProviderKind) {
      const preferredId = useProvidersStore.getState().getActive(kind);
      if (preferredId && isRegistered(preferredId)) {
        return preferredId;
      }
      const fallback = firstOfKind(kind);
      return fallback?.id;
    },

    setActive(kind: ProviderKind, providerId: string) {
      useProvidersStore.getState().setActive(kind, providerId);
    },

    subscribe(listener: () => void) {
      subscribers.add(listener);
      return () => {
        subscribers.delete(listener);
      };
    },

    resolveActiveOnBootstrap() {
      const store = useProvidersStore.getState();

      const pairedStreamingProviderId = pairedStreamingProviderIdFor(
        store.getActive('metadata'),
      );
      if (
        pairedStreamingProviderId &&
        store.getActive('streaming') !== pairedStreamingProviderId
      ) {
        store.setActive('streaming', pairedStreamingProviderId);
      }

      notify();
    },
  };
};

export const providersHost: ProvidersHost = createProvidersHost();

setupStreamingPairingSync(providersHost);
