'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { BookOpen, UploadCloud, Save, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export function Knowledge() {
  const [textInput, setTextInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextUpload = async () => {
    if (!textInput.trim()) {
      return;
    }
    setIsSubmitting(true);

    console.log('S3로 전송할 텍스트:', textInput);

    setTimeout(() => {
      setIsSubmitting(false);
      alert('지식이 성공적으로 반영되었습니다!');
      setTextInput('');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">챗봇 지식 노트 관리</h1>
        <p className="text-slate-500">챗봇이 답변할 때 참고할 우리 가게만의 지식을 가르쳐주세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 왼쪽: 지식 주입 카드 */}
        <Card className="md:col-span-2 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-slate-400" />
              새로운 지식 가르치기
            </CardTitle>
            <CardDescription>텍스트를 직접 입력하거나 파일을 업로드하여 AI의 답변 정확도를 높이세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="text" className="gap-2">
                  <FileText className="w-4 h-4" />
                  텍스트 직접 입력
                </TabsTrigger>
                <TabsTrigger value="file" className="gap-2">
                  <UploadCloud className="w-4 h-4" />
                  파일 업로드
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content">지식 내용</Label>
                  <Textarea
                    id="content"
                    placeholder="예: 우리 가게 주차장은 건물 지하 2층에 있으며, 방문객은 2시간 무료입니다."
                    className="min-h-[300px] resize-none focus-visible:ring-[#ac55f2]"
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                  />
                  <p className="text-[12px] text-slate-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> 문장 단위로 명확하게 작성할수록 AI가 잘 알아듣습니다.
                  </p>
                </div>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white gap-2 h-11" onClick={handleTextUpload} disabled={isSubmitting}>
                  <Save className="w-4 h-4" /> {isSubmitting ? '데이터 분석 중...' : '지식 저장 및 업데이트'}
                </Button>
              </TabsContent>

              <TabsContent
                value="file"
                className="py-12 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center bg-slate-50/50"
              >
                <UploadCloud className="w-12 h-12 text-slate-300 mb-4" />
                <p className="text-sm font-medium text-slate-600">PDF, TXT 파일을 드래그하여 올려주세요</p>
                <p className="text-xs text-slate-400 mt-1">파일당 최대 10MB</p>
                <Button variant="outline" className="mt-4 border-slate-300">
                  파일 선택
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 오른쪽: 상태 및 가이드 */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-xl shadow-slate-200">
            <CardHeader>
              <CardTitle className="text-sm font-medium opacity-80">AI 지식 상태</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">Excellent</div>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                최근 업데이트: 방금 전
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs opacity-70">
                  <span>전체 데이터 조각(Chunks)</span>
                  <span>128개</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[85%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-100 bg-amber-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-amber-700">💡 작성 팁</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-amber-600/80 space-y-2 leading-relaxed">
              <div> 질문과 답변이 세트로 들어가면 좋습니다.</div>
              <div> 우리 보다는 가게 이름을 넣는 게 더 정확합니다.</div>
              <div> 수시로 변하는 정보는 자주 업데이트 해주세요.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
