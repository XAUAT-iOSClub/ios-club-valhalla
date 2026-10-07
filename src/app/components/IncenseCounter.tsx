'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'valhalla:incense-count';
const BURN_DURATION_MS = 3000;

/* ------------------------------------------------------------------ *
 * 把 localStorage 计数器包装成一个外部 store，交给 useSyncExternalStore。
 * 这样预渲染时有明确的 server snapshot，不需要在 effect 里 setState。
 * ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

/**
 * 计数存两处：localStorage 用于跨会话保留，模块级变量用于 localStorage
 * 不可用（隐私模式 / 禁用站点数据）时本次会话仍能正常计数。
 * null 表示缓存失效，下次读取时重新读盘。
 */
let cachedCount: number | null = null;

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // 其他标签页写入时同步过来
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    cachedCount = null;
    emitChange();
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function getSnapshot(): number {
  if (cachedCount === null) {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const parsed = stored === null ? 0 : Number.parseInt(stored, 10);
      cachedCount = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    } catch {
      cachedCount = 0;
    }
  }
  return cachedCount;
}

/** 静态导出预渲染时没有 localStorage，一律按 0 渲染 */
function getServerSnapshot(): number {
  return 0;
}

function increment() {
  const next = getSnapshot() + 1;
  cachedCount = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    // 写入失败不影响本次会话 —— 值已经落在 cachedCount 上了
  }
  emitChange();
}

const subscribeNoop = () => () => {};

/** 预渲染与水合期间为 false，水合完成后为 true —— 用于避开 0 → N 的跳变 */
function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export default function IncenseCounter() {
  const count = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useHydrated();
  const [isBurning, setIsBurning] = useState(false);
  const burnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (burnTimer.current !== null) {
        clearTimeout(burnTimer.current);
        burnTimer.current = null;
      }
    };
  }, []);

  const handleBurnIncense = useCallback(() => {
    // 用 ref 而不是 state 判重，避免闭包读到旧值
    if (burnTimer.current !== null) return;

    increment();
    setIsBurning(true);

    burnTimer.current = setTimeout(() => {
      setIsBurning(false);
      burnTimer.current = null;
    }, BURN_DURATION_MS);
  }, []);

  return (
    <>
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">赛博烧香</h2>
        <p className="text-gray-600 mb-6">先烧再说</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="text-center">
            <div className="relative flex justify-center items-center mb-6">
              <div className={`transition-all duration-1000 ${isBurning ? 'scale-110' : 'scale-100'}`}>
                <div className="relative w-16 h-24 mx-auto">
                  <div
                    className="absolute bottom-0 w-8 h-20 bg-amber-800 rounded-t-lg mx-auto left-1/2 transform -translate-x-1/2"></div>
                  <div
                    className="absolute bottom-0 w-4 h-4 bg-amber-600 rounded-full mx-auto left-1/2 transform -translate-x-1/2"></div>

                  {/* 烟雾效果 */}
                  {isBurning && (
                    <>
                      <div
                        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-300 rounded-full animate-ping opacity-75"></div>
                      <div
                        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                      <div
                        className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-500 rounded-full animate-ping opacity-50"></div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBurnIncense}
              disabled={isBurning}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                isBurning
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isBurning ? '燃烧中...' : '点燃香火'}
            </button>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-gray-700">
                您已点燃{' '}
                <span className="font-bold text-amber-600">{hydrated ? count : '—'}</span>{' '}
                柱香火
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
