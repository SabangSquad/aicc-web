'use client';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Plus, Trash2, Package } from 'lucide-react';

import { useAuth } from '@/entities/auth';
import { useProducts, useProductsAction } from '@/entities/store';

export function ProductsPage() {
  const { data: authData } = useAuth();
  const { data: responseData } = useProducts(authData.user.store_id);

  const sortedProducts = responseData?.data ? [...responseData.data].sort((a, b) => b.product_id - a.product_id) : [];

  const [products, setProducts] = useState(sortedProducts);

  const handleProductChange = (productId: string | number, field: string, value: string | number) => {
    setProducts(prevProducts => prevProducts.map(product => (product.product_id === productId ? { ...product, [field]: value } : product)));
  };

  const handleAddProduct = () => {
    const newProduct = {
      product_id: -Date.now(),
      store_id: authData.user.store_id,
      name: '',
      price: 0,
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleRemoveUnsavedProduct = (productId: number) => {
    setProducts(prev => prev.filter(product => product.product_id !== productId));
  };

  return (
    <div className="w-full space-y-8 pb-32">
      {/* 헤더 영역 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">상품 관리</h1>
          <p className="text-[16px] font-medium text-zinc-500">신규 상품을 등록할 수 있습니다. (기존 상품은 읽기 전용)</p>
        </div>

        {/* 상단 추가 버튼 (선택 사항: 하단 버튼과 함께 두거나 하나만 써도 됨) */}
        <Button onClick={handleAddProduct} className="h-11 shrink-0 bg-zinc-900 text-white hover:bg-zinc-800">
          <Plus className="mr-2 h-4 w-4" /> 새 상품 카드 추가
        </Button>
      </div>

      <hr className="border-t-2 border-zinc-100" />

      {/* 카드 그리드 영역 (PC: 3열, 태블릿: 2열, 모바일: 1열) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map(product => {
          const isExisting = product.product_id > 0;

          return (
            <div
              key={product.product_id}
              className={`relative flex flex-col gap-5 rounded-2xl border p-6 transition-all duration-200 ${
                isExisting
                  ? 'border-zinc-100 bg-zinc-50/60 opacity-80 shadow-sm'
                  : 'border-zinc-300 bg-white shadow-md ring-1 ring-zinc-100 focus-within:border-zinc-500 focus-within:ring-zinc-500'
              }`}
            >
              {/* 카드 헤더 (ID 및 아이콘/버튼) */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Package className="h-4 w-4" />
                  <span className="text-[13px] font-bold tracking-wider">
                    {isExisting ? `ID: ${product.product_id}` : <span className="text-blue-500">NEW PRODUCT</span>}
                  </span>
                </div>

                {/* 삭제 버튼 (새 항목만) */}
                {!isExisting && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveUnsavedProduct(product.product_id)}
                    className="h-8 w-8 text-zinc-400 hover:bg-red-50 hover:text-red-500"
                    title="이 카드 삭제"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* 카드 컨텐츠 (입력 폼) */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor={`name-${product.product_id}`} className="text-[14px] font-semibold text-zinc-600">
                    상품명
                  </Label>
                  <Input
                    id={`name-${product.product_id}`}
                    value={product.name}
                    onChange={e => handleProductChange(product.product_id, 'name', e.target.value)}
                    disabled={isExisting}
                    className="h-11 border-zinc-200 text-[16px] text-zinc-900 disabled:cursor-default disabled:border-transparent disabled:bg-transparent disabled:px-1 disabled:font-bold disabled:text-zinc-800 disabled:opacity-100"
                    placeholder="상품명을 입력하세요"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor={`price-${product.product_id}`} className="text-[14px] font-semibold text-zinc-600">
                    판매 가격 (원)
                  </Label>
                  <Input
                    id={`price-${product.product_id}`}
                    type="number"
                    value={product.price || ''}
                    onChange={e => handleProductChange(product.product_id, 'price', Number(e.target.value))}
                    disabled={isExisting}
                    className="h-11 border-zinc-200 text-[16px] text-zinc-900 disabled:cursor-default disabled:border-transparent disabled:bg-transparent disabled:px-1 disabled:font-bold disabled:text-zinc-800 disabled:opacity-100"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* 점선으로 된 "추가하기" 전용 카드 (리스트 맨 끝에 위치) */}
        <button
          onClick={handleAddProduct}
          className="group flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 p-6 text-zinc-500 transition-colors hover:border-zinc-400 hover:bg-zinc-100"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200/50 transition-transform group-hover:scale-110">
            <Plus className="h-6 w-6 text-zinc-600" />
          </div>
          <span className="text-[16px] font-semibold text-zinc-600">새 상품 추가하기</span>
        </button>
      </div>
    </div>
  );
}
