'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Plus, Trash2, Package, Check, Loader2, Save } from 'lucide-react';

import { useAuth } from '@/entities/auth';
import { useProducts, useProductsAction } from '@/entities/store';
import { toast } from 'sonner';

export interface ProductType {
  readonly product_id: number;
  readonly store_id: number;
  name: string;
  price: number;
}

export function ProductsPage() {
  const { data: authData } = useAuth();
  const storeId = authData?.user?.store_id;

  const { data: responseData } = useProducts(storeId);
  // editMutation을 추가로 가져옵니다.
  const { addMutation, editMutation } = useProductsAction();
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (responseData?.data) {
      const sortedServerData = [...responseData.data].sort((a, b) => b.product_id - a.product_id);
      setProducts(prev => {
        const unsaved = prev.filter(p => p.product_id < 0);
        return [...unsaved, ...sortedServerData];
      });
    }
  }, [responseData]);

  const handleProductChange = (productId: number, field: keyof ProductType, value: string | number) => {
    setProducts(prev => prev.map(p => (p.product_id === productId ? { ...p, [field]: value } : p)));
  };

  const handleAddProduct = () => {
    if (!storeId) return;
    const newTempProduct: ProductType = {
      product_id: -Date.now(),
      store_id: storeId,
      name: '',
      price: 0,
    };
    setProducts(prev => [newTempProduct, ...prev]);
  };

  // 신규 등록 Mutation
  const handleSaveMutation = (product: ProductType) => {
    if (!product.name.trim()) return toast.error('상품명을 입력해주세요.');

    addMutation.mutate(
      {
        store_id: product.store_id,
        data: { name: product.name, price: product.price },
      },
      {
        onSuccess: () => {
          toast.success(`${product.name} 상품이 추가되었습니다.`);
          setProducts(prev => prev.filter(p => p.product_id !== product.product_id));
        },
      }
    );
  };

  // 기존 상품 수정 Mutation
  const handleEditMutation = (product: ProductType) => {
    if (!product.name.trim()) return toast.error('상품명을 입력해주세요.');

    editMutation.mutate(
      {
        product_id: product.product_id,
        data: { name: product.name, price: product.price },
      },
      {
        onSuccess: () => {
          toast.success('상품 정보가 수정되었습니다.');
        },
      }
    );
  };

  const handleRemoveUnsavedProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.product_id !== productId));
  };

  return (
    <div className="w-full space-y-8 pb-32">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">상품 관리</h1>
        <p className="text-[16px] font-medium text-zinc-500">상품 정보를 수정하거나 신규 상품을 등록하세요.</p>
      </div>

      <hr className="border-t-2 border-zinc-100" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <button
          onClick={handleAddProduct}
          className="group flex min-h-[240px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 p-6 text-zinc-500 transition-all hover:border-zinc-500 hover:bg-zinc-100"
        >
          <Plus className="h-6 w-6" />
          <span className="text-[16px] font-bold">새 상품 추가하기</span>
        </button>

        {products.map(product => {
          const isExisting = product.product_id > 0;

          // 현재 로딩 중인 카드가 이 상품인지 확인
          const isAdding = addMutation.isPending && addMutation.variables?.data.name === product.name;
          const isEditing = editMutation.isPending && editMutation.variables?.product_id === product.product_id;

          // 원본 데이터와 비교하여 수정 사항이 있는지 체크
          const originalProduct = responseData?.data?.find(p => p.product_id === product.product_id);
          const isDirty = isExisting && originalProduct && (originalProduct.name !== product.name || originalProduct.price !== product.price);

          return (
            <div
              key={product.product_id}
              className={`relative flex flex-col gap-5 rounded-2xl border p-6 transition-all duration-200 ${
                isExisting ? 'border-zinc-100 bg-white shadow-sm' : 'border-zinc-400 bg-white shadow-lg ring-2 ring-zinc-50'
              }`}
            >
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <span className="text-[13px] font-bold tracking-wider">{isExisting ? `ID: ${product.product_id}` : '새 상품 추가'}</span>
                  {isDirty && <span className="rounded bg-red-200 px-1.5 py-0.5 text-[10px] font-bold text-red-600">수정중</span>}
                </div>

                <div className="flex items-center gap-1">
                  {isExisting ? (
                    <Button
                      size="sm"
                      variant={isDirty ? 'default' : 'outline'}
                      onClick={() => handleEditMutation(product)}
                      disabled={!isDirty || editMutation.isPending}
                      className={`h-8 cursor-pointer px-3 ${isDirty ? 'bg-zinc-800 px-3 text-white hover:bg-zinc-700' : 'text-zinc-400'}`}
                    >
                      {isEditing ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Save className="mr-1 h-3 w-3" />}
                      수정
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleSaveMutation(product)}
                        disabled={addMutation.isPending}
                        className="h-8 cursor-pointer bg-zinc-800 px-3 text-white hover:bg-zinc-700"
                      >
                        {isAdding ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Check className="mr-1 h-3 w-3" />}
                        저장
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveUnsavedProduct(product.product_id)}
                        className="h-8 w-8 text-zinc-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[14px] font-semibold text-zinc-700">상품명</Label>
                  <Input
                    value={product.name}
                    onChange={e => handleProductChange(product.product_id, 'name', e.target.value)}
                    className="h-11 border-zinc-200 text-[18px] focus:border-zinc-400"
                    placeholder="상품명을 입력하세요"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[14px] font-semibold text-zinc-700">판매 가격 (원)</Label>
                  <Input
                    type="number"
                    value={product.price || ''}
                    onChange={e => handleProductChange(product.product_id, 'price', Number(e.target.value))}
                    className="h-11 border-zinc-200 text-[18px] focus:border-zinc-400"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
