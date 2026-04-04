// 'use client';
// import { ChevronDown } from 'lucide-react';
// import { emotionMap } from '@/shared/lib/emotion';
// import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/shared/ui/item';
// import { useState } from 'react';
// import { useManuals } from '@/entities/manual/hooks/useManualQuery';

// export function AIAssist({ inquiry }: { inquiry }) {
//   const { data: manuals } = useManuals(inquiry?.category || '');
//   // const emo = emotionMap[aiAssist.emotion];

//   return (
//     <>
//       <div>
//         <h3 className="text-ai mb-3 text-lg font-medium">AI 상담 요약</h3>
//         <Item variant="muted" className="mb-4">
//           <ItemContent>
//             <ItemTitle className="text-black-primary">{aiAssist.summary}</ItemTitle>
//           </ItemContent>
//         </Item>
//       </div>
//       <div className="flex flex-row gap-6">
//         <div className="flex-1">
//           <h3 className="text-ai mb-3 text-lg font-medium">AI 감정 분석</h3>
//           <div className="text-black-primary rounded-lg p-4" style={{ backgroundColor: `color-mix(in srgb,  transparent 20%)` }}>
//             <div className="mb-2 flex text-lg font-bold">
//               {/* {emo.emoji}  */}
//               {aiAssist.emotion}
//             </div>
//             <div className="rounded-md border border-black/5 bg-white/60 p-3 backdrop-blur-sm">
//               <p className="text-sm leading-relaxed font-medium text-black/80">
//                 현재 고객님의 감정은 <span className="font-bold text-black">{aiAssist.emotion}</span> 상태로 분석됩니다.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="flex-1">
//           <h3 className="text-ai mb-3 text-lg font-medium">AI 답변 추천</h3>
//           {manuals.length === 0 && <p className="text-muted-foreground text-sm">추천 답변이 없습니다.</p>}
//           {manuals.slice(0, 3).map(manual => (
//             <ManualItem key={manual.manual_id} manual={manual} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// function ManualItem({ manual }: { manual: Manual }) {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <Item variant="muted" className="mb-4 cursor-pointer transition-all duration-500 hover:shadow-lg" onClick={() => setExpanded(!expanded)}>
//       <ItemMedia>
//         <div className="bg-ai rounded-full p-2">📦</div>
//       </ItemMedia>

//       <ItemContent>
//         <ItemTitle className={`text-black-primary ${expanded ? 'line-clamp-none' : 'line-clamp-2'}`}>{manual.content}</ItemTitle>
//         <ItemDescription className="flex items-center justify-between">
//           <span>
//             {manual.title} {'\u007C'} {manual.category}
//           </span>
//           <ChevronDown className={`transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`} size={16} />
//         </ItemDescription>
//       </ItemContent>
//     </Item>
//   );
// }
