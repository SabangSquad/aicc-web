import { Badge } from '@/shared/ui/badge';
import { Package, Truck, CheckCircle, RotateCcw, X } from 'lucide-react';
import { OrderType } from '@/shared/types/order';

export function OrderStatusBadge({ status }: { status: OrderType['status'] }) {
  if (status === '준비') {
    return (
      <Badge variant="secondary" className="flex items-center gap-1 text-zinc-700">
        <Package size={12} />
        <span>준비</span>
      </Badge>
    );
  }

  if (status === '배송') {
    return (
      <Badge variant="secondary" className="flex items-center gap-1 bg-blue-400 text-white">
        <Truck size={12} />
        <span>배송</span>
      </Badge>
    );
  }

  if (status === '완료') {
    return (
      <Badge variant="secondary" className="flex items-center gap-1 bg-green-600 text-white">
        <CheckCircle size={12} />
        <span>완료</span>
      </Badge>
    );
  }

  if (status === '반품') {
    return (
      <Badge variant="secondary" className="flex items-center gap-1 bg-orange-400 text-white">
        <RotateCcw size={12} />
        <span>반품</span>
      </Badge>
    );
  }

  if (status === '취소') {
    return (
      <Badge variant="secondary" className="flex items-center gap-1 bg-red-400 text-white">
        <X size={12} />
        <span>취소</span>
      </Badge>
    );
  }

  return null;
}
