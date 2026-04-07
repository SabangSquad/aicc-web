'use client';
import { Suspense, useState, useEffect, Fragment } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Check, Loader2, Plus, Trash2 } from 'lucide-react';

import { useManuals, useStoreInformation } from '@/entities/store';
import { useManualsAction } from '@/entities/store';
import { MarkdownEditor } from '@/shared/ui/markdown-editor';
import { toast } from 'sonner';
import { CategorySelector } from './CategorySelector';

export function PoliciesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-6">
          <Loader2 className="h-10 w-10 animate-spin text-zinc-200" />
          <span className="text-ai ml-3 text-lg font-medium">업장 정보를 불러오는 중...</span>
        </div>
      }
    >
      <Policies />
    </Suspense>
  );
}

function Policies() {
  const store_id = 2;
  const { data: storeData } = useStoreInformation(store_id);
  const { data: responseData } = useManuals(store_id);
  const { addMutation, editMutation } = useManualsAction();

  const [manuals, setManuals] = useState(responseData.data);

  useEffect(() => {
    if (responseData?.data) {
      setManuals(responseData.data);
    }
  }, [responseData?.data]);

  const handleManualChange = (manualId: string | number, field: string, value: string) => {
    setManuals(prevManuals => prevManuals.map(manual => (manual.manual_id === manualId ? { ...manual, [field]: value } : manual)));
  };

  const handleAddManual = () => {
    const newManual = {
      manual_id: -Date.now(),
      store_id: store_id,
      title: '',
      category: '',
      content: '',
      edited_at: new Date().toISOString(),
    };
    setManuals(prev => [...prev, newManual]);
  };

  const handleDeleteManual = (manualId: number) => {
    if (confirm('이 정책을 정말 삭제하시겠습니까?')) {
      setManuals(prev => prev.filter(manual => manual.manual_id !== manualId));
    }
  };

  const handleSave = async () => {
    const savePromises = manuals.map(manual => {
      const isNew = manual.manual_id < 0;

      if (isNew) {
        const { manual_id, ...dataToPost } = manual;

        return addMutation.mutateAsync({
          store_id: manual.store_id,
          data: dataToPost,
        });
      } else {
        return editMutation.mutateAsync({
          manual_id: manual.manual_id,
          store_id: manual.store_id,
          data: manual,
        });
      }
    });

    try {
      await Promise.all(savePromises);
      toast.success('정책 정보가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      toast.error('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const isSaving = addMutation.isPending || editMutation.isPending;

  return (
    <div className="w-full space-y-16 pb-32">
      <div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">이용약관 및 정책 관리</h1>
        <p className="text-[17px] font-medium whitespace-pre-line text-zinc-500">
          {`매장의 운영 이용약관과 정책을 관리합니다. \n마크다운을 활용해 본문을 구조화하면 AI가 훨씬 더 정확하게 답변합니다.`}
        </p>
      </div>

      <hr className="border-t-2 border-zinc-100" />

      {manuals.map((manual, index) => (
        <Fragment key={manual.manual_id}>
          {index > 0 && <hr className="border-t-2 border-zinc-100" />}

          <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
            <div className="shrink-0 space-y-5 xl:w-80">
              <div className="w-full space-y-2">
                <Label htmlFor={`title-${manual.manual_id}`} className="text-[16px] font-semibold text-zinc-500">
                  정책 제목
                </Label>
                <Input
                  id={`title-${manual.manual_id}`}
                  value={manual.title}
                  onChange={e => handleManualChange(manual.manual_id, 'title', e.target.value)}
                  className="h-12 border-zinc-200 text-[18px] text-zinc-900 focus-visible:ring-zinc-500"
                  placeholder="제목을 입력하세요"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`category-${manual.manual_id}`} className="text-[16px] font-semibold text-zinc-500">
                  카테고리
                </Label>
                <CategorySelector
                  value={manual.category}
                  storeCategory={storeData.category}
                  onChange={value => handleManualChange(manual.manual_id, 'category', value)}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[13.5px] font-medium text-zinc-400">최근 수정일 : {formatDate(manual.edited_at)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteManual(manual.manual_id)}
                  className="h-8 w-8 cursor-pointer text-zinc-400 hover:bg-red-50 hover:text-red-500"
                  title="이 정책 삭제하기"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="min-w-0 flex-1 space-y-3">
              <Label htmlFor={`content-${manual.manual_id}`} className="text-[16px] font-semibold text-zinc-700">
                정책 내용
              </Label>

              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all focus-within:border-zinc-500 focus-within:ring-1 focus-within:ring-zinc-500">
                <MarkdownEditor value={manual.content} onChange={value => handleManualChange(manual.manual_id, 'content', value)} />
              </div>
            </div>
          </div>
        </Fragment>
      ))}

      <div className="pt-6">
        <Button
          onClick={handleAddManual}
          variant="outline"
          className="h-16 w-full cursor-pointer border-dashed border-zinc-300 bg-zinc-50 text-[16px] font-semibold text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
        >
          <Plus className="mr-2 h-5 w-5" />새 정책 추가하기
        </Button>
      </div>
      <Button
        onClick={handleSave}
        disabled={isSaving}
        className="hover:-tranzinc-y-1 fixed right-24 bottom-8 z-50 flex h-16 min-w-[180px] animate-bounce cursor-pointer items-center justify-center gap-3 rounded-xl bg-zinc-800 text-[18px] font-bold text-white transition-all hover:bg-zinc-400 active:scale-95 disabled:opacity-70"
      >
        {isSaving ? <Loader2 className="h-8 w-8 animate-spin" /> : <Check className="h-8 w-8" />}
        <span>{isSaving ? '저장 중...' : '정책 수정하기'}</span>
      </Button>
    </div>
  );
}
