import { useSignal } from '@preact/signals';
import { createRef, JSX } from 'preact';

export function NavBar() {
  const cssHtml = useSignal('');
  const styleRef = createRef<HTMLStyleElement>();

  const handleSearchInput: JSX.InputEventHandler<HTMLInputElement> = (e) => {
    const value = (e.target as HTMLInputElement).value;
    const nameFilter = value ? `[data-dojo-name*="${value.toLocaleLowerCase()}"]` : '[data-dojo-name]';
    const css = `.dojo-container > .dojo-card:not(${nameFilter}) {
      display: none;
    }`;
    // styleRef.current && (styleRef.current.innerHTML = css);
    cssHtml.value = css;
  };

  return (
    <nav class='sticky top-0 z-50 bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/40 shadow-sm'>
      <div class='max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6'>
        <div class='flex h-14 items-center justify-between gap-4'>
          <div class='flex-shrink-0'>
            <h1 class='text-xl font-bold text-gray-900'>E-mage 武館列表</h1>
          </div>

          <div class='flex flex-1 items-center justify-center gap-4 max-w-2xl'>
            <input
              type='search'
              placeholder='搜尋武館名稱...'
              class='w-full px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent focus-visible:outline-none'
              onInput={handleSearchInput}
            />

            <select id='level-filter' class='px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent' // onChange={handleLevelChange}
            >
              <option value=''>所有等級</option>
              <option value='1'>等級 1</option>
              <option value='2'>等級 2</option>
              <option value='3'>等級 3</option>
              <option value='4'>等級 4</option>
              <option value='5'>等級 5</option>
            </select>

            <select id='box-level-id-filter' class='px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent' // onChange={handleBlockChange}
            >
              <option value=''>所有積木包</option>
              <option value='1'>基礎積木包</option>
              <option value='2'>教練積木包</option>
              <option value='3'>大師積木包</option>
              <option value='4'>傳奇積木包</option>
              <option value='5'>無限積木包</option>
            </select>

            <label class='relative inline-block'>
              <input id='dojo-sort' type='checkbox' class='peer sr-only' name='sort-direction' />
              <div class='h-8 px-3 flex items-center justify-center rounded-lg border border-gray-300 bg-white cursor-pointer hover:bg-gray-50 peer-checked:[&>:first-child]:hidden peer-checked:[&>:last-child]:block [&>:first-child]:block [&>:last-child]:hidden focus:ring-2 focus:ring-yellow-400'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-arrow-up-wide-narrow h-5 w-5 text-gray-600'>
                  <path d='m3 8 4-4 4 4' />
                  <path d='M7 4v16' />
                  <path d='M11 12h10' />
                  <path d='M11 16h7' />
                  <path d='M11 20h4' />
                </svg>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-arrow-down-narrow-wide h-5 w-5 text-gray-600'>
                  <path d='m3 16 4 4 4-4' />
                  <path d='M7 20V4' />
                  <path d='M11 4h4' />
                  <path d='M11 8h7' />
                  <path d='M11 12h10' />
                </svg>
              </div>
            </label>
          </div>

          <div class='flex-shrink-0'>
            <a
              href='https://github.com/T1ckbase/egame-dojos'
              target='_blank'
              rel='noopener noreferrer'
              class='text-gray-500 hover:text-gray-700'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-github h-7 w-7'>
                <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
                <path d='M9 18c-4.51 2-5-2-7-2' />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <style ref={styleRef} dangerouslySetInnerHTML={{ __html: cssHtml.value }} />
    </nav>
  );
}
