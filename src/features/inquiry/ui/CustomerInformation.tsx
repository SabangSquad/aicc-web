import { customerAPI } from '@/entities/customer/api/api';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';

export async function CustomerInformation({ customerId }: { customerId: number | null }) {
  if (!customerId) {
    return (
      <div>
        <h3 className="mb-4 text-lg font-semibold">고객 정보</h3>
        <p className="text-muted-foreground italic">고객 정보가 없습니다.</p>
      </div>
    );
  }
  const customer = await customerAPI.getCustomerInfo(customerId);
  const getInitials = (name: string) => {
    return name ? name.substring(0, 1).toUpperCase() : 'U';
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">고객 정보</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{getInitials(customer?.name || '')}</AvatarFallback>
          </Avatar>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold">{customer.name}</p>
            </div>

            <p className="text-muted-foreground text-sm">{customer.email}</p>
            <p className="text-muted-foreground text-sm">{customer.phone_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const ValueDisplay = ({ value }: { value: string | number }) => {
  return <span className={!value ? 'text-muted-foreground italic' : ''}>{value || 'N/A'}</span>;
};
