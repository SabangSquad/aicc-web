import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationAPI } from '../api/api';
import { queryKeys } from '../api/queryOption';

export function useReservationAction() {
  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.reservations });
  };

  const addMutation = useMutation({
    mutationFn: reservationAPI.postReservation,
    onSuccess: () => invalidateQuery(),
  });

  return { addMutation };
}
