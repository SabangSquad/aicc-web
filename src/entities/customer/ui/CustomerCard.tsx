import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

export function CustomerCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>고객정보</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="info" className="w-full">
          <TabsList>
            <TabsTrigger value={'info'}>기본정보</TabsTrigger>
            <TabsTrigger value={'counseling'}>상담이력</TabsTrigger>
            <TabsTrigger value={'order'}>주문내역</TabsTrigger>
          </TabsList>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-medium">이름</span>
              <span>홍길동</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">연락처</span>
              <span>010-1234-5678</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">이메일</span>
              <span>honggildong@example.com</span>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
