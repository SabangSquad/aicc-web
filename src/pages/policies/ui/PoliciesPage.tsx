'use client';
import { Suspense, useState, useEffect, Fragment } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { AlertTriangle, Check, History, Loader2, Plus, Trash2 } from 'lucide-react';

import { useManuals } from '@/entities/store';
import { useManualsAction } from '@/entities/store';
import { MarkdownEditor } from '@/shared/ui/markdown-editor';
import { toast } from 'sonner';

export function PoliciesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[60vh] w-full items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <span className="ml-3 text-lg font-medium text-slate-600">업장 정보를 불러오는 중...</span>
        </div>
      }
    >
      <Policies />
    </Suspense>
  );
}

function Policies() {
  const store_id = 3;
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
    if (confirm('이 규정을 정말 삭제하시겠습니까?')) {
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
        <h1 className="mb-3 text-3xl font-bold tracking-tight">운영 정책 및 규정 관리</h1>
        <p className="text-[17px] font-medium whitespace-pre-line text-slate-500">
          {`매장의 운영 정책과 규정을 관리합니다. \n마크다운을 활용해 본문을 구조화하면 AI가 훨씬 더 정확하게 답변합니다.`}
        </p>
      </div>

      <hr className="border-t-2 border-slate-100" />

      {manuals.map((manual, index) => (
        <Fragment key={manual.manual_id}>
          {index > 0 && <hr className="border-t-2 border-slate-100" />}

          <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
            <div className="shrink-0 space-y-5 xl:w-80">
              <div className="w-full space-y-2">
                <Label htmlFor={`title-${manual.manual_id}`} className="text-[14px] font-semibold text-slate-500">
                  규정 제목
                </Label>
                <Input
                  id={`title-${manual.manual_id}`}
                  value={manual.title}
                  onChange={e => handleManualChange(manual.manual_id, 'title', e.target.value)}
                  className="h-12 border-slate-200 text-[18px] font-bold text-slate-900 focus-visible:ring-blue-500"
                  placeholder="제목을 입력하세요"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`category-${manual.manual_id}`} className="text-[14px] font-semibold text-slate-500">
                  카테고리
                </Label>
                <Input
                  id={`category-${manual.manual_id}`}
                  value={manual.category}
                  onChange={e => handleManualChange(manual.manual_id, 'category', e.target.value)}
                  className="h-10 border-slate-200 bg-slate-50 text-[15px] font-medium text-slate-700 focus-visible:ring-blue-500"
                  placeholder="카테고리 입력"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[13.5px] font-medium text-slate-400">마지막 수정: {formatDate(manual.edited_at)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteManual(manual.manual_id)}
                  className="h-8 w-8 text-slate-400 hover:bg-red-50 hover:text-red-500"
                  title="이 규정 삭제하기"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="min-w-0 flex-1 space-y-3">
              <Label htmlFor={`content-${manual.manual_id}`} className="text-[15px] font-semibold text-slate-700">
                정책 내용 (Markdown 지원)
              </Label>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
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
          className="h-16 w-full border-dashed border-slate-300 bg-slate-50 text-[16px] font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600"
        >
          <Plus className="mr-2 h-5 w-5" />
          새로운 규정 추가하기
        </Button>
      </div>
      <Button
        onClick={handleSave}
        disabled={editMutation.isPending}
        className="fixed right-24 bottom-8 z-50 flex h-16 min-w-[160px] animate-bounce cursor-pointer items-center justify-center gap-3 rounded-xl bg-zinc-800 text-[18px] font-bold text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-1 hover:bg-zinc-400 active:scale-95 disabled:opacity-70"
      >
        {editMutation.isPending ? <Loader2 className="h-8 w-8 animate-spin" /> : <Check className="h-8 w-8" />}
        <span>{editMutation.isPending ? '저장 중...' : '정책 수정하기'}</span>
      </Button>
    </div>
  );
}
