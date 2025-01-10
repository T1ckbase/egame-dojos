import { DojoWithImage } from '../types/egame.ts';

export function DojoContainer({ dojos }: { dojos: DojoWithImage[] }) {
  return (
    <div class='dojo-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
      {dojos.filter((dojo) => dojo.isDesigned && dojo.isOpen && dojo.fund > 0).map((dojo) => (
        <a
          class='dojo-card block bg-white shadow-lg transition duration-200 overflow-hidden rounded-lg hover:shadow-xl hover:ring-2 hover:ring-yellow-400'
          key={dojo._id}
          href={`https://ap10.egame.kh.edu.tw/auth/main/#dojo/view/${dojo._id}`}
          target='_blank'
          data-level={dojo.level}
          data-dojo-name={dojo.dojoName}
          data-box-level-id={dojo.boxLevelId}
        >
          <div class='flex h-full'>
            <div class='flex-1 p-3 min-w-0 select-text'>
              <div class='text-sm'>
                <div class='flex gap-2'>
                  <span class='text-gray-500 shrink-0'>武館序號：</span>
                  <span class='text-gray-900 truncate font-mono'>{dojo._id}</span>
                </div>
                <div class='flex gap-2'>
                  <span class='text-gray-500 shrink-0'>武館等級：</span>
                  <span class='text-gray-900 truncate font-mono'>{dojo.level}</span>
                </div>
                <div class='flex gap-2'>
                  <span class='text-gray-500 shrink-0'>武館名稱：</span>
                  <span class='text-gray-900 line-clamp-2 font-mono'>{dojo.dojoName}</span>
                </div>
                <div class='flex gap-2'>
                  <span class='text-gray-500 shrink-0'>程式積木：</span>
                  <span class='text-gray-900 truncate'>{dojo.levelName}</span>
                </div>
                <div class='flex gap-2'>
                  <span class='text-gray-500 shrink-0'>積木數量：</span>
                  <span class='text-gray-900 truncate font-mono'>{dojo.makerIdealBlockNum}</span>
                </div>
                <div class='flex gap-2'>
                  <span class='text-gray-500 shrink-0'>武館營運基金：</span>
                  <span class='text-gray-900 truncate font-mono'>{dojo.fund}</span>
                </div>
                <div class='flex gap-2'>
                  <span class='text-gray-500 shrink-0'>武館聲望值：</span>
                  <span class='text-gray-900 truncate font-mono'>{dojo.dojoValue}</span>
                </div>
                <div class='flex gap-2'>
                  <span class='text-gray-500 shrink-0'>挑戰成功人數：</span>
                  <span class='text-gray-900 truncate font-mono'>{dojo.winCount}</span>
                </div>
                <div class='flex gap-2'>
                  <span class='text-gray-500 shrink-0'>挑戰失敗人數：</span>
                  <span class='text-gray-900 truncate font-mono'>{dojo.loseCount}</span>
                </div>
              </div>
            </div>

            <div class='w-32 md:w-40 lg:w-48 shrink-0 self-center pe-3'>
              <div class='aspect-square'>
                <img
                  src={dojo.image}
                  alt={dojo.dojoName}
                  class='h-full w-full object-cover border border-black'
                />
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
