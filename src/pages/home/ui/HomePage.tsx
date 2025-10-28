import { RecommendAnswer, SentimentAnalysis, Summary } from '@/entities/ai';
import { RecentActivity } from '@/entities/call/recent/ui/RecentActivity';
import { CustomerCard } from '@/entities/customer';
import { PerformanceIndicator } from '@/entities/performance';
import { Chatting } from '@/features/chat';

export function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <div>홈</div>
      <div className="flex gap-4">
        <PerformanceIndicator />
        <RecentActivity />
        <CustomerCard />
      </div>
      <div className="flex flex-row gap-4">
        <RecommendAnswer />
        <div className="gap-4 flex flex-col">
          <Summary />
          <SentimentAnalysis />
        </div>
        <Chatting />
      </div>
    </div>
  );
}
