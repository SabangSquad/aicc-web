'use client';
import { ShoppingBag, Package, Tag, Coins } from 'lucide-react';
import { useOrderItems } from '@/entities/order';

export const OrderItem = ({ order_id }: { order_id: number }) => {
  const { data, error } = useOrderItems(order_id);

  if (error) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-[14px] text-zinc-500 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
        <ShoppingBag size={16} className="text-zinc-400" />
        조회된 주문 상품이 없습니다.
      </div>
    );
  }

  const totalOrderPrice = data.reduce((acc, item) => acc + item.total_price, 0);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-5 py-4">
        <div className="flex items-center gap-2">
          <ShoppingBag size={16} className="text-zinc-800" />
          <h3 className="text-[15px] font-semibold text-zinc-800">주문 상품 ({data.length}종)</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
        {data.map(item => (
          <div
            key={item.item_id}
            className="flex flex-col gap-4 rounded-xl border border-zinc-100 bg-white p-4 shadow-sm transition-all hover:border-zinc-200 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50">
                <Package size={18} className="text-zinc-500" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-[14px] leading-tight font-bold break-keep text-zinc-800">{item.product_name}</span>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-2">
              <div className="flex flex-col justify-center rounded-lg bg-zinc-50 px-3 py-2.5">
                <span className="text-[10px] font-bold tracking-wide text-zinc-400 uppercase">수량</span>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <Tag size={12} className="text-zinc-500" />
                  <span className="text-[13px] font-semibold text-zinc-700">{item.quantity}개</span>
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-lg bg-zinc-50 px-3 py-2.5">
                <span className="text-[10px] font-bold tracking-wide text-zinc-400 uppercase">금액</span>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <Coins size={12} className="text-zinc-500" />
                  <span className="text-[13px] font-semibold text-zinc-700">{item.total_price.toLocaleString('ko-KR')}원</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 border-t border-zinc-100 bg-zinc-50/50 px-5 py-4">
        <span className="text-[13px] font-bold text-zinc-500">총 결제 금액 = </span>
        <span className="text-[18px] font-extrabold tracking-tight text-zinc-700">
          {totalOrderPrice.toLocaleString('ko-KR')}
          <span className="ml-0.5 text-[14px] font-semibold text-zinc-500">원</span>
        </span>
      </div>
    </div>
  );
};
